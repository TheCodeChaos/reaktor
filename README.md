<p align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="public/logo-dark.svg">
		<img alt="Reaktor" src="public/logo-light.svg" width="220">
	</picture>
</p>

<p align="center">
	Marketing site and blog for Reaktor, a chain reaction strategy game for 2 to 6 players.
</p>

Built with Astro.

## Requirements

- Node.js >= 22.12.0
- npm

## Run Locally

```sh
npm i
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Notes

- Production site URL is controlled by `SITE` (defaults in Astro config).
- Build base path is controlled by `BASE_PATH`.
- GitHub Pages deployment is handled by workflows in `.github/workflows/`.
