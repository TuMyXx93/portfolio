#!/usr/bin/env node
// tools/spec-trace.mjs
// Verifica que cada requisito RF-XX de las specs activas tenga al menos
// un test que lo referencie con // spec:<id>#RF-XX

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SPECS_DIR = join(ROOT, 'specs');
const TEST_GLOBS = [
  join(ROOT, 'src'),
  join(ROOT, 'e2e'),
  join(ROOT, '__tests__'),
];

function collectTestFiles(dir) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      results.push(...collectTestFiles(full));
    } else if (/\.(test|spec)\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function parseSpecs() {
  if (!existsSync(SPECS_DIR)) return [];
  const specs = [];
  for (const entry of readdirSync(SPECS_DIR, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    if (entry.name === 'README.md') continue;
    const content = readFileSync(join(SPECS_DIR, entry.name), 'utf8');
    const idMatch = content.match(/^\*\*ID:\*\*\s*`?([a-z0-9-]+)`?/m);
    const statusMatch = content.match(/^\*\*Estado:\*\*\s*`?(\w+)`?/m);
    const id = idMatch ? idMatch[1] : entry.name.replace('.md', '');
    const status = statusMatch ? statusMatch[1] : 'draft';
    if (status !== 'active' && status !== 'implemented') continue;

    const reqRegex = /RF-(\d+)/g;
    const reqs = new Set();
    let m;
    while ((m = reqRegex.exec(content)) !== null) {
      reqs.add(`RF-${m[1]}`);
    }
    // Deduplicate by scanning the requirements table specifically
    const tableReqs = new Set();
    const tableMatch = content.match(/\| (RF-\d+) \|/g);
    if (tableMatch) {
      for (const t of tableMatch) {
        const r = t.match(/RF-(\d+)/);
        if (r) tableReqs.add(`RF-${r[1]}`);
      }
    }
    const requirements = tableReqs.size > 0 ? tableReqs : reqs;
    specs.push({ id, status, requirements, file: entry.name });
  }
  return specs;
}

function main() {
  const specs = parseSpecs();
  if (specs.length === 0) {
    console.log('spec-trace: no active/implemented specs found.');
    process.exit(0);
  }

  const testFiles = TEST_GLOBS.flatMap(collectTestFiles);
  const testContents = testFiles.map(f => ({
    file: relative(ROOT, f),
    content: readFileSync(f, 'utf8'),
  }));

  let hasOrphans = false;
  for (const spec of specs) {
    console.log(
      `\nSpec: ${spec.id} (${spec.status}) — ${spec.requirements.size} requisitos`
    );
    for (const req of [...spec.requirements].sort()) {
      const ref = `spec:${spec.id}#${req}`;
      const altRef = `${spec.id}#${req}`;
      const found = testContents.some(
        t =>
          t.content.includes(ref) ||
          t.content.includes(altRef) ||
          t.content.includes(`spec:${spec.id} ${req}`) ||
          new RegExp(`//\\s*spec:${spec.id}#${req}`).test(t.content)
      );
      if (found) {
        const files = testContents
          .filter(
            t =>
              t.content.includes(ref) ||
              t.content.includes(altRef) ||
              new RegExp(`//\\s*spec:${spec.id}#${req}`).test(t.content)
          )
          .map(t => t.file);
        console.log(`  ✅ ${req} → ${files.join(', ')}`);
      } else {
        console.log(`  ❌ ${req} — SIN TEST`);
        hasOrphans = true;
      }
    }
  }

  if (hasOrphans) {
    console.error('\n❌ spec-trace: requisitos sin test detectados.');
    process.exit(1);
  }
  console.log('\n✅ spec-trace: todos los requisitos tienen test.');
}

main();
