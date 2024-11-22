import { relevantComputedStyleProperties } from './constants';
import {
  cleanBorderProperties,
  cssObjectsToString,
  CSSRuleType,
  isZeroWidthValue,
  splitCssRules,
  transformPsuedoSelectors,
  kebabCase,
} from './utils';

function createHiddenIframe(): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return iframe;
}

function createElementInIframe(
  iframe: HTMLIFrameElement,
  tagName: string
): HTMLElement | null {
  const contentDocument = iframe.contentDocument;
  if (!contentDocument) return null;

  const element = contentDocument.createElement(tagName);
  contentDocument.body.appendChild(element);
  return element;
}

export function getDefaultStyle(tagName: string, property: string): string {
  const iframe = createHiddenIframe();
  const element = createElementInIframe(iframe, tagName);

  if (!element) {
    document.body.removeChild(iframe);
    return '';
  }

  const inlineStyle = element.style[property];
  if (inlineStyle) {
    document.body.removeChild(iframe);
    return `${inlineStyle}`;
  }

  const computedStyle =
    iframe.contentWindow?.getComputedStyle(element)[property];

  document.body.removeChild(iframe);
  return `${computedStyle}`;
}

export function getStyles(element: HTMLElement, cssRules: CSSRuleType[]) {
  // TODO sack this shit off
  const computedStyle = getComputedStyle(element);

  const relevantComputedStyles = {};

  relevantComputedStyleProperties.forEach((prop) => {
    const value = computedStyle.getPropertyValue(prop);
    const defaultValue = getDefaultStyle(element.tagName, prop);

    if (prop.includes('border') && isZeroWidthValue(value)) {
      return;
    }
    if (
      value &&
      value !== defaultValue &&
      !['none', 'normal', '0px', 'auto'].includes(value)
    ) {
      relevantComputedStyles[prop] = value;
    }
  });

  // TODO: resolve vars to pixels

  let cssStyle = '';

  const psuedoSelectors = [':hover', ':active', ':focus', ':visited'];
  const psuedoRules: CSSRuleType[] = [];

  const relevantCSS = cssRules.filter((rule) => {
    const hasMatch = element.matches(rule.selector);
    const isPseudoSelector = psuedoSelectors.some((selector) =>
      rule.selector.includes(selector)
    );
    // push psudeo rules to different array e.g. ".subnav-item:hover, .subnav-item:focus"
    if (hasMatch && isPseudoSelector) {
      psuedoRules.push(rule);
      return false;
    }
    return hasMatch;
  });

  if (relevantCSS.length) {
    relevantCSS.forEach((rule) => {
      cssStyle += `\n${splitCssRules(rule)}`;
    });
  }
  // remove duplicated styles, trim whitespace, remove empty lines
  const uniqueRelevantCss = Array.from(new Set(cssStyle.split(';')))
    .map((rule) => rule.trim())
    .map((rule) => rule.replace(' !important', ''))
    .filter((rule) => rule !== '')
    .reduce((acc, rule) => {
      const [property, value] = rule.split(':');
      acc[property] = value;
      return acc;
    }, {});

  // remove 0 width border values
  const withoutZeroWidthBordersArray = Object.entries(
    cleanBorderProperties(uniqueRelevantCss)
  );

  return `  /*** from getComputedStyle ***/

    ${cssObjectsToString(relevantComputedStyles)}

    ${withoutZeroWidthBordersArray.length > 0 ? '/*** from CSS rules ***/' : ''}
    
    ${withoutZeroWidthBordersArray
      .map(([key, value]) => `  ${kebabCase(key)}: ${value};`)
      .join('\n')}

    ${psuedoRules.length > 0 ? '/*** alt states ***/' : ''}

    ${psuedoRules.map(transformPsuedoSelectors).join('\n')}
  `;
}
