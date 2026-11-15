#!/usr/bin/env node
// tools/check-doc-drift.mjs
// Verifica consistencia de documentación: versiones, índice, OpenAPI vs Zod

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function readFile(path) {
  return readFileSync(path, 'utf8');
}

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ❌ ${msg}`);
  errors++;
}
function warn(msg) {
  console.warn(`  ⚠️  ${msg}`);
  warnings++;
}
function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

// 1. Version anchors: AGENTS.md vs package.json / .node-version
console.log('\n=== 1. Version anchors (AGENTS.md vs package.json) ===');
const pkg = readJson(join(ROOT, 'package.json'));
const nodeVersion = readFile(join(ROOT, '.node-version')).trim();
const agents = readFile(join(ROOT, 'AGENTS.md'));

const checks = [
  {
    name: 'Next.js',
    doc: /Next\.js (\d+)/,
    actual: pkg.dependencies.next.match(/^[\^~]?(\d+)/)?.[1],
  },
  {
    name: 'React',
    doc: /React (\d+)/,
    actual: pkg.dependencies.react.match(/^[\^~]?(\d+)/)?.[1],
  },
  {
    name: 'TypeScript',
    doc: /TypeScript (\d+\.\d+)/,
    actual: (
      pkg.dependencies.typescript || pkg.devDependencies?.typescript
    )?.match(/^[\^~]?(\d+\.\d+)/)?.[1],
  },
  {
    name: 'Tailwind',
    doc: /Tailwind CSS (\d+)/,
    actual: pkg.dependencies.tailwindcss.match(/^[\^~]?(\d+)/)?.[1],
  },
  {
    name: 'Framer Motion',
    doc: /Framer Motion (\d+)/,
    actual: pkg.dependencies['framer-motion'].match(/^[\^~]?(\d+)/)?.[1],
  },
  {
    name: 'Jest',
    doc: /Jest (\d+)/,
    actual: pkg.devDependencies.jest.match(/^[\^~]?(\d+)/)?.[1],
  },
];
for (const c of checks) {
  const m = agents.match(c.doc);
  if (m && c.actual && m[1] !== c.actual) {
    error(`${c.name}: AGENTS.md dice ${m[1]}, package.json tiene ${c.actual}`);
  } else if (m && c.actual) {
    ok(`${c.name}: ${c.actual}`);
  }
}
// Node version
if (agents.includes('Node 20')) {
  warn('AGENTS.md o skills mencionan "Node 20" — debería ser Node 24');
} else {
  ok('Node: sin referencia obsoleta a Node 20 en AGENTS.md');
}
// Check skills too
const devopsSkill = existsSync(
  join(ROOT, '.opencode/skills/devsecops-workflow-skill.md')
)
  ? readFile(join(ROOT, '.opencode/skills/devsecops-workflow-skill.md'))
  : '';
const devopsAgent = existsSync(join(ROOT, '.opencode/agents/devops-agent.md'))
  ? readFile(join(ROOT, '.opencode/agents/devops-agent.md'))
  : '';
if (devopsSkill.includes('Node 20') || devopsAgent.includes('Node 20')) {
  error('Skills/agents aún mencionan "Node 20"');
} else {
  ok('Skills/agents: Node 24');
}
// .node-version consistency
if (
  nodeVersion !== pkg.engines.node.replace(/[>=<]/g, '').trim().split(' ')[0]
) {
  // just check major
  const nodeMajor = nodeVersion.split('.')[0];
  const engineMajor = pkg.engines.node.match(/(\d+)/)?.[1];
  if (nodeMajor !== engineMajor) {
    error(
      `.node-version (${nodeVersion}) no coincide con engines.node (${pkg.engines.node})`
    );
  } else {
    ok(`.node-version (${nodeVersion}) consistente con engines`);
  }
} else {
  ok(`.node-version (${nodeVersion}) consistente`);
}

// 2. Docs index completeness
console.log('\n=== 2. Docs index completeness (docs/README.md) ===');
const docsIndex = readFile(join(ROOT, 'docs/README.md'));
const docFiles = [];
function collectDocs(dir, prefix = '') {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) collectDocs(full, prefix + e.name + '/');
    else if (e.name.endsWith('.md')) docFiles.push(prefix + e.name);
  }
}
collectDocs(join(ROOT, 'docs'));
// Also root-level docs
const rootDocs = [
  'README.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'AGENTS.md',
  'CHANGELOG.md',
];
let missing = 0;
for (const f of docFiles) {
  const name = f.split('/').pop();
  if (!docsIndex.includes(name) && !docsIndex.includes(f)) {
    // Check if it's referenced somehow
    if (!docsIndex.includes(name.replace('.md', ''))) {
      warn(`docs/${f} no está indexado en docs/README.md`);
      missing++;
    }
  }
}
for (const f of rootDocs) {
  if (f === 'README.md' || f === 'CHANGELOG.md') continue;
  if (!docsIndex.includes(f)) {
    warn(`${f} (raíz) no está indexado en docs/README.md`);
    missing++;
  }
}
if (missing === 0) ok('Todos los docs están indexados');

// 3. OpenAPI vs Zod consistency
console.log('\n=== 3. OpenAPI vs Zod consistency ===');
const openapiPath = join(ROOT, 'specs/0001-contact-api.openapi.yaml');
const zodPath = join(ROOT, 'src/lib/contact/schema.ts');
if (existsSync(openapiPath) && existsSync(zodPath)) {
  const openapi = readFile(openapiPath);
  const zod = readFile(zodPath);
  // Simple string-based checks
  if (zod.includes('.max(254)') && !openapi.includes('maxLength: 254')) {
    error('OpenAPI: email maxLength 254 ausente (Zod lo tiene)');
  } else if (openapi.includes('maxLength: 254')) {
    ok('OpenAPI: email maxLength 254 presente');
  }
  if (zod.includes('.min(20)') && openapi.includes('minLength: 20')) {
    ok('OpenAPI: message minLength 20 presente');
  } else {
    error('OpenAPI: message minLength 20 ausente o incorrecto');
  }
  if (openapi.includes('minLength: 2') && openapi.includes('maxLength: 100')) {
    ok('OpenAPI: name constraints presentes');
  }
  // Check response codes
  for (const code of ['413', '500', '502', '503']) {
    if (openapi.includes(`'${code}':`)) {
      ok(`OpenAPI: código ${code} documentado`);
    } else {
      error(`OpenAPI: código ${code} no documentado`);
    }
  }
  // Check 200 message
  if (openapi.includes('Message sent successfully')) {
    ok('OpenAPI: mensaje 200 correcto');
  } else {
    error('OpenAPI: mensaje 200 incorrecto');
  }
} else {
  warn('OpenAPI o Zod no encontrados, saltando verificación');
}

// 4. Docker compose reference
console.log('\n=== 4. Referencias a archivos inexistentes ===');
if (agents.includes('via `docker-compose.beta.yml`')) {
  error('AGENTS.md aún referencia docker-compose.beta.yml (inexistente)');
} else {
  ok('AGENTS.md: sin referencia a docker-compose.beta.yml');
}

// 5. .eslintrc.json (dead config)
console.log('\n=== 5. Configuración muerta ===');
if (existsSync(join(ROOT, '.eslintrc.json'))) {
  warn('.eslintrc.json existe (config muerta con ESLint 9 flat config)');
} else {
  ok('.eslintrc.json eliminado');
}

// 6. Lighthouse workflow
console.log('\n=== 6. Lighthouse CI ===');
const workflows = readdirSync(join(ROOT, '.github/workflows'));
const hasLighthouse = workflows.some(f => f.includes('lighthouse'));
if (hasLighthouse) {
  ok('Workflow de Lighthouse encontrado');
} else {
  warn('Sin workflow de Lighthouse (config huérfana en .lighthouserc.json)');
}

// Summary
console.log('\n=== Resumen ===');
console.log(`Errores: ${errors}, Advertencias: ${warnings}`);
if (errors > 0) {
  console.error('\n❌ check-doc-drift: fallos detectados.');
  process.exit(1);
}
console.log('\n✅ check-doc-drift: OK');
