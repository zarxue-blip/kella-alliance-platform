import { config } from "../config.js";

type TranslationResult = {
  translatedText: string;
  detectedSource?: string;
  provider: string;
};

const flagLanguageMap: Record<string, { code: string; label: string }> = {
  AE: { code: "ar", label: "Arabic" },
  AR: { code: "es", label: "Spanish" },
  AU: { code: "en", label: "English" },
  BD: { code: "bn", label: "Bengali" },
  BR: { code: "pt", label: "Portuguese" },
  CA: { code: "en", label: "English" },
  CL: { code: "es", label: "Spanish" },
  CN: { code: "zh-CN", label: "Chinese" },
  CO: { code: "es", label: "Spanish" },
  DE: { code: "de", label: "German" },
  DK: { code: "da", label: "Danish" },
  EG: { code: "ar", label: "Arabic" },
  ES: { code: "es", label: "Spanish" },
  FI: { code: "fi", label: "Finnish" },
  FR: { code: "fr", label: "French" },
  GB: { code: "en", label: "English" },
  GU: { code: "en", label: "English" },
  GR: { code: "el", label: "Greek" },
  HK: { code: "zh-TW", label: "Chinese" },
  ID: { code: "id", label: "Indonesian" },
  IN: { code: "hi", label: "Hindi" },
  IR: { code: "fa", label: "Persian" },
  IT: { code: "it", label: "Italian" },
  JP: { code: "ja", label: "Japanese" },
  KR: { code: "ko", label: "Korean" },
  MX: { code: "es", label: "Spanish" },
  MY: { code: "ms", label: "Malay" },
  NL: { code: "nl", label: "Dutch" },
  NO: { code: "no", label: "Norwegian" },
  NZ: { code: "en", label: "English" },
  PE: { code: "es", label: "Spanish" },
  PH: { code: "tl", label: "Tagalog" },
  PK: { code: "ur", label: "Urdu" },
  PL: { code: "pl", label: "Polish" },
  PT: { code: "pt", label: "Portuguese" },
  RU: { code: "ru", label: "Russian" },
  SA: { code: "ar", label: "Arabic" },
  SE: { code: "sv", label: "Swedish" },
  TH: { code: "th", label: "Thai" },
  TR: { code: "tr", label: "Turkish" },
  TW: { code: "zh-TW", label: "Chinese" },
  UA: { code: "uk", label: "Ukrainian" },
  UM: { code: "en", label: "English" },
  US: { code: "en", label: "English" },
  VE: { code: "es", label: "Spanish" },
  VN: { code: "vi", label: "Vietnamese" }
};

const flagAliases: Record<string, string> = {
  en: "US",
  english: "US",
  flag_au: "AU",
  flag_ca: "CA",
  flag_gb: "GB",
  flag_gu: "GU",
  flag_nz: "NZ",
  flag_um: "UM",
  flag_us: "US",
  gb: "GB",
  uk: "GB",
  united_kingdom: "GB",
  united_states: "US",
  united_states_of_america: "US",
  us: "US",
  usa: "US"
};

function countryCodeFromAlias(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/^:+|:+$/g, "")
    .replace(/[\s-]+/g, "_");

  return flagAliases[normalized] ?? null;
}

function flagToCountryCode(flag: string) {
  const alias = countryCodeFromAlias(flag);
  if (alias) return alias;

  const cleanFlag = flag.replace(/\ufe0f/g, "").replace(/\u200d/g, "");
  const codePoints = [...cleanFlag].map((char) => char.codePointAt(0));
  if (codePoints.length !== 2 || codePoints.some((point) => !point || point < 0x1f1e6 || point > 0x1f1ff)) {
    return null;
  }

  return codePoints.map((point) => String.fromCharCode((point as number) - 0x1f1e6 + 65)).join("");
}

function trimToUtf8Bytes(value: string, maxBytes: number) {
  const encoder = new TextEncoder();
  let output = "";

  for (const char of value) {
    const next = `${output}${char}`;
    if (encoder.encode(next).length > maxBytes) break;
    output = next;
  }

  return output;
}

