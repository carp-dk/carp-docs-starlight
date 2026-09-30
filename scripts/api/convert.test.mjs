// Converter check: node scripts/api/convert.test.mjs <dart-doc-root>
// Needs dart doc output for carp_mobile_sensing and carp_core in <dart-doc-root>/<package>.
import assert from 'node:assert/strict';
import { readFileSync, rmSync } from 'node:fs';
import { convert } from './convert.mjs';

const root = process.argv[2] ?? '.api-out';
const out = '/tmp/api-convert-test';
rmSync(out, { recursive: true, force: true });
const pkg = (name) => ({ name, group: 'Core', description: name, dir: `${root}/${name}`, source: 'https://github.com/carp-dk' });
const { sidebar, links } = convert([pkg('carp_mobile_sensing'), pkg('carp_core')], out);

const page = readFileSync(`${out}/carp_mobile_sensing/runtime/usertask/index.md`, 'utf8');
assert.match(page, /^---\n[^]*?title: "UserTask"\n[^]*?---\n/, "frontmatter title");
assert.match(page, /<h3 id="onStart">onStart<\/h3>/, 'onStart method section');
assert.match(page, /href="\/api\/carp_mobile_sensing\/runtime\/apptaskcontroller\/"/, 'same-package link rewritten');
assert.match(page, /href="\/api\/carp_core\/[^"]+"/, 'cross-package link to carp_core rewritten');
assert.doesNotMatch(page, /href="\.\.\//, 'no dartdoc-relative links left');
assert.doesNotMatch(page, /pub\.dev\/documentation\/carp_core/, 'no pub.dev links for packages we host');
assert.ok(sidebar.some((g) => g.items?.some((i) => i.label === 'carp_core')), 'sidebar has carp_core');
const runtime = sidebar.flatMap((g) => g.items ?? []).find((i) => i.label === 'carp_mobile_sensing').items.find((i) => i.label === 'runtime');
assert.ok(runtime.items.some((i) => i.slug === 'api/carp_mobile_sensing/runtime/usertask'), 'sidebar lists classes under their library');
assert.equal(links['carp_mobile_sensing/runtime/UserTask-class.html'], '/api/carp_mobile_sensing/runtime/usertask/', 'pub.dev link map');
assert.equal(links['carp_core/~/DeploymentService-class.html'], '/api/carp_core/deployment/deploymentservice/', 'old library folder fallback');
console.log('convert check passed');
