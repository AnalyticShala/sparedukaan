# SpareDukaan

Storefront front-end for SpareDukaan: mobile spare parts and accessories, verified for the buyer's exact phone model.

## Run

```
npm install
npm run dev
```

Opens on http://localhost:5173. `npm run build` type-checks and produces `dist/`.

## What is here

- `src/components/ExplodedPhone.tsx` - the hero. A sticky stage inside a tall section; scroll progress (spring-smoothed) drives each phone layer out to its exploded position. Every layer is a button that sets the part and scrolls to the counter.
- `src/components/Counter.tsx` - the three-column finder (company > model > Spare Parts / Accessories) with the "parchi" slip.
- `src/pages/ModelPage.tsx` - results for one model: pinned device bar, category tabs, part rail, product cards with Verified fit / Fit under review.
- `src/data/catalog.ts` - brands, models (with exact model codes), part types and sample variants. Shapes mirror the starter CSVs in the project document. All of it is placeholder data to be replaced by verified catalogue records.
- `src/store/selection.tsx` - the buyer's current selection, shared between the hero, the counter and the symptom/category/brand shortcuts.
- `src/lib/smoothScroll.tsx` - Lenis inertial scrolling (disabled under prefers-reduced-motion).

## Not yet built

Product detail page, cart, checkout, accounts, real images, commerce back end. See the project document for the full scope.
