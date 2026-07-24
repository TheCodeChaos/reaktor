import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { siteConfig } from "../data/site";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const INK = "#1d1d24";
const IVORY = "#f7f5ef";
const MUTED = "#6e6e78";
const SOFT = "#9a9aa3";
const HAIRLINE = "#e4e1d6";

const PINWHEEL_COLORS = ["#e23b32", "#2f6fd0", "#2e9e5b", "#e8b62a"];
const PINWHEEL_ANGLES = [-20, -110, -200, -290];

interface OgImageInput {
  title: string;
  description: string;
  label: string;
  path: string;
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
  const title = truncate(input.title, 92);
  const description = truncate(input.description, 172);
  const pagePath = truncate(input.path || "/", 56);

  const markup = {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: IVORY,
        color: INK,
        padding: "60px",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    fontSize: "27px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  },
                  children: [pinwheelMark(46), siteConfig.shortName],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "17px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: SOFT,
                  },
                  children: input.label,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "1000px",
            },
            children: [
              {
                type: "h1",
                props: {
                  style: {
                    margin: 0,
                    fontSize: "66px",
                    lineHeight: 1.05,
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
                    fontSize: "28px",
                    lineHeight: 1.4,
                    color: MUTED,
                    maxWidth: "960px",
                  },
                  children: description,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "21px",
              color: SOFT,
              borderTop: `1px solid ${HAIRLINE}`,
              paddingTop: "26px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex" },
                  children: siteConfig.tagline,
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex" },
                  children: pagePath,
                },
              },
            ],
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
