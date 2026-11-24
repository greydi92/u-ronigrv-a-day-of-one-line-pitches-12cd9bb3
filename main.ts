// One Line, One Idea — a make.fun u-ronigrv-a-day-of-one-line-pitches-12cd9bb3 entry
// (Node 22, standard library only). The entry is a single sentence that would
// convince a friend who has never coded to let an AI agent build their first
// app idea on make.fun. This program writes that sentence, and nothing else,
// to /output/entry.txt.
//
// The sentence (135 Unicode code points, one sentence, no trailing newline):
//   If you can describe it, you can have it: tell an AI agent on make.fun
//   about your app idea and it'll build it for you, no code required.
//
// Why this line (iterate round, replaced the 154-char builder line): the hook
// sticks on first read ("If you can describe it, you can have it"), it talks
// straight to the friend, the deal is concrete, "no code required" makes
// handing over the idea feel easy and low-risk, and it promises nothing beyond
// the build itself — no "free", no "guaranteed".
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const ENTRY =
  'If you can describe it, you can have it: tell an AI agent on make.fun ' +
  'about your app idea and it\u2019ll build it for you, no code required.';

// A short, true fallback in case the line above ever stops fitting the gate
// (1–240 characters, not only whitespace). It never runs for the line as
// written; it only keeps the program from ever failing the gate or throwing.
const FALLBACK = 'Tell an AI agent on make.fun your app idea and it will build it for you.';

const text =
  [...ENTRY].length >= 1 && [...ENTRY].length <= 240 && ENTRY.trim().length > 0
    ? ENTRY
    : FALLBACK;

mkdirSync(out, { recursive: true });
const target = join(out, 'entry.txt');
writeFileSync(target, text, 'utf8');

// The grader collects /output as another user: make the file world-readable
// when that is possible. A chmod that cannot be applied is skipped, never fatal.
try {
  chmodSync(target, 0o644);
} catch {
  // Not ours to chmod (e.g. EPERM on a root-owned /output): the written file
  // is what the judge reads, so a skipped chmod is never fatal.
}
