// Converts `dart doc` HTML output into Starlight pages: one page per package, library and
// class/enum/mixin/extension. Members become sections on their class page.
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { posix } from 'node:path';

// dartdoc index.json kinds
const CONTAINERS = { 3: 'Classes', 5: 'Enums', 11: 'Mixins', 6: 'Extensions', 7: 'Extension types' };
const TOP_LEVEL = { 8: 'Functions', 19: 'Constants', 20: 'Properties', 21: 'Typedefs' };
const LIBRARY = 9;

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
const anchor = (href) => posix.basename(href, '.html');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const q = JSON.stringify; // valid YAML scalar

/**
 * @param {{name:string, group:string, description:string, dir:string, source:string}[]} packages
 *   `dir` = dart doc output folder, `source` = link to the source code.
 * @param {string} outDir  e.g. src/content/docs/api
 * @returns sidebar items for the API reference + pub.dev path → URL map
 */
export function convert(packages, outDir) {
	// Pass 1: map every dartdoc path (per package) to our URL.
	const urls = new Map();
	const indexes = new Map();
	for (const pkg of packages) {
		const index = JSON.parse(readFileSync(`${pkg.dir}/index.json`, 'utf8'));
		const map = new Map([['index.html', `/api/${pkg.name}/`]]);
		const libUrl = (e) => `/api/${pkg.name}/${slug(e.name)}/`;
		const containers = new Map();
		for (const e of index) {
			if (e.kind === LIBRARY) map.set(e.href, libUrl(e)).set(`${e.href}index.html`, libUrl(e));
			if (CONTAINERS[e.kind]) {
				const url = `${libUrl(e.enclosedBy)}${slug(e.name)}/`;
				containers.set(e.href, url);
				map.set(e.href, url);
			}
			if (TOP_LEVEL[e.kind]) map.set(e.href, `${libUrl(e.enclosedBy)}#${anchor(e.href)}`);
		}
		for (const e of index) {
			const c = containers.get(e.enclosedBy?.href);
			if (c && !map.has(e.href)) map.set(e.href, `${c}#${anchor(e.href)}`);
		}
		urls.set(pkg.name, map);
		indexes.set(pkg.name, index);
	}

	const resolve = (href, pkg, from) => {
		if (!href || href === 'false') return null;
		const pub = href.match(/^https:\/\/pub\.dev\/documentation\/([^/]+)\/[^/]+\/([^#]*)/);
		if (pub) return urls.get(pub[1])?.get(pub[2] || 'index.html') ?? href;
		if (/^([a-z]+:|#|\/\/)/i.test(href)) return href;
		const path = posix.normalize(posix.join(posix.dirname(from), href.split('#')[0]));
		return urls.get(pkg)?.get(path) ?? null;
	};

	// Serialises an element as ONE line of HTML, so Markdown keeps it as a single raw block.
	const html = (el, pkg, from) => {
		if (!el) return '';
		for (const a of el.querySelectorAll('a')) {
			const url = resolve(a.getAttribute('href'), pkg, from);
			if (url) a.setAttribute('href', url);
			else a.replaceWith(a.innerHTML);
		}
		return el.outerHTML
			.replace(/<pre[\s\S]*?<\/pre>/g, (pre) => pre.replace(/\n/g, '&#10;'))
			.replace(/\s*\n\s*/g, ' ');
	};

	const pages = new Map();
	const load = (pkg, href) => {
		const key = `${pkg.name}/${href}`;
		if (!pages.has(key)) {
			const file = `${pkg.dir}/${href.endsWith('/') ? `${href}index.html` : href}`;
			pages.set(key, existsSync(file) ? parse(readFileSync(file, 'utf8')).querySelector('#dartdoc-main-content') : null);
		}
		return pages.get(key);
	};

	const fence = (code, lang) => {
		const ticks = '`'.repeat(Math.max(3, ...(code.match(/`+/g) ?? []).map((t) => t.length + 1)));
		return `${ticks}${lang}\n${code}\n${ticks}`;
	};

	const member = (pkg, e) => {
		const doc = load(pkg, e.href);
		if (!doc) return '';
		const sigs = doc.querySelectorAll('section.multi-line-signature').map((s) => html(s, pkg.name, e.href));
		const source = doc.querySelectorAll('#source pre code').map((c) => c.text.trim()).join('\n\n');
		return [
			`<h3 id="${esc(anchor(e.href))}">${esc(e.name.replace(/\.new$/, ''))}</h3>`,
			`<div class="api-sig">${sigs.join('')}</div>`,
			html(doc.querySelector('section.desc'), pkg.name, e.href),
			source && `<details><summary>Implementation</summary>\n\n${fence(source, 'dart')}\n\n</details>`,
		].filter(Boolean).join('\n\n');
	};

	const section = (pkg, label, members) =>
		members.length ? [`<h2 id="section-${slug(label)}">${label}</h2>`, ...members.map((m) => member(pkg, m))] : [];

	const write = (url, frontmatter, body) => {
		const file = `${outDir}${url.replace(/^\/api/, '').replace(/\/$/, '')}/index.md`;
		mkdirSync(posix.dirname(file), { recursive: true });
		const fm = Object.entries({ editUrl: false, ...frontmatter }).map(([k, v]) => `${k}: ${typeof v === 'string' ? q(v) : v}`);
		writeFileSync(file, `---\n${fm.join('\n')}\n---\n\n${body.filter(Boolean).join('\n\n')}\n`);
	};

	const link = (url, name, desc) =>
		`<li><a href="${url}"><code>${esc(name)}</code></a>${desc ? ` — ${esc(desc)}` : ''}</li>`;

	// Pass 2: write pages.
	const sidebar = [];
	for (const pkg of packages) {
		const index = indexes.get(pkg.name);
		const map = urls.get(pkg.name);
		const libraries = index.filter((e) => e.kind === LIBRARY);

		write(`/api/${pkg.name}/`, { title: pkg.name, description: pkg.description }, [
			`<p>${esc(pkg.description)}. <a href="https://pub.dev/packages/${pkg.name}">pub.dev</a> · <a href="${pkg.source}">Source</a></p>`,
html(load(pkg, 'index.html')?.querySelector('section.desc'), pkg.name, 'index.html'),
			'<h2 id="section-libraries">Libraries</h2>',
			`<ul>${libraries.map((l) => link(map.get(l.href), l.name, l.desc)).join('')}</ul>`,
		]);

		for (const lib of libraries) {
			const inLib = index.filter((e) => e.enclosedBy?.href === lib.href);
			write(map.get(lib.href), { title: lib.name, description: `${lib.name} library of ${pkg.name}` }, [
				html(load(pkg, lib.href)?.querySelector('section.desc'), pkg.name, `${lib.href}index.html`),
				...Object.entries(CONTAINERS).flatMap(([kind, label]) => {
					const items = inLib.filter((e) => e.kind === +kind);
					return items.length ? [`<h2 id="section-${slug(label)}">${label}</h2>`, `<ul>${items.map((e) => link(map.get(e.href), e.name, e.desc)).join('')}</ul>`] : [];
				}),
				...Object.entries(TOP_LEVEL).flatMap(([kind, label]) => section(pkg, label, inLib.filter((e) => e.kind === +kind))),
			]);

			for (const c of inLib.filter((e) => CONTAINERS[e.kind])) {
				const doc = load(pkg, c.href);
				const members = index.filter((e) => e.enclosedBy?.href === c.href);
				const ops = members.filter((e) => e.kind === 10 && e.name.startsWith('operator'));
				write(map.get(c.href), { title: c.name, description: c.desc || `${c.name} in ${pkg.name}` }, [
					html(doc?.querySelector('section.desc'), pkg.name, c.href),
					html(doc?.querySelectorAll('section').find((s) => s.querySelector('dl.dl-horizontal')), pkg.name, c.href),
					...section(pkg, 'Constructors', members.filter((e) => e.kind === 2)),
					...section(pkg, c.kind === 5 ? 'Values' : 'Constants', members.filter((e) => e.kind === 1)),
					...section(pkg, 'Properties', members.filter((e) => e.kind === 16)),
					...section(pkg, 'Methods', members.filter((e) => e.kind === 10 && !ops.includes(e))),
					...section(pkg, 'Operators', ops),
				]);
			}
		}

		let group = sidebar.find((g) => g.label === pkg.group);
		if (!group) sidebar.push((group = { label: pkg.group, collapsed: true, items: [] }));
		group.items.push({
			label: pkg.name,
			collapsed: true,
			items: [{ label: 'Overview', slug: `api/${pkg.name}` }, ...libraries.map((l) => ({ label: l.name, slug: map.get(l.href).slice(1, -1) }))],
		});
	}

	write('/api/', { title: 'API Reference', description: 'Dart API reference for all CARP packages, generated from source.' }, [
		'<p>Generated nightly with <code>dart doc</code> from the latest source of each package.</p>',
		...sidebar.flatMap((g) => [
			`<h2 id="section-${slug(g.label)}">${g.label}</h2>`,
			`<ul>${g.items.map((i) => link(`/api/${i.label}/`, i.label, packages.find((p) => p.name === i.label).description)).join('')}</ul>`,
		]),
	]);

	// "<package>/<dartdoc path>" → our URL, used to rewrite pub.dev links in the guides.
// Also "<package>/~/<path minus library folder>", for guides that still use old library folder names.
const links = {}, loose = {};
for (const [name, map] of urls)
for (const [path, url] of map) {
links[`${name}/${path}`] = url;
const key = `${name}/~/${path.replace(/^[^/]+\//, '')}`;
loose[key] = key in loose && loose[key] !== url ? null : url; // null = ambiguous
}
for (const [key, url] of Object.entries(loose)) if (url) links[key] ??= url;
for (const [name, index] of indexes)
for (const l of index.filter((e) => e.kind === LIBRARY)) links[`${name}/${l.href}${l.name}-library.html`] = urls.get(name).get(l.href);
return { sidebar: [{ label: 'Overview', slug: 'api' }, ...sidebar], links };
}
