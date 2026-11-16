# CASA PERPI — INDEPENDENT RED TEAM / QA BOARD
Created 2026-11-16 · Applies to all future site releases.

## Independence / authority
Team B evaluates work from Team A; it must not author production UI code as part of a review. It must document defects with reproduction steps and evidence, rather than rationalize implementation. A model simulating these roles is NOT a set of concurrently running independent autonomous agents. For true independent execution, assign each role to a separate reviewer/process and run the automated suites. No claim of a completed test without an actual run.

## Reviewers and vetoes
1. **Creative Red Team Lead** — adversarial art direction, visual originality, color grading, typography, hierarchy, memorability, anti-template review. Can veto release.
2. **Experience & Storytelling Critic** — loading experience, transitions, spatial rhythm, choreography, navigation architecture, creative coherence. Can veto release.
3. **UX Research / Conversion Auditor** — first-five-second comprehension, owner vs traveler paths, CTA actions, navigation and business outcomes. Can veto release.
4. **Visual Quality Inspector** — inspect each breakpoint and scrolling state; image sharpness, cropping, contrast, alignment, spacing, legibility and font optical issues. Can veto release.
5. **Front-end / Interaction QA** — keyboard, touch, hover, animation state machines, reduced motion, loading/refresh/back/forward, responsiveness.
6. **Performance / Web Vitals Auditor** — LCP, CLS, INP, image bytes, font loading, network throttling, JS payload, GPU impact. Can veto release for serious regressions.
7. **Accessibility Auditor** — WCAG 2.2 AA target; contrast, focus, screen readers, motion, landmark flow, accessible menu, semantic structure. Can veto release.
8. **Backend / Security Auditor** — SSRF/XSS, input validation, spam protection, authentication, secrets, data exposure, logging, dependency risks. Can veto release.
9. **SEO/GEO / Editorial Fact Checker** — meta, schema, canonical, hreflang, search intent, claims, unique useful content, geographically grounded content. Can veto release for misrepresentation.
10. **Cross-device Regression QA** — desktop/tablet/mobile, Chromium/WebKit/Firefox, network/CPU variations, no-JS fallback.
11. **Legal / Privacy Gate** — mandatory operator identity, privacy and cookie/analytics assessment, consent and handling of owner data.
12. **Release Manager / Independent Sign-off** — verifies evidence completeness and blocks any release with unsatisfied blocker/critical issue. No unilateral override by Team A.

## What the client actually wants — evaluate against these
- Character and extravagance: high-concept, non-generic luxury hospitality visual world.
- Opening loading sequence with visible drawing/reveal; not fake progress, not a forced long wait.
- Disciplined photographic art direction and consistent custom color grading; licensed/place-relevant imagery.
- Distinctive typography, not repetitive italic serif cliches.
- Strong full-viewport visual composition (not default left-aligned headline).
- Multi-page information architecture when justified; no one-page-template feel.
- Interactive discovery from start to finish, without pointless scrolling or decorative sections.
- Every CTA must lead to a meaningful, functional destination.
- Bespoke transitions and motion where they deepen the story; accessible reduced-motion variant.
- Everything delivered by Team A must be interrogated before being submitted to the owner.

## Quality process
**Input:** target URL + commit SHA + change summary + supported device list + acceptance criteria.
**Stage 1 — static:** lint, source/content/security review, links and asset inventory, automated gate.
**Stage 2 — visual:** screenshot full page and each major viewport/state (375x812, 768x1024, 1440x900, 1920x1080); verify crop, responsive navigation, type, color, layout.
**Stage 3 — journey:** fresh visit, loader, first scroll, every nav target, CTAs, form, errors, back navigation, localization, keyboard.
**Stage 4 — technical:** Lighthouse on mobile/desktop, Web Vitals field data when available, browser console/network errors, accessibility scan + manual test.
**Stage 5 — adversarial:** Creative lead criticizes every section and removes any section without purpose. Reviewer supplies at least 3 credible failure cases for every major feature.
**Stage 6 — adjudication:** every defect gets unique ID, owner, priority, screenshot/log/steps and disposition. Regenerate screenshot and run regression after fix.

## Priority
- P0 STOP: major security/privacy failure; production outage; inaccessible key journey; materially false commercial claim.
- P1 BLOCK: broken links/CTA; mobile clipping, nonfunctional loader, unusable keyboard interaction, generic/low-quality brand execution, substantial performance degradation, missing required legal detail.
- P2 FIX BEFORE LAUNCH: hierarchy, typography, micro-motion, imagery grading, smaller responsive defects, SEO content gaps.
- P3 POLISH: non-blocking cosmetic tweaks.
**Release criteria:** no open P0/P1, P2 explicitly triaged, accessibility and responsiveness verified, functional contact route tested, legal/privacy gate passed, independent release sign-off recorded.

## Defect template
ID; URL/commit; reviewer; category; severity; reproduction; expected/actual; screenshot or log; impact on user/business; owner; resolution; retest status.

## Known V1 defects — sourced from owner review + code inspection, NOT automated browser testing
- RT-001 P1 Creative: generic brochure/home composition and low originality.
- RT-002 P1 Visual: unspecialized imagery, no coherent custom color grading, external generic placeholder photos.
- RT-003 P1 Typography: default Georgia/Helvetica; repeated italic serif treatment.
- RT-004 P1 Journey: no entrance/loading choreography.
- RT-005 P1 IA: one-page-only structure with repetitive scrolling.
- RT-006 P1 Conversion: mailto CTAs only; no demonstrably validated contact/qualification workflow.
- RT-007 P1 Design: left-aligned headline and visually conservative layout.
- RT-008 P2 Content: excessive sections with insufficient distinctive information.
- RT-009 P1 Assets: hotlinked Unsplash images requiring rights/source/brand pertinence review.
- RT-010 P1 Legal: footer explicitly states legal/privacy pages still need implementation.
- RT-011 P2 Interaction: no loading error strategy, no meaningful route-level discovery.
These are review findings, not evidence that every target browser/device has been tested.

## Release evidence template
- Commit:
- Deployment:
- Screenshots by viewport:
- Browser versions:
- Automated pipeline status:
- Manual creative/UX decision:
- A11y evidence:
- Performance evidence:
- Security/privacy decision:
- Unresolved risks:
- Independent release manager signature:
- Final decision: REJECTED / NEEDS WORK / APPROVED.

## Guardrails
- Never claim agents/testers ran if only a prompt or document exists.
- No merges to main or connecting casaperpi.com based only on automated green checks.
- A high Lighthouse score is not a creative-quality approval.
- Owner review is the final acceptance, but Team B must reject inadequate work BEFORE seeking owner approval.
