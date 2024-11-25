import { specialChars } from './constants';
import { cssPropertiesToPixels } from './css';
import { niceNameForTag } from './html';
import { capitalize, kebabCase, removeWeirdSpaces } from './strings';

function cssObjectsToString(obj1: object, obj2?: object) {
  return (
    Object.entries({ ...obj1, ...obj2 })
      .map(([key, value]) => {
        return `  ${kebabCase(key)}: ${value};`;
      })
      // join with new line and tab indent
      .join('\n\t')
      .replace(';;', ';')
  );
}

function replaceSpecialCharsWithHTMLEntities(str: string) {
  return removeWeirdSpaces(
    str.replace(
      new RegExp(`[${Object.keys(specialChars).join('')}]`, 'g'),
      (char) => specialChars[char]
    )
  );
}

function splitCssRules(rule: { cssText: string }) {
  return rule.cssText.split('{')[1].split('}')[0];
}

function generateComponentName(element: HTMLElement) {
  return niceNameForTag(element.tagName);
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function holyTrinity(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
}

function isZeroWidth(value: string) {
  return value === '0px' || value === '0';
}

function isZeroWidthValue(value: string) {
  if (isZeroWidth(value)) {
    return true;
  }
  const borderWidth = value.split(' ')[0];
  if (isZeroWidth(borderWidth)) {
    return true;
  }
}

function cleanBorderProperties(styleObject: object) {
  const cleanedObject = { ...styleObject };
  if (
    cleanedObject['border-width'] === '0' ||
    cleanedObject['border-width'] === 0 ||
    cleanedObject['border-width'] === '0px'
  ) {
    Object.keys(cleanedObject)
      .filter((key) => key.startsWith('border-'))
      .forEach((key) => delete cleanedObject[key]);
  }

  return cleanedObject;
}

function transformPsuedoSelectors(selectorObj: {
  cssText: string;
  selector: string;
}) {
  const cleanedSelector = selectorObj.selector
    .split(',')
    .map((sel) => sel.replace(/^.*?(:hover|:focus)/, '$1'))
    .join(',');

  const match = selectorObj.cssText.match(/\{(.+)\}/);
  const cssRules = match ? match[1].trim() : '';

  // cssRules to array or strings, e.g.: text-decoration: none; background-color: var(--bgColor-muted, var(--color-canvas-subtle)); => [['text-decoration', 'none'], ['background-color', 'var(--bgColor-muted, var(--color-canvas-subtle))']]
  const cssRulesArray = cssRules
    .split(';')
    .map((rule) => rule.trim())
    .map((rule) => rule.split(':'))
    .map((rule) => rule.map((str) => str.trim()))
    .filter((rule) => rule[0] !== '') as [string, string][];

  // resolve css variables
  const resolvedCssRulesArray = cssPropertiesToPixels(cssRulesArray)
    .map((rule) => rule.join(': '))
    .join(';\n');

  return cssRules ? `${cleanedSelector} { ${resolvedCssRulesArray}; }` : '';
}

function templateComponent(components: string) {
  return `/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${components}
  `;
}

function dedent(
  strings: TemplateStringsArray,
  ...values: readonly string[]
): string {
  const raw = String.raw({ raw: strings }, ...values);
  const lines = raw.split('\n');
  const firstNonEmptyLine = lines.find((line) => line.trim() !== '');

  if (!firstNonEmptyLine) {
    return raw;
  }

  const indentLength = firstNonEmptyLine.match(/^\s*/)?.[0].length ?? 0;
  return lines.map((line) => line.slice(indentLength)).join('\n');
}

export {
  cssObjectsToString,
  replaceSpecialCharsWithHTMLEntities,
  splitCssRules,
  capitalize,
  kebabCase,
  generateComponentName,
  copyToClipboard,
  holyTrinity,
  isZeroWidthValue,
  transformPsuedoSelectors,
  cleanBorderProperties,
  templateComponent,
  dedent,
};
