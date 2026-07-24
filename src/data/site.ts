export const siteConfig = {
  name: "Reaktor",
  shortName: "Reaktor",
  tagline: "Fast rounds. Big reversals. Pure chain-reaction chaos.",
  description:
    "Reaktor is a multiplayer strategy game for 2 to 6 players with multiple board sizes, and dramatic chain bursts.",
  siteUrl: "https://TheCodeChaos.github.io/reaktor/",
  repoUrl: "https://github.com/TheCodeChaos/reaktor",
  issuesUrl: "https://github.com/TheCodeChaos/reaktor/issues",
  releasesUrl: "https://github.com/TheCodeChaos/reaktor/releases",
  appUrl: "https://TheCodeChaos.github.io/reaktor/app/",
  searchHint: "Ctrl+K",
} as const;

export const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/developers", label: "Developers" },
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
    title: "Play around one screen",
    description: "Start a game instantly and pass the device around.",
  },
  {
    title: "Built for dramatic reversals",
    description: "One well-timed burst can erase a lead.",
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
    size: "6 x 5",
    summary: "Tight, fast rounds.",
  },
  {
    name: "Classic",
    size: "9 x 6",
    summary: "Balanced pacing, the default preset.",
  },
  {
    name: "Warzone",
    size: "12 x 8",
    summary: "Long matches with late-game collapses.",
  },
] as const;

export const supportChecklist = [
  "Note the board size and player count that reproduced the issue.",
  "Share whether the problem happened during an explosion replay, a live turn, or match start.",
  "Include screenshots or a short screen recording when the bug is visual.",
] as const;

export const faqItems = [
  {
    question: "How does a chain reaction start?",
    body: [
      "Corners burst at 2 atoms, edges at 3, and center cells at 4; when a cell bursts, atoms spread to adjacent cells and can trigger immediate cascades.",
    ],
  },
  {
    question: "How many players can join a match?",
    body: ["Reaktor supports 2 to 6 players."],
  },
  {
    question: "What board sizes are available?",
    body: ["The current presets are 6 x 5, 9 x 6, and 12 x 8."],
  },
  {
    question: "Can I replay the last blast sequence?",
    body: [
      "Yes, the replay control can step through the most recent explosion chain.",
    ],
  },
  {
    question: "When is a player eliminated?",
    body: [
      "A player is eliminated once their atoms are fully cleared from the board after turns are in progress.",
    ],
  },
  {
    question: "Do captured cells switch owner during explosions?",
    body: [
      "Yes, captured atoms immediately flip to the active player while the chain is resolving.",
    ],
  },
  {
    question: "Which preset is best for beginners?",
    body: [
      "6 x 5 is the easiest starting point because turns resolve quickly and pressure is easier to read.",
    ],
  },
  {
    question: "Can I undo a move?",
    body: [
      "Yes, an undo button is available during any live match and steps back the last placed atom.",
    ],
  },
  {
    question: "Are games saved automatically?",
    body: [
      "Yes, active sessions are saved after every turn. The home screen lists all in-progress games so you can resume or delete them at any time.",
    ],
  },
  {
    question: "Where should I report bugs?",
    body: [
      "Use the GitHub Issues link from the Support page and include board size, player count, and reproduction steps.",
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
  };
}

export const developers: readonly Developer[] = [
  {
    id: "ayaan",
    name: "Ayaan Shaikh",
    initials: "AS",
    avatar: "https://github.com/Ayaan-7091.png",
    links: {
      github: "https://github.com/Ayaan-7091",
    },
  },
  {
    id: "shravan",
    name: "Shravan Goswami",
    initials: "SG",
    avatar: "https://github.com/shravanngoswamii.png",
    links: {
      github: "https://github.com/shravanngoswamii",
      website: "https://shravangoswami.com/",
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
];

export const authors = {
  ayaan: developers[0],
  shravan: developers[1],
  jitendra: developers[2],
} as const;

export const credits = [
  {
    title: "App Stack",
    items: [
      "Flutter for cross-platform delivery",
      "Riverpod for state management",
      "SharedPreferences for persistent sessions and leaderboard",
      "Google Fonts for in-app typography",
    ],
  },
  {
    title: "Website Stack",
    items: [
      "Astro for the static site architecture",
      "Pagefind for client-side static search",
      "Lucide icons for the interface system",
      "Markdown content collections for the blog",
    ],
  },
  {
    title: "Design Notes",
    items: [
      "The ink-on-ivory palette and pinwheel mark mirror the in-app design, with the four player colors as the only accents.",
      "Support and documentation flow are intentionally tuned for quick scans and practical troubleshooting.",
    ],
  },
] as const;
