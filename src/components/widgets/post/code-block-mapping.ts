// Maps common markdown/prism code block names → Monaco Editor language IDs
const languageMap: Record<string, string> = {
  // Web / Scripting
  js: "javascript",
  javascript: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  typescript: "typescript",
  html: "html",
  xml: "xml",
  css: "css",
  scss: "scss",
  less: "less",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  markdown: "markdown",
  md: "markdown",

  // Backend / General purpose
  py: "python",
  python: "python",
  java: "java",
  c: "c",
  "c++": "cpp",
  cpp: "cpp",
  h: "cpp",
  hpp: "cpp",
  cs: "csharp",
  csharp: "csharp",
  go: "go",
  golang: "go",
  rs: "rust",
  rust: "rust",
  php: "php",
  ruby: "ruby",
  rb: "ruby",
  swift: "swift",
  kt: "kotlin",
  kotlin: "kotlin",
  dart: "dart",
  scala: "scala",
  perl: "perl",
  r: "r",

  // Shell / CLI
  sh: "shell",
  shell: "shell",
  bash: "shell",
  zsh: "shell",
  powershell: "powershell",
  ps: "powershell",
  ps1: "powershell",
  bat: "bat",
  cmd: "bat",

  // Data / Config
  sql: "sql",
  graphql: "graphql",
  gql: "graphql",
  docker: "dockerfile",
  dockerfile: "dockerfile",
  ini: "ini",
  toml: "toml",

  // Functional / Academic
  hs: "haskell",
  haskell: "haskell",
  elm: "elm",
  clj: "clojure",
  clojure: "clojure",
  ocaml: "ocaml",
  ml: "ocaml",
  fsharp: "fsharp",
  fs: "fsharp",
  fsx: "fsharp",

  // Assembly-ish / Low-level
  asm: "asm",
  wasm: "wasm",

  // Catch-all
  txt: "plaintext",
  text: "plaintext",
  plaintext: "plaintext",
};

export default languageMap;