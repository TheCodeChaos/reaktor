export const siteConfig = {
  name: "Reaktor",
  shortName: "Reaktor",
  tagline: "Fast rounds. Big reversals. Pure chain-reaction chaos.",
  description:
    "Reaktor is a chain-reaction strategy game for 1 to 6 players, with four computer difficulties, multiple board sizes, and dramatic chain bursts.",
  siteUrl: "https://TheCodeChaos.github.io/reaktor/",
  issuesUrl: "https://github.com/TheCodeChaos/reaktor/issues",
  appUrl: "https://TheCodeChaos.github.io/reaktor/app/",
  searchHint: "Ctrl+K",
} as const;

export const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
] as const;

export const playLink = {
  href: "https://TheCodeChaos.github.io/reaktor/app/",
  label: "Play",
} as const;

export const featureCards = [
  {
    title: "Every move changes the map",
    description:
      "Corners pop at two atoms, edges at three, center cells at four.",
  },
  {
    title: "Play solo or pass the phone",
    description:
      "Fill any seat with a computer opponent, or hand the device around the table.",
  },
  {
    title: "Built for dramatic reversals",
    description: "One well-timed burst can erase a lead.",
  },
  {
    title: "Four levels of opponent",
    description:
      "From a beginner who walks into cascades to an expert who reads your setups.",
  },
  {
    title: "Replay the last explosion",
    description: "Step through the previous chain to see how the board swung.",
  },
  {
    title: "Undo the last move",
    description: "Any player can take back the most recent placement.",
  },
  {
    title: "Sessions persist and resume",
    description: "Games save after every turn and resume from the home screen.",
  },
] as const;

export const boardPresets = [
  {
    name: "Sprint",
    size: "6×5",
    summary: "Tight, fast rounds.",
  },
  {
    name: "Classic",
    size: "9×6",
    summary: "Balanced pacing, the default preset.",
  },
  {
    name: "Warzone",
    size: "12×8",
    summary: "Long matches with late-game collapses.",
  },
] as const;

export const faqItems = [
  {
    question: "How do I play?",
    body: [
      "Tap an empty cell or one you own to add an atom. Corners burst at 2 atoms, edges at 3, and center cells at 4. A burst sends one atom into each neighbour and captures those cells, which can cascade.",
    ],
  },
  {
    question: "How do I win?",
    body: [
      "Clear every rival atom off the board. A player is out once they have no atoms left.",
    ],
  },
  {
    question: "Can I play on my own?",
    body: [
      "Yes. In setup, tap the Human button on any seat and pick a difficulty from Easy to Expert. Bots and people can share the same match, so you can play one on one against the computer or fill out a six-player board.",
    ],
  },
  {
    question: "Can I undo a move or replay a chain?",
    body: [
      "Yes to both. Undo steps back the last atom during a live match, and the replay control walks through the most recent explosion.",
    ],
  },
  {
    question: "Are games saved?",
    body: [
      "Every turn is saved on your device. Unfinished matches are listed on the home screen to resume or delete.",
    ],
  },
] as const;

export interface Developer {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly avatar: string;
  readonly links: {
    readonly github: string;
    readonly website?: string;
    readonly linkedin?: string;
    readonly sponsor?: string;
  };
}

export const developers: readonly Developer[] = [
  {
    id: "shravan",
    name: "Shravan Goswami",
    initials: "SG",
    avatar: "https://github.com/shravanngoswamii.png",
    links: {
      github: "https://github.com/shravanngoswamii",
      website: "https://shravangoswami.com/",
      linkedin: "https://www.linkedin.com/in/shravangoswami/",
      sponsor: "https://github.com/sponsors/shravanngoswamii?o=esb",
    },
  },
  {
    id: "jitendra",
    name: "Jitendra Verma",
    initials: "JV",
    avatar: "https://github.com/jitendravjh.png",
    links: {
      github: "https://github.com/jitendravjh",
      website: "https://jitendravjh.github.io",
    },
  },
  {
    id: "ayaan",
    name: "Ayaan Shaikh",
    initials: "AS",
    avatar: "https://github.com/Ayaan-7091.png",
    links: {
      github: "https://github.com/Ayaan-7091",
      linkedin: "https://www.linkedin.com/in/ayaan-shaikh-699a482a8/",
    },
  },
];

export const authors = {
  shravan: developers[0],
  jitendra: developers[1],
  ayaan: developers[2],
} as const;

export const builtWith = [
  "Flutter",
  "Riverpod",
  "Astro",
  "Pagefind",
  "Giscus",
] as const;
