export const profile = {
  name: "Ayesha Mahjabin Nishat",
  short: "Ayesha",
  role: "Software Developer",
  status: "Software Development Intern @ Final POS",
  location: "St. John's, Newfoundland & Labrador",
  email: "amnishat@mun.ca",
  school: "Memorial University of Newfoundland",
  degree: "B.Sc. Computer Science",
  years: "2022 — 2026",
};

export const links = {
  github: "https://github.com/AyeshaMahjabin",
  linkedin: "https://www.linkedin.com/in/ayesha-m-n",
  resume: "/assets/resume.pdf",
  email: `mailto:${profile.email}`,
};

export const heroWords = [
  "building features end to end, UI to database",
  "writing React and TypeScript in production",
  "querying and shaping data in MongoDB",
  "writing end-to-end tests in Playwright",
  "debugging test failures in CI",
];

/* ------------------------------------------------------------------ */

export const projects = [
  {
    id: "scraper",
    index: "01",
    title: "AI Web Scraper",
    subtitle: "Scrape a page, ask questions about it, get answers from a model running on your own machine.",
    period: "May — June 2025",
    role: "Solo build",
    kind: "Tool",
    accent: "mint",
    image: null,
    stack: ["Python", "BeautifulSoup", "Ollama", "Local LLMs", "Prompt design"],
    summary:
      "A Python tool that pulls the readable content out of any URL and answers questions about it using a local language model.",
    story: [
      {
        h: "What it does",
        p: "Paste a URL. It scrapes the page, strips it down to readable text, and answers questions about that text in plain English. The model runs on-device through Ollama, so the page contents never leave the machine.",
      },
      {
        h: "How it works",
        p: "BeautifulSoup handles scraping and parsing. The cleaned text is split into chunks, the chunks relevant to the question are selected, and those go into the prompt with an instruction to answer from the page only.",
      },
      {
        h: "Hard part",
        p: "Fixed selectors broke on the second site I tried, so the parser falls through several strategies instead of assuming a structure. The other constraint was context size — a long page does not fit, so chunking and selection had to happen before the model ever saw it.",
      },
      {
        h: "Skills used",
        p: "Python, HTML parsing, chunking and prompt design, running local models with Ollama.",
      },
    ],
  },
  {
    id: "kivi",
    index: "02",
    title: "KIVI",
    subtitle: "A turn-based multiplayer board game in Java. Team project, one term.",
    period: "January — April 2025",
    role: "Setup UI + shared game logic · team project",
    kind: "Game",
    accent: "apricot",
    image: "/assets/kivigame.png",
    stack: ["Java", "Swing", "OOP", "Game logic", "Git"],
    summary:
      "A Java Swing board game built by a student team. I owned the game setup UI and worked on the shared multiplayer rules.",
    story: [
      {
        h: "What it does",
        p: "Multiplayer, turn-based play with move validation and scoring. A setup screen configures the players and options, then hands a valid game to the engine.",
      },
      {
        h: "What I built",
        p: "The full setup UI in Java Swing — layout, input handling, and the checks that stop a game from starting in an invalid state. I also worked with the team on the core rules: turn flow, move validation and score updates.",
      },
      {
        h: "Hard part",
        p: "Keeping the rules in one place. The setup screen has to know what is valid in order to enable or disable a control, and the easy version of that is a second copy of the rules living in the UI.",
      },
      {
        h: "Skills used",
        p: "Java, Swing, OOP design, Git in a shared repo, reading and extending code other people wrote.",
      },
    ],
  },
  {
    id: "portfolio",
    index: "03",
    title: "This Website",
    subtitle: "React, three.js and WebGL — the site you are on right now.",
    period: "June 2025 — rebuilt 2026",
    role: "Design + build",
    kind: "Playground",
    accent: "iris",
    image: "/assets/coding-pov.png",
    stack: ["React", "Vite", "Tailwind CSS", "Motion", "three.js / R3F", "WebGL"],
    summary:
      "A portfolio built in React and Vite, with a three.js hero scene, a WebGL fluid cursor and a command palette.",
    story: [
      {
        h: "What it does",
        p: "A single-page site with a 3D robot that tracks the cursor, a WebGL fluid simulation behind the page, and ⌘K to jump anywhere or open a case study.",
      },
      {
        h: "How it works",
        p: "React, Vite and Tailwind, animated with Motion. The 3D scene runs on three.js through React Three Fiber. Section accents are CSS variables the fluid shader reads at runtime, so the effects always match the current palette.",
      },
      {
        h: "Hard part",
        p: "Keeping it fast. three.js is code-split and only loads when the scene is near the viewport, the renderer caps its pixel ratio on weaker devices, each canvas sits inside an error boundary, and the heavy effects are off entirely for touch and reduced-motion.",
      },
      {
        h: "Skills used",
        p: "React, three.js / R3F, WebGL shaders, Motion, code splitting, accessibility fallbacks.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

export const experience = {
  company: "Final POS",
  role: "Software Development Intern",
  location: "St. John's, Newfoundland & Labrador",
  period: "2026",
  intro:
    "My first role on a production codebase, and where I learned to work as a full-stack developer. React and TypeScript on the interface, server logic and MongoDB behind it, Playwright for end-to-end tests, and Jira and Git for how the work moves through the team.",
  facets: [
    {
      id: "fullstack",
      label: "End to end",
      title: "End to end",
      lines: [
        "Working across several interconnected repositories.",
        "Reading the existing code path before writing anything — where the data comes from, and what already depends on it.",
        "Carrying a Jira ticket from picking it up, through review, to a merged branch.",
      ],
      note: "This is the skill I built most as an intern: I can follow a change through the repos and layers it touches, instead of stopping at the edge of the one I know best.",
    },
    {
      id: "backend",
      label: "Backend & data",
      title: "Backend & database",
      lines: [
        "Server-side logic and API endpoints alongside the UI work.",
        "Reading and writing data in MongoDB — queries, document shape, and how collections are used.",
        "Checking what the database actually holds before trusting what the UI shows.",
      ],
      note: "Coming in I had only used SQL from coursework, so MongoDB and document-shaped data were new. Picking that up was most of the learning curve.",
    },
    {
      id: "frontend",
      label: "Frontend",
      title: "Frontend work",
      lines: [
        "UI features and fixes inside an existing React and TypeScript codebase.",
        "Wiring components to real endpoints and real data, not mocks.",
        "Following the patterns already in the project instead of my own.",
      ],
      note: "The codebase was large enough that finding the right file was often longer work than the change itself.",
    },
    {
      id: "testing",
      label: "Testing & CI",
      title: "Testing, debugging & CI",
      lines: [
        "End-to-end tests written and maintained in Playwright, covering full flows: interface, request, and the data that comes back.",
        "Investigating failed runs in the CI pipeline — reading logs and traces to find where a change broke.",
        "Telling a broken feature apart from a broken test, and fixing the flaky ones so a green run means something.",
      ],
      note: "Playwright specs, selectors, waits and test data setup — plus a lot of CI-only failures: green on my machine, red on the pipeline, usually down to timing or test data.",
    },
    {
      id: "team",
      label: "Team",
      title: "Working in a team",
      lines: [
        "Day-to-day work inside an existing engineering process.",
        "Code review, Jira tickets and branch workflow in Git.",
        "Asking questions with the error, the branch and what I tried attached.",
      ],
      note: "Most of what I gained here was collaboration and communication: explaining a change clearly, asking for context early, and working a problem through with someone instead of alone.",
    },
  ],
};

/* ------------------------------------------------------------------ */

export const skills = [
  {
    label: "Languages",
    hint: "Strongest: JavaScript / TypeScript, Python",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C", "SQL", "HTML / CSS"],
  },
  {
    label: "Frontend",
    hint: "Used daily at work",
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "three.js / R3F", "Vite", "Responsive UI"],
  },
  {
    label: "Backend & Data",
    hint: "Used daily at work",
    items: ["MongoDB", "REST APIs", "Python", "Java", "SQL", "BeautifulSoup", "Ollama / local LLMs"],
  },
  {
    label: "Testing & Automation",
    hint: "Used at work",
    items: ["Playwright", "Automated tests", "Debugging test failures", "CI (exposure)"],
  },
  {
    label: "Tools & Engineering",
    hint: "Day to day",
    items: ["Git & GitHub", "Jira", "npm", "VS Code", "DevTools", "Java Swing"],
  },
];

export const coursework = [
  "Data Structures & Algorithms",
  "Computer Architecture",
  "Operating Systems",
  "Software Engineering",
  "Computer Networks",
  "Algorithms for AI",
];

/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    "I'm a Computer Science student at Memorial University in St. John's, currently a software development intern at Final POS.",
    "I work across the stack: React and TypeScript on the interface, server logic and MongoDB behind it, Playwright and CI over the whole thing. Frontend is the part I enjoy most, but I would rather own a feature end to end than stop at the edge of one layer.",
    "Outside coursework I build small things end to end: a scraper that runs a local LLM, a multiplayer game in Java, this site. Looking for software roles in 2027 where I can keep working across the stack.",
  ],
  facts: [
    { k: "Based in", v: "St. John's, NL" },
    { k: "Studying", v: "B.Sc. Computer Science, MUN" },
    { k: "Currently", v: "Software Development Intern, Final POS" },
    { k: "Working with", v: "React, three.js, Python, Playwright" },
  ],
};
