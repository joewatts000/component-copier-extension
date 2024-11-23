import { controlChars, specialChars } from './constants';

function kebabCase(str: string) {
  return str.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
}

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

const removeWeirdSpaces = (str: string) => {
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

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeWhiteSpace(str: string) {
  return str.replace(/\s/g, '');
}

function generateComponentName(element: HTMLElement) {
  const tagName = element.tagName.toLowerCase();
  return `${capitalize(tagName)}`;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function holyTrinity(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
}

export type CSSRuleType = {
  selector: string;
  cssText: string;
};

function getAllCSSRules() {
  const rules: CSSRuleType[] = [];
  for (const stylesheet of document.styleSheets) {
    try {
      for (const rule of stylesheet.cssRules) {
        if (rule.type === CSSRule.STYLE_RULE) {
          rules.push({
            // @ts-ignore
            selector: rule.selectorText,
            cssText: rule.cssText,
          });
        }
      }
    } catch {
      console.log('Stylesheet access error');
    }
  }
  return rules;
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

  return cssRules ? `${cleanedSelector} { ${cssRules} }` : '';
}

function templateComponent(components) {
  return `/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${components}
  `;
}

export {
  cssObjectsToString,
  removeWhiteSpace,
  replaceSpecialCharsWithHTMLEntities,
  splitCssRules,
  capitalize,
  kebabCase,
  generateComponentName,
  copyToClipboard,
  holyTrinity,
  getAllCSSRules,
  isZeroWidthValue,
  transformPsuedoSelectors,
  cleanBorderProperties,
  templateComponent,
};
