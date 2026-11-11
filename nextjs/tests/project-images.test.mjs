import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';
import ts from 'typescript';

// Use the project's TypeScript compiler without adding a test-runner dependency.
const source = readFileSync(new URL('../src/lib/project-images.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
});
const { resolveProjectImage } = await import(
  `data:text/javascript;charset=utf-8,${encodeURIComponent(outputText)}`
);
const imagesByName = new Map([
  ['intervaltimer.png', 'intervalTimer.png'],
  ['project cover.png', 'Project Cover.png'],
]);
const cdnImage = 'https://cdn.sanity.io/images/qet8gm0s/production/abc-1024x1024.png';

for (const [description, input, expected] of [
  ['case-insensitive legacy filename', 'INTERVALTIMER.PNG', '/images/intervalTimer.png'],
  ['encoded local filename', 'Project Cover.png', '/images/Project%20Cover.png'],
  ['surrounding whitespace', ' intervalTimer.png ', '/images/intervalTimer.png'],
  ['Sanity CDN image', cdnImage, cdnImage],
  [
    'Sanity image transformations',
    `${cdnImage}?w=600&auto=format`,
    `${cdnImage}?w=600&auto=format`,
  ],
  ['missing image', undefined, undefined],
  ['blank image', '  ', undefined],
  ['unknown filename', 'missing.png', undefined],
  ['local traversal', '../intervalTimer.png', undefined],
  ['insecure HTTP', cdnImage.replace('https:', 'http:'), undefined],
  ['protocol-relative URL', cdnImage.replace('https:', ''), undefined],
  ['untrusted remote host', 'https://example.com/image.png', undefined],
  ['lookalike hostname', cdnImage.replace('cdn.sanity.io', 'cdn.sanity.io.evil.test'), undefined],
  ['embedded credentials', cdnImage.replace('https://', 'https://user:password@'), undefined],
  ['nonstandard port', cdnImage.replace('cdn.sanity.io', 'cdn.sanity.io:8443'), undefined],
  ['non-image Sanity path', cdnImage.replace('/images/', '/files/'), undefined],
  ['incomplete CDN path', 'https://cdn.sanity.io/images/qet8gm0s/production/', undefined],
  ['script URL', 'javascript:alert(1)', undefined],
  ['embedded image', 'data:image/png;base64,abc', undefined],
]) {
  test(description, () => {
    assert.equal(resolveProjectImage(input, imagesByName), expected);
  });
}

test('cover delivery is resized without changing the CMS original', () => {
  const resolved = new URL(resolveProjectImage(cdnImage, imagesByName, 600));
  assert.equal(resolved.searchParams.get('w'), '600');
  assert.equal(resolved.searchParams.get('q'), '85');
  assert.equal(resolved.searchParams.get('auto'), 'format');
  assert.equal(resolved.searchParams.get('fit'), 'max');
  assert.equal(cdnImage.includes('?'), false);
});

test('icon delivery is small and retains existing crop parameters', () => {
  const resolved = new URL(resolveProjectImage(`${cdnImage}?rect=0,0,512,512`, imagesByName, 96));
  assert.equal(resolved.searchParams.get('w'), '96');
  assert.equal(resolved.searchParams.get('rect'), '0,0,512,512');
});

test('local image URLs are not changed by CDN delivery options', () => {
  assert.equal(
    resolveProjectImage('intervalTimer.png', imagesByName, 600),
    '/images/intervalTimer.png'
  );
});
