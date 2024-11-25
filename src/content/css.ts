import { replaceEmpty, replaceImportant, trim } from './strings';
import {
  cleanBorderProperties,
  splitCssRules,
  transformPsuedoSelectors,
} from './utils';
import { kebabCase } from './strings';
import { resolveCssVariables } from './resolveCssVariables';

const PSEUDO_SELECTORS = [':hover', ':active', ':focus', ':visited'];

export type CSSRuleType = {
  selector: string;
  cssText: string;
};

function isPseudoRule(testSelector: string): boolean {
  return PSEUDO_SELECTORS.some((selector) => testSelector.includes(selector));
}

function separateRules(
  cssRules: CSSRuleType[],
  element: HTMLElement
): {
  relevantCSS: CSSRuleType[];
  pseudoRules: CSSRuleType[];
} {
  const relevantCSS: CSSRuleType[] = [];
  const pseudoRules: CSSRuleType[] = [];

  cssRules.forEach((rule) => {
    const hasMatch = element.matches(rule.selector);
    const isPseudo = isPseudoRule(rule.selector);

    if (hasMatch && isPseudo) {
      pseudoRules.push(rule);
    } else if (hasMatch) {
      relevantCSS.push(rule);
    }
  });

  return { relevantCSS, pseudoRules };
}

function processCSS(css: CSSRuleType[]): Record<string, string> {
  const cssStyle = css.map(splitCssRules).join('\n');

  return Array.from(new Set(cssStyle.split(';')))
    .map(trim)
    .map(replaceImportant)
    .filter(replaceEmpty)
    .reduce(
      (acc, rule) => {
        const [property, value] = rule.split(':');
        acc[property] = value;
        return acc;
      },
      {} as Record<string, string>
    );
}

function templateStyles(
  cssArray: [string, string][],
  pseudoArray: CSSRuleType[] | undefined
): string {
  const css =
    cssArray
      ?.map(([key, value]) => `  ${kebabCase(key)}: ${value};`)
      .join('\n') || '';

  const pseudo =
    pseudoArray?.map((rule) => transformPsuedoSelectors(rule)).join('\n') || '';

  return `
    ${css}
  
    ${pseudo}
  `;
}

export const cssPropertiesToPixels = (array: [string, string][]) =>
  array.map(resolveCssVariables);

export function getStyles(element: HTMLElement, cssRules: CSSRuleType[]) {
  const { relevantCSS, pseudoRules } = separateRules(cssRules, element);
  const uniqueRelevantCss = cleanBorderProperties(processCSS(relevantCSS));
  const resolvedCss = cssPropertiesToPixels(
    Object.entries(uniqueRelevantCss) as [string, string][]
  );

  return templateStyles(resolvedCss, pseudoRules);
}

interface CSSRuleType2 {
  selector: string;
  cssText: string;
}

export function getAllCSSRules(): CSSRuleType[] {
  const rules: CSSRuleType2[] = [];
  for (const stylesheet of document.styleSheets) {
    try {
      for (const rule of stylesheet.cssRules) {
        if (rule instanceof CSSStyleRule) {
          rules.push({
            selector: rule.selectorText,
            cssText: rule.cssText,
          });
        }
      }
    } catch {
      console.warn('Stylesheet access error');
    }
  }
  return rules;
}
