import { controlChars } from './constants';

export const trim = (s: string) => s.trim();

export const replaceImportant = (s: string) => s.replace(/!important/g, '');

export const replaceEmpty = (s: string) => s !== '';

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const removeWhiteSpace = (str: string) => str.replace(/\s/g, '');

export const kebabCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);

export const kebabToCamel = (str: string) =>
  str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

export const removeWeirdSpaces = (str: string) => {
  if (typeof str !== 'string') {
    return str;
  }
  try {
    const controlCharRegex = new RegExp(
      `[${controlChars.join('')}\u2000-\u200B]`,
      'g'
    );
    return str.replace(controlCharRegex, '');
  } catch (error) {
    console.error('Error processing string:', error);
    return str;
  }
};

export const removeExtraParentheses = (input: string) => {
  let openBrackets = 0; // Track the number of unmatched opening brackets

  // Build the output string by iterating over each character
  const result = [...input].filter((char) => {
    if (char === '(') {
      openBrackets++; // Increment when encountering an opening bracket
      return true; // Keep the character
    } else if (char === ')') {
      if (openBrackets > 0) {
        openBrackets--; // Match an opening bracket with this closing one
        return true; // Keep the character
      }
      return false; // Remove unmatched closing bracket
    }
    return true; // Keep all other characters
  });

  return result.join('');
};
