# ClayTone Black

Dark-theme variant of the current production site for Nonna / ClayTone.

## What stays identical

- current Nonna content and master data;
- all services, prices and durations;
- portfolio and promotion media;
- Yclients booking links and contact actions;
- mobile and desktop composition;
- gallery, reviews, animations and responsive behavior.

## What changes

Only the visual layer. ClayTone Black uses a graphite background, warm near-black surfaces, soft ivory typography and a restrained clay/rose accent for actions and highlights.

## Source snapshot

The build is pinned to production source `ichAEY/claytone-current` at commit `ce1bd42b44e76e1851af9e069c4cbcf06fc8eac2` so this version cannot drift when the main Nonna site changes later.

## Deployment

GitHub Actions rebuilds the production source, applies `dark-theme.css`, adjusts asset paths for this repository and deploys the static export to GitHub Pages after changes land on `main`.

Expected project Pages URL: `https://ichaey.github.io/claytone-black/`.
