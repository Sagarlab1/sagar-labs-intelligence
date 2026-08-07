# Sagar Experience OS — Sales Conversion Loop

## Product experience

- Reframed the website around the commercial promise: confidence, clarity, evidence and decision quality.
- Added bilingual English/Spanish UI switching in the shared shell, navigation, hero, offer, contact flow, methodology, use cases and new product pages.
- Added visible language controls for desktop and mobile.
- Added the requested pages: Home, How It Works, Decision Intelligence, Decision Room Demo, Use Cases, Evidence & Methodology, About, Pricing / Decision Sprint, Contact and Client Login placeholder.

## Conversion system

- Hero now has three distinct paths: Start a Decision, See How It Works and View Demo.
- Added the Power-to-Compute Decision Sprint offer without hard-coding unvalidated public pricing.
- Added short lead capture fields: name, company, email and decision/project.
- Added illustrative demo data labels and explicit source/unknown/risk language.
- Added conversion event hooks via `sagar:analytics`: `hero_start_decision`, `hero_view_demo`, `decision_sprint_click` where applicable, `contact_submit`, `language_change` and a reusable event surface for `demo_complete`.

## Trust and methodology

- Added evidence, facts, assumptions, hypotheses, unknowns and expert-review distinctions.
- Added respectful traditional-analysis versus Sagar comparison without unverifiable performance claims.
- Added opportunity discovery, strategic paths and decision-roadmap sections.

## Engineering

- Preserved the existing Next/vinext architecture and frozen backend systems.
- Added responsive layouts, keyboard-friendly controls, reduced-motion support and dark/light mode.
- Updated metadata and keywords for English and Spanish decision-intelligence search intent.
