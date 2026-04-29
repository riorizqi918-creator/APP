export function resolveImageSrc(value: string | null | undefined, fallback: string) {
  const raw = value?.trim();

  if (!raw) {
    return fallback;
  }

  if (raw.startsWith("/")) {
    return raw;
  }

  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return raw;
    }
  } catch {
    return fallback;
  }

  return fallback;
}
