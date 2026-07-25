import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { siteConfig } from "../data/site";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const INK = "#1d1d24";
const NEUTRAL = "#eae8e0";
const MUTED = "#6e6e78";

const PINWHEEL_COLORS = ["#e23b32", "#2f6fd0", "#2e9e5b", "#e8b62a"];
const PINWHEEL_ANGLES = [-20, -110, -200, -290];

interface OgImageInput {
  title: string;
  description: string;
}

let cachedFonts: Promise<
  {
    name: string;
    data: Buffer;
    weight: 400 | 700;
    style: "normal";
  }[]
> | null = null;

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}...`;
}

async function loadFonts() {
  const [regular, bold] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules",
        "@fontsource",
        "inter",
        "files",
        "inter-latin-400-normal.woff",
      ),
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules",
        "@fontsource",
        "inter",
        "files",
        "inter-latin-700-normal.woff",
      ),
    ),
  ]);

  return [
    {
      name: "Inter",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: bold,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}

async function getFonts() {
  if (!cachedFonts) {
    cachedFonts = loadFonts();
  }

  return cachedFonts;
}

// Mirrors public/favicon.svg (128 viewBox): four rounded bars swept around a white dot.
function pinwheelMark(size: number) {
  const scale = size / 128;

  const petals = PINWHEEL_ANGLES.map((angle, index) => ({
    type: "div",
    props: {
      style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        transform: `rotate(${angle}deg)`,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: `${67 * scale}px`,
              top: `${54 * scale}px`,
              width: `${46 * scale}px`,
              height: `${20 * scale}px`,
              borderRadius: `${10 * scale}px`,
              backgroundColor: PINWHEEL_COLORS[index],
            },
          },
        },
      ],
    },
  }));

  const dot = {
    type: "div",
    props: {
      style: {
        position: "absolute",
        left: `${55 * scale}px`,
        top: `${55 * scale}px`,
        width: `${18 * scale}px`,
        height: `${18 * scale}px`,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
      },
    },
  };

  return {
    type: "div",
    props: {
      style: {
        position: "relative",
        display: "flex",
        width: `${size}px`,
        height: `${size}px`,
      },
      children: [...petals, dot],
    },
  };
}

export async function renderOgImage(input: OgImageInput) {
  const isHome = input.title === siteConfig.name;
  const title = truncate(input.title, 60);
  const description = truncate(
    isHome ? siteConfig.tagline : input.description,
    96,
  );

  const markup = {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "34px",
        backgroundColor: NEUTRAL,
        color: INK,
        padding: "90px",
        fontFamily: "Inter",
      },
      children: [
        pinwheelMark(132),
        {
          type: "h1",
          props: {
            style: {
              margin: 0,
              fontSize: "76px",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontWeight: 700,
              color: INK,
            },
            children: title,
          },
        },
        {
          type: "p",
          props: {
            style: {
              margin: 0,
              fontSize: "30px",
              lineHeight: 1.4,
              color: MUTED,
              maxWidth: "840px",
            },
            children: description,
          },
        },
      ],
    },
  };

  const svg = await satori(markup, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await getFonts(),
  });

  const png = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: OG_WIDTH,
    },
  })
    .render()
    .asPng();

  const body = new Uint8Array(png);

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
