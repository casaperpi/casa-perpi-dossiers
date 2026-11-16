# CASA PERPI — Product & Creative Direction / v0.1
Date: 2026-11-16
Branch: feat/casaperpi-premium-web

## Mission
Build casaperpi.com as a premium Mediterranean hospitality brand and an effective owner-acquisition website for short- and medium-term rental concierge services in Perpignan and along the Catalan coast.

## Non-negotiables
- No public property-management cockpit; operations remain with the existing channel manager.
- Keep the existing /api onboarding backend undisturbed.
- Do not invent ratings, client counts, financial results, testimonials or guaranteed returns.
- Premium, editorial, handcrafted visual expression; no generic SaaS cards, decorative emoji, fabricated infographics or excessive floating motion.
- Accessibility, mobile UX, performance and legible French copy take precedence over visual spectacle.
- Do not add payment collection to the site or imply Casa Perpi collects rent for owners.

## Brand
- Palette direction: deep garnet, ivory, warm limestone, restrained terracotta and muted brass.
- Type: high-contrast editorial serif + neutral contemporary sans; ensure local/system fallbacks.
- Photographic direction: authentic coastal architecture, natural Mediterranean light, lived-in interiors, disciplined crops.
- Motion: controlled reveals, filmic section cuts, light scroll-linked movement only when meaningful and respectful of reduced-motion preferences.
- Inspiration for execution quality: 997.fr; never reproduce its branding or code.

## Audiences
1. Property owners: trust, clarity, services, contact.
2. Travelers: reassurance and brand discovery, with non-confusing path to the portfolio/booking platform as relevant.

## Initial navigation
Accueil / Notre approche / Les services / Territoire / Contact.
Portfolio/Logements can be added only when real listings, imagery and compliant booking links are ready.

## Commercial truth
Offres known from earlier work: Essentiel 21%, Sérénité 24%, subject to latest contract and terms validation before public launch. No assumed discounts. Owner collects accommodation payments. CASA PERPI acts as co-host without a Carte G, and cannot misrepresent regulated real-estate brokerage services.

## Homepage content architecture
01 Full-screen branded editorial hero. Clear statement: "Votre adresse, notre attention." Secondary: "Conciergerie de location courte et moyenne durée à Perpignan et sur la Côte catalane." Primary CTA: "Confier mon logement".
02 Positioning: local presence; thoughtful hosting; property care. Explain concretely and without metrics.
03 Signature services: commercial listing optimization and guest communications; stay preparation, housekeeping coordination, property follow-up depending on plan.
04 Territory: Perpignan / Côte catalane; real grounded content.
05 How it works: premier échange, visite & stratégie, mise en ligne & suivi.
06 Contact: conversion CTA to direct email; secure production-grade inquiry form to follow after backend review.

## Engineering architecture — decision pending repository/deployment audit
- First frontend candidate: isolated static progressive enhancement prototype under web/ to avoid breaking production.
- Future framework migration only if justified by content workflows, localization, animation production needs, maintainability and Vercel setup.
- Responsive 320px+; WCAG 2.2 AA target; reduced motion; asset budgets and image dimensions; semantic HTML; canonical and metadata.
- Forms must be server-validated, rate-limited and use no secrets in client-side code.
- Analytics privacy/CMP require implementation appropriate to deployed trackers and applicable law.
- SEO: unique titles/descriptions, structured Organization/LocalBusiness only with verified attributes, geographic service pages only if original/useful.

## Quality gates
G1 Truth/brand consistency; G2 typography/layout; G3 responsive and keyboard; G4 performance; G5 security; G6 working conversion; G7 analytics/SEO; G8 cross-browser validation.

## Immediate open dependencies
- Vercel team grant required for project/deployments audit.
- Confirm domain's current DNS, live build, and existing Vercel project before any production change.
- Validate current commercial terms before posting fees.
- Obtain authentic photography / licensed assets before final production art direction.
