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
