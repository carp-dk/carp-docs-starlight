// Generates the Dart API reference: clone sources, `dart doc` each package, convert to Starlight pages.
//   node scripts/api/generate.mjs          generate everything
//   node scripts/api/generate.mjs check    exit 0 if sources changed since the live deployment, 1 if not
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { convert } from './convert.mjs';

const packages = JSON.parse(readFileSync(new URL('./packages.json', import.meta.url), 'utf8'));
const repos = [...new Set(packages.map((p) => p.repo))];
const SRC = '.api-src', OUT = '.api-out', DOCS = 'src/content/docs/api';
const VERSION_FILE = 'public/api-version.json';
const sh = (cmd, cwd) => execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' }).trim();
const head = (repo) => sh(`git ls-remote https://github.com/${repo} HEAD`).split(/\s/)[0];

if (process.argv[2] === 'check') {
	const url = process.env.LIVE_VERSION_URL;
	const live = await fetch(url).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
	const changed = repos.filter((r) => live[r] !== head(r));
	console.log(changed.length ? `Changed since last deploy: ${changed.join(', ')}` : `No changes since last deploy (${url})`);
	process.exit(changed.length ? 0 : 1);
}

const versions = {};
for (const repo of repos) {
	const dir = `${SRC}/${repo}`;
	if (!existsSync(dir)) sh(`git clone --quiet --depth 1 https://github.com/${repo} ${dir}`);
	else sh('git fetch --quiet --depth 1 origin HEAD && git reset --quiet --hard FETCH_HEAD', dir);
	versions[repo] = sh('git rev-parse HEAD', dir);
}

const built = [], failed = [];
for (const pkg of packages) {
	const dir = `${SRC}/${pkg.repo}/${pkg.path}`, out = `${OUT}/${pkg.name}`;
	try {
		// --no-example: example apps pull in extra plugins that often fail to resolve.
		sh('flutter pub get --no-example', dir);
		// Pinned dartdoc: 9.0.6 bundled with Flutter 3.47.5 crashes (RangeError in _stripDocImports).
		sh(`dart pub global run dartdoc --output ${process.cwd()}/${out}`, dir);
		built.push({ ...pkg, dir: out, source: `https://github.com/${pkg.repo}/tree/${versions[pkg.repo]}/${pkg.path}` });
		console.log(`✓ ${pkg.name}`);
	} catch (e) {
		failed.push(pkg.name);
		console.log(`✗ ${pkg.name} — skipped\n${(e.stderr || e.stdout || e.message).split('\n').slice(-6).join('\n')}`);
	}
}

rmSync(DOCS, { recursive: true, force: true });
mkdirSync(DOCS, { recursive: true });
const { sidebar, links } = convert(built, DOCS);
writeFileSync('src/api-sidebar.json', JSON.stringify(sidebar, null, '\t'));
writeFileSync('src/api-links.json', JSON.stringify(links));
writeFileSync(VERSION_FILE, JSON.stringify({ ...versions, generated: new Date().toISOString(), failed }, null, '\t'));
console.log(`\nGenerated ${built.length}/${packages.length} packages.${failed.length ? ` Failed: ${failed.join(', ')}` : ''}`);
if (!built.length) process.exit(1);