function normalizeMessageText(value: string) {
  return value
    .replace(/<a?:[a-zA-Z0-9_]+:\d+>/g, "")
    .replace(/<@!?(\d+)>/g, "@user")
    .replace(/<@&(\d+)>/g, "@role")
    .replace(/<#(\d+)>/g, "#channel")
    .replace(/\s+/g, " ")
    .trim();
}

function comparableText(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,!?'"`*_~()[\]{}:;|-]/g, "")
    .trim();
}

function isSameTranslation(sourceText: string, translatedText: string) {
  return comparableText(sourceText) === comparableText(translatedText);
}

export function getLanguageFromFlag(flag: string) {
  const countryCode = flagToCountryCode(flag);
  if (!countryCode) return null;
  return flagLanguageMap[countryCode] ?? null;
}

export function supportedTranslationFlags() {
  return Object.keys(flagLanguageMap).sort();
}

async function requestMyMemoryTranslation(text: string, sourceLanguage: string, targetLanguage: string) {
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${sourceLanguage}|${targetLanguage}`);
  url.searchParams.set("mt", "1");
  if (config.TRANSLATION_CONTACT_EMAIL) url.searchParams.set("de", config.TRANSLATION_CONTACT_EMAIL);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Kella Discord Bot"
    }
  });

  if (!response.ok) {
    throw new Error(`Translation service returned ${response.status}`);
  }

  const payload = (await response.json()) as {
    responseStatus?: number;
    responseDetails?: string;
    responseData?: {
      translatedText?: string;
      detectedLanguage?: string;
    };
  };

  if (payload.responseStatus && payload.responseStatus >= 400) {
    throw new Error(payload.responseDetails || "Translation service rejected the request.");
  }

  const translatedText = payload.responseData?.translatedText?.trim();
  if (!translatedText) throw new Error("Translation service returned an empty response.");

  return {
    translatedText,
    detectedSource: payload.responseData?.detectedLanguage,
    provider: "MyMemory"
  } satisfies TranslationResult;
}

async function requestGooglePublicTranslation(text: string, targetLanguage: string) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "auto");
  url.searchParams.set("tl", targetLanguage);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Kella Discord Bot"
    }
  });

  if (!response.ok) {
    throw new Error(`Translation service returned ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
    throw new Error("Translation service returned an unexpected response.");
  }

  const translatedText = payload[0]
    .map((part) => (Array.isArray(part) ? part[0] : ""))
    .filter((part) => typeof part === "string")
    .join("")
    .trim();

  if (!translatedText) throw new Error("Translation service returned an empty response.");

  return {
    translatedText,
    detectedSource: typeof payload[2] === "string" ? payload[2] : undefined,
    provider: "Google Translate"
  } satisfies TranslationResult;
}

async function firstUsefulTranslation(text: string, targetLanguage: string) {
  const attempts = [
    () => requestGooglePublicTranslation(text, targetLanguage),
    () => requestMyMemoryTranslation(text, "en", targetLanguage),
    () => requestMyMemoryTranslation(text, "Autodetect", targetLanguage)
  ];

  let lastError: unknown;

  for (const attempt of attempts) {
    try {
      const result = await attempt();
      if (!isSameTranslation(text, result.translatedText)) return result;
      lastError = new Error("Translation came back unchanged.");
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError instanceof Error) throw lastError;
  throw new Error("No translation service produced a useful result.");
}

export async function translateForFlag(messageText: string, flag: string) {
  const language = getLanguageFromFlag(flag);
  if (!language) return null;

  const normalized = normalizeMessageText(messageText);
  if (!normalized) throw new Error("There is no readable text to translate.");

  const trimmed = trimToUtf8Bytes(normalized, 480);
  const result = await firstUsefulTranslation(trimmed, language.code);

  return {
    ...result,
    language,
    wasTrimmed: trimmed.length < normalized.length
  };
}
