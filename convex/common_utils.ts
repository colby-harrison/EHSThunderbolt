let cachedBadWords: string[] | null = null;

async function loadBadWords(): Promise<string[]> {
  if (cachedBadWords) return cachedBadWords;

  // Why is this a file on the internet...
  const url =
    "https://raw.githubusercontent.com/viddexa/safetext/refs/heads/main/safetext/languages/en/words.txt";

  const response = await fetch(url);
  const raw = await response.text();

  cachedBadWords = raw
    .split("\n")
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean);

  return cachedBadWords;
}

export async function containsBadWord(text: string): Promise<boolean> {
  const badWords = await loadBadWords();

  const lowerText = text.toLowerCase();

  const pattern = new RegExp(`\\b(${badWords.join("|")})\\b`, "i");

  return pattern.test(lowerText);
}