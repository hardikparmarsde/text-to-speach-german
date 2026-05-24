// Common German words for detection
const GERMAN_WORDS = new Set([
  'der', 'die', 'das', 'und', 'ist', 'nicht', 'danke', 'hallo',
  'guten', 'morgen', 'ein', 'eine', 'einer', 'eines', 'einem', 'einen',
  'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr',
  'haben', 'sein', 'werden', 'kann', 'muss', 'soll', 'will', 'darf',
  'aber', 'oder', 'wenn', 'weil', 'dass', 'als', 'auch', 'noch',
  'schon', 'nur', 'sehr', 'mit', 'von', 'für', 'auf', 'aus',
  'bei', 'nach', 'über', 'unter', 'vor', 'zwischen',
  'ja', 'nein', 'bitte', 'entschuldigung', 'tschüss',
  'gut', 'schlecht', 'groß', 'klein', 'neu', 'alt',
  'heute', 'gestern', 'immer', 'wieder', 'hier', 'dort',
  'was', 'wer', 'wie', 'wo', 'warum', 'wann',
  'diese', 'dieser', 'dieses', 'jeder', 'jede', 'jedes',
  'kein', 'keine', 'keiner', 'keines',
  'mehr', 'viel', 'viele', 'wenig', 'wenige',
  'müssen', 'können', 'sollen', 'wollen', 'dürfen',
  'machen', 'gehen', 'kommen', 'sehen', 'geben', 'nehmen',
  'finden', 'denken', 'sagen', 'wissen', 'lassen',
  'stehen', 'heißen', 'leben', 'fahren', 'bringen',
  'freund', 'frau', 'herr', 'kinder', 'haus', 'stadt',
  'möchtest', 'möchte', 'möchten', 'deine', 'meine', 'seine', 'ihre',
  'trinken', 'essen', 'spielen', 'hören', 'sprechen',
  'rechts', 'links', 'neben', 'gibt', 'bringen',
  'willkommen', 'wohnung', 'zimmer', 'küche', 'tür',
  'perfekt', 'super', 'danke', 'bitte', 'natürlich',
  'passwort', 'tisch', 'musik', 'gemütlich',
  'vorbereitet', 'benutzen', 'jacken', 'schuhe',
  'badezimmer', 'ordentlich', 'einladung', 'problem',
]);

// German-specific characters
const GERMAN_CHARS_REGEX = /[äöüßÄÖÜ]/;

/**
 * Determine if a single cell/text contains German.
 * Returns true if:
 *  - Contains German-specific characters (ä, ö, ü, ß), OR
 *  - Contains at least 2 common German words
 * @param {string} text
 * @returns {boolean}
 */
export function isGerman(text) {
  if (!text || typeof text !== 'string' || text.trim().length < 3) return false;

  if (GERMAN_CHARS_REGEX.test(text)) {
    return true;
  }

  const words = text
    .toLowerCase()
    .replace(/[^a-zäöüß\s]/g, '')
    .split(/\s+/);

  let germanWordCount = 0;
  for (const word of words) {
    if (GERMAN_WORDS.has(word)) {
      germanWordCount++;
      if (germanWordCount >= 2) return true;
    }
  }

  return false;
}
