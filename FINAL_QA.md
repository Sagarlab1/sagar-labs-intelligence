# Final QA

## Automated checks

- `npm run lint` — passed with no errors.
- `npm run build` — passed.
- `npm test` — passed after route coverage was expanded for the new experience pages.
- `npx tsc --noEmit` — passed after adding local ambient declarations for existing Three.js and Cloudflare worker type gaps.

## Route coverage

- `/`
- `/how-it-works`
- `/decision-intelligence`
- `/decision-room`
- `/scenario-explorer`
- `/evidence-explorer`
- `/ceo-summary`
- `/use-cases`
- `/pricing`
- `/about`
- `/contact`
- `/client-login`

## Interaction sanity

- Language switch: implemented through shared context and visible EN/ES controls.
- Theme switch: implemented through shared shell state.
- Scenario cards and evidence filters: interactive.
- Contact submit: lightweight local confirmation and `contact_submit` event hook.
- Client login: placeholder only; no credential collection.
- Reduced motion: supported through existing Framer Motion and CSS preference handling.
- Bilingual review: Spanish headline and CTA rendered successfully on `/decision-room`.

## Known limitations

- No live analytics provider is connected.
- Browser review: passed on desktop and a 390px mobile viewport for Home and Decision Room.
- The site uses illustrative demo data by design; it is not a customer result.
- Some existing deep-page copy outside the new conversion path remains English-only and should be localized before claiming complete Spanish parity.
