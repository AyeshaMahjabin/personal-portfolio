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
  "interfaces that explain themselves",
  "backends I actually understand",
  "tests that catch things early",
  "small tools for weird problems",
  "3D things that live in a browser",
];

/* ------------------------------------------------------------------ */

export const projects = [
  {
    id: "scraper",
    index: "01",
    title: "AI Web Scraper",
    subtitle: "Ask a webpage a question — without the page leaving your machine.",
    period: "May — June 2025",
    role: "Solo build",
    kind: "Tool",
    accent: "mint",
    image: null,
    stack: ["Python", "BeautifulSoup", "Ollama", "Local LLMs", "Prompt design"],
    summary:
      "A web assistant that pulls structured content out of any page and answers questions about it using a language model running on-device.",
    story: [
      {
        h: "The idea",
        p: "I kept opening long pages just to find one fact. I wanted to point a tool at a URL and ask it something in plain English — and I didn't want the contents of that page to travel to a cloud API for it to happen.",
      },
      {
        h: "What I built",
        p: "A scraping and parsing pipeline with BeautifulSoup that extracts the readable content of a page, and a query layer on top of it: paste a URL, the tool scrapes it, then you ask questions in natural language. Answers come from a model running locally through Ollama, so there is no cloud dependency in the loop.",
      },
      {
        h: "What was technically interesting",
        p: "Real pages are inconsistent. Hardcoding selectors works on exactly one website, so the parsing had to degrade gracefully across wildly different page structures. The other half of the problem was prompt design — deciding what actually deserves to go into a limited context window, and phrasing the instruction so the model answers from the page instead of from memory.",
      },
      {
        h: "What I learned",
        p: "Prompt engineering is closer to interface design than to configuration: you are deciding what the model sees and what it is allowed to assume. And running a model locally changes the shape of the problem — latency and context size stop being someone else's concern and become yours.",
      },
    ],
  },
  {
    id: "kivi",
    index: "02",
    title: "KIVI",
    subtitle: "A Java multiplayer board game, built the way software engineering courses hope you build.",
    period: "January — April 2025",
    role: "Setup UI + shared game logic · team project",
    kind: "Game",
    accent: "apricot",
    image: "/assets/kivigame.png",
    stack: ["Java", "Swing", "OOP", "Game logic", "Git"],
    summary:
      "A turn-based multiplayer board game in Java. I owned the game setup UI and worked on the core multiplayer rules with the team.",
    story: [
      {
        h: "The idea",
        p: "A term-long software engineering project: build a real multiplayer board game as a team, with everything that implies — shared code, shared decisions, and a deadline that does not move.",
      },
      {
        h: "What I built",
        p: "I designed and implemented the full game setup UI in Java Swing — layout logic, user input handling, and the rule-based restrictions that stop a game from starting in an invalid state. I also worked with the team on the core multiplayer logic: turn-based flow, move validation and score updates.",
      },
      {
        h: "What was technically interesting",
        p: "The setup screen is where the rules become visible. Every constraint in the game has to be expressed as something you can or cannot click, which means the interface has to know the rules — without quietly growing a second copy of them. Keeping that honest was the interesting part.",
      },
      {
        h: "What I learned",
        p: "Object-oriented structure stops being an abstract lecture topic the moment several people are editing the same codebase. We leaned on it to stay modular so features could be added without unravelling what already worked. I also learned how much of team programming is reading other people's code carefully.",
      },
    ],
  },
  {
    id: "portfolio",
    index: "03",
    title: "This Website",
    subtitle: "A portfolio built like a toy: things you can poke, throw and turn over.",
    period: "June 2025 — rebuilt 2026",
    role: "Design + build",
    kind: "Playground",
    accent: "iris",
    image: "/assets/coding-pov.png",
    stack: ["React", "Vite", "Tailwind CSS", "Motion", "three.js / R3F", "WebGL"],
    summary:
      "The site you are currently scrolling through: a 3D character, a WebGL fluid cursor and a page full of objects that respond to being touched.",
    story: [
      {
        h: "The idea",
        p: "Most portfolios are a stack of résumé sections with a nicer font. I wanted mine to feel like an object instead — something with weight, where cards press down when you click them, stickers peel off the page, and a robot looks up when you move your cursor.",
      },
      {
        h: "What I built",
        p: "React, Vite and Tailwind, animated with Motion. A three.js scene puts a 3D robot on the page with no frame around it, a WebGL fluid simulation paints the cursor's trail in the site's own palette, and every section owns a colour that the background drifts toward as you reach it.",
      },
      {
        h: "What was technically interesting",
        p: "Making a page feel physical is mostly restraint: one spring curve reused everywhere, so a card, a sticker and a button all behave like they are made of the same material. The performance side matters too — three.js is code-split so it only downloads when the robot is near the viewport, the 3D scene caps its resolution on weaker devices, every canvas sits inside an error boundary, and the heavy effects switch off entirely for reduced-motion and touch.",
      },
      {
        h: "What I learned",
        p: "Playful and usable are the same problem. Every idea here had to survive one question — does this still work for someone who only wants my résumé? — and the ones that did are the ones that stayed.",
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
    "My first time inside a real engineering team and a real production codebase — where the code already exists, the patterns are already chosen, and the job is to understand them before you change them.",
  facets: [
    {
      id: "frontend",
      label: "Frontend",
      title: "Working inside code I didn't write",
      lines: [
        "Software development tasks including UI work, contributing within an existing production codebase.",
        "Reading unfamiliar code to trace how a feature is actually wired together before changing it.",
        "Matching the patterns and conventions already in the project instead of importing my own.",
      ],
      note: "Building a screen from scratch and changing a screen that a lot of other code already depends on are different skills. This was the second one.",
    },
    {
      id: "stack",
      label: "Across the stack",
      title: "Seeing more than the surface",
      lines: [
        "Exposure to backend work and to more of the development process than the interface layer.",
        "Following a change through the parts of the system it touches, rather than stopping at the UI.",
        "Getting a feel for how the pieces of a product connect end to end.",
      ],
      note: "I came in interested in frontend. I am leaving more interested in the whole system.",
    },
    {
      id: "testing",
      label: "Testing & automation",
      title: "Turning expectations into checks",
      lines: [
        "Worked with Playwright and automated testing.",
        "Translating 'this should happen' into a check that runs without anyone watching it.",
        "Learning what makes a test trustworthy rather than merely green.",
      ],
      note: "Writing the test forces you to say precisely what correct means. That turns out to be a hard sentence to finish.",
    },
    {
      id: "debug",
      label: "Debugging & CI",
      title: "Following the evidence",
      lines: [
        "Debugging issues and investigating automated test failures.",
        "Understanding how automated tests fit into CI, and what a failure there is actually telling you.",
        "Separating a broken feature from a broken test — they look identical at first.",
      ],
      note: "A failing test is information, not an obstacle. Most of the skill is refusing to guess.",
    },
    {
      id: "team",
      label: "Collaboration",
      title: "Engineering is a team sport",
      lines: [
        "Working within a real engineering team and its process.",
        "Communication, collaboration and technical problem solving with people who know the system better than I do.",
        "Asking better questions — specific ones, with what I already tried attached.",
      ],
      note: "Working with existing systems is mostly working with the people who built them.",
    },
  ],
};

/* ------------------------------------------------------------------ */

export const principles = [
  {
    n: "01",
    front: "Understand the problem before touching the keyboard.",
    back: "My worst code has always been an excellent solution to a problem I imagined instead of the one in front of me.",
  },
  {
    n: "02",
    front: "Debug, don't guess.",
    back: "A guess that happens to work is still a mystery. Read the error, follow the trace, find out which line is lying.",
  },
  {
    n: "03",
    front: "Existing code has reasons.",
    back: "Before rewriting something strange, find out why it is like that. There is usually a story, and sometimes the story is still true.",
  },
  {
    n: "04",
    front: "A failing test is a message.",
    back: "Half the work is deciding whether the feature broke or the test did. From the outside they look exactly the same.",
  },
  {
    n: "05",
    front: "The person using it is part of the system.",
    back: "How something feels to use is a real requirement. Slow, confusing and technically correct is a bug report waiting to be filed.",
  },
  {
    n: "06",
    front: "Write it so future-me can maintain it.",
    back: "Future-me has forgotten everything and is in a hurry. Be kind to her: clear names, small pieces, obvious seams.",
  },
  {
    n: "07",
    front: "Stay curious about how it works.",
    back: "The fastest way I learn anything is taking it apart to see what it does underneath. That instinct is most of why I am here.",
  },
];

/* ------------------------------------------------------------------ */

export const skills = [
  {
    label: "Languages",
    hint: "What I think in",
    items: ["JavaScript", "Python", "Java", "C", "SQL", "HTML / CSS"],
  },
  {
    label: "Frontend",
    hint: "Where I spend the most time",
    items: ["React", "Tailwind CSS", "Framer Motion", "three.js / R3F", "Vite", "Responsive UI", "UI/UX"],
  },
  {
    label: "Backend & Data",
    hint: "The half I'm growing",
    items: ["Python", "Java", "SQL", "BeautifulSoup", "Ollama / local LLMs"],
  },
  {
    label: "Testing & Automation",
    hint: "Proving it works",
    items: ["Playwright", "Automated tests", "Debugging test failures", "CI (exposure)"],
  },
  {
    label: "Tools & Engineering",
    hint: "Daily drivers",
    items: ["Git & GitHub", "npm", "VS Code", "DevTools", "Java Swing"],
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

export const sideQuests = [
  {
    id: "fluid",
    title: "Fluid cursor",
    blurb:
      "A fluid simulation running underneath the whole page. Your cursor pushes dye through a velocity field, and it borrows the colours from whatever section you're in.",
    tag: "WebGL",
    action: "toggle",
  },
  {
    id: "palette",
    title: "The colour machine",
    blurb:
      "Every section of this page owns a colour, and the paper behind everything drifts to match it as you scroll. Try the swatches.",
    tag: "Design system",
    action: "palette",
  },
  {
    id: "globe",
    title: "Where I am",
    blurb:
      "A globe rendered to a canvas, marking St. John's — the easternmost city in North America, and half an hour out of sync with everyone.",
    tag: "Canvas",
    action: "globe",
  },
  {
    id: "next",
    title: "Whatever's next",
    blurb:
      "Reserved space: creative coding, small tools, 3D printing, half-formed ideas that turn out to be worth finishing.",
    tag: "In progress",
    action: "none",
  },
];

/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    "I'm a Computer Science student at Memorial University in St. John's, and a software developer who genuinely cannot leave an interface alone. I got here the way a lot of people do — by taking something apart to find out why it worked, and then needing to build one.",
    "What I like about this job sits in two places at once: how the software works, and how it feels to use. I will happily spend an afternoon on program logic and the next one on an easing curve, and I don't think of those as different kinds of work.",
    "Right now I'm building breadth — frontend, backend, testing, and the parts of a codebase you only meet when something breaks — and looking for teams where I get to keep doing that alongside people who are better at it than I am.",
  ],
  facts: [
    { k: "Based in", v: "St. John's, NL" },
    { k: "Studying", v: "B.Sc. Computer Science, MUN" },
    { k: "Currently", v: "Software Development Intern, Final POS" },
    { k: "Into", v: "Frontend craft, systems, local LLMs, 3D on the web" },
  ],
};
