import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { siteConfig } from "../data/site";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const INK = "#16161a";
const NEUTRAL = "#f7f2e7";
const SURFACE = "#fffcf3";
const MUTED = "#5c5c63";

// Arm colours and sweep angles come straight from PinwheelLogo.
const PINWHEEL_COLORS = ["#ff6644", "#fbc711", "#89d29f", "#71a3fd"];
const PINWHEEL_ANGLES = [45, 135, 225, 315];

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

// Ported from PinwheelLogo in the app (lib/widgets/pinwheel_logo.dart). Flutter
// centres a stroke on the path while CSS borders sit inside the box, so every
// shape here is grown by one stroke width and its radius by half of one; that
// is what keeps this drawing identical to the favicon and the in-app mark.
function pinwheelMark(size: number) {
  const scale = size / 512;
  const px = (v: number) => `${v * scale}px`;

  // Arm: 76x166 path, radius 38, stroke 18, running from y -194 to -28 about a
  // centre of 236. Grown to a 94x184 border box at (189, 33).
  const arm = (fill: string, border: string) => ({
    type: "div",
    props: {
      style: {
        position: "absolute",
        left: px(189),
        top: px(33),
        width: px(94),
        height: px(184),
        borderRadius: px(47),
        border: `${px(18)} solid ${border}`,
        backgroundColor: fill,
      },
    },
  });

  // Rotating about the mark's centre, which is 236 rather than 256: a 472 box
  // pinned at the origin puts its own midpoint exactly there.
  const spoke = (angle: number, fill: string, border: string) => ({
    type: "div",
    props: {
      style: {
        position: "absolute",
        left: "0px",
        top: "0px",
        width: px(472),
        height: px(472),
        display: "flex",
        transform: `rotate(${angle}deg)`,
      },
      children: [arm(fill, border)],
    },
  });

  // Dot: radius 47 plus an 18 stroke, so a 112 border box at (180, 180).
  const dot = (fill: string, border: string) => ({
    type: "div",
    props: {
      style: {
        position: "absolute",
        left: px(180),
        top: px(180),
        width: px(112),
        height: px(112),
        borderRadius: px(56),
        border: `${px(18)} solid ${border}`,
        backgroundColor: fill,
      },
    },
  });

  const layer = (offset: number, fill: string | null, border: string) => ({
    type: "div",
    props: {
      style: {
        position: "absolute",
        left: px(offset),
        top: px(offset),
        width: px(512),
        height: px(512),
        display: "flex",
      },
      children: [
        ...PINWHEEL_ANGLES.map((angle, i) =>
          spoke(angle, fill ?? PINWHEEL_COLORS[i], border),
        ),
        dot(fill ?? SURFACE, border),
      ],
    },
  });

  return {
    type: "div",
    props: {
      style: {
        position: "relative",
        display: "flex",
        width: `${size}px`,
        height: `${size}px`,
      },
      children: [layer(22, INK, INK), layer(0, null, INK)],
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
        pinwheelMark(176),
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
