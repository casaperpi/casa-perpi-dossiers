#!/usr/bin/env node
/**
 * Independent minimum release gate.
 * Static checks only: it cannot certify visual quality, user experience or runtime behavior.
 * Run: node qa/release-gate.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const htmlFile = join(root, 'web/index.html');
const failures = [], warnings = [], passes = [];
const check = (name, condition, message) => (condition ? passes : failures).push({ name, message });
if (!existsSync(htmlFile)) { console.error('FAIL web/index.html not found'); process.exit(1); }
const html = readFileSync(htmlFile, 'utf8');
const css = readFileSync(join(root, 'web/assets/site.css'), 'utf8');
const contact = readFileSync(join(root, 'web/contact/index.html'), 'utf8');
const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map(x => x[1]);
const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(x => x[1]));
const anchors = links.filter(x => x.startsWith('#'));
const broken = anchors.filter(x => x.length > 1 && !ids.has(x.slice(1)));
check('internal-anchor-integrity', broken.length === 0, broken.join(', ') || 'Internal anchors exist');
check('contact-path', (/mailto:contact@casaperpi\\.com/i.test(contact) || /<form\\b/i.test(contact)) && links.includes('/contact/'), 'Contact route missing or has no contact method');
check('no-placeholder-photos', !/images\.unsplash\.com|source\.unsplash\.com|picsum\.photos|placehold\.co/i.test(html), 'Unapproved placeholder photography detected');
check('legal-page', links.some(x => /mentions-legales|legal-notice/i.test(x)), 'Legal notice page must be linked');
check('privacy-page', links.some(x => /confidentialite|privacy-policy/i.test(x)), 'Privacy page must be linked');
check('loader-concept', /id=["']intro["']/.test(html) && /class=["']intro-skip["']/.test(html), 'Missing skippable intro experience');
check('non-onepage-information-architecture', links.some(x => /^\/(?!\/|#)/.test(x) && !/^\/\/?$/.test(x)), 'No secondary page route found');
check('reduced-motion', /prefers-reduced-motion/.test(css), 'No reduced-motion handling');
check('mobile-viewport', /name=["']viewport["']/.test(html), 'Viewport metadata missing');
check('document-language', /<html[^>]+lang=["']fr["']/i.test(html), 'Document lang missing');
check('main-landmark', /<main\b/i.test(html), 'No main landmark');
check('skip-link', /href=["']#contenu["']/.test(html) && ids.has('contenu'), 'No valid skip-to-content link');
check('meta-description', /name=["']description["']/.test(html), 'Missing meta description');
check('working-domain-not-assumed', !/href=["']#["']/i.test(html), 'Inert # links detected');
warnings.push({name:'manual-visual-review',message:'Required: no static test can certify character, typography, motion, layout and color grading.'});
warnings.push({name:'browser-and-performance-review',message:'Required: playwright browser tests, accessibility and Lighthouse on deployed preview.'});
for (const x of passes) console.log('PASS',x.name);
for (const x of failures) console.error('FAIL',x.name,'-',x.message);
for (const x of warnings) console.warn('MANUAL',x.name,'-',x.message);
console.log(JSON.stringify({passing:passes.length,blocking:failures.length,manual:warnings.length},null,2));
process.exit(failures.length ? 1 : 0);
