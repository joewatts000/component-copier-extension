import { controlChars } from './constants';

export const trim = (s: string) => s.trim();
export const replaceImportant = (s: string) => s.replace(/!important/g, '');
export const replaceEmpty = (s: string) => s !== '';
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeWhiteSpace(str: string) {
  return str.replace(/\s/g, '');
}
export function kebabCase(str: string) {
  return str.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
}

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
