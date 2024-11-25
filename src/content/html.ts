import { ignoredHtmlAttributes } from './constants';
import { capitalize, kebabToCamel } from './strings';

export function isTextNode(node: HTMLDivElement | Text) {
  return node.nodeType === 3;
}

export function processTextNode(node: { textContent: string }) {
  const text = node.textContent.trim();
  return text ? { isText: true, textContent: text, children: [] } : null;
}

export function isValidElement(element: HTMLElement) {
  return !!element.tagName;
}

export function processAttributes(element: HTMLElement) {
  return Array.from(element.attributes)
    .filter((attribute: Attr) => attribute.value)
    .filter(
      (attribute: Attr) => !ignoredHtmlAttributes.includes(attribute.name)
    )
    .map((attribute) => {
      // replace href with javascript:void(0) to prevent navigations
      if (attribute.name === 'href') {
        return {
          name: 'href',
          value: 'javascript:void(0)',
        };
      }
      return attribute;
    })
    .reduce((acc, attribute) => {
      acc[attribute.name] = attribute.value;
      return acc;
    }, {});
}

export function niceNameForTag(tagName: string) {
  if (tagName === 'IMG') {
    return 'Image';
  }
  if (tagName === 'A') {
    return 'Anchor';
  }
  if (tagName === 'P') {
    return 'Text';
  }
  if (tagName === 'H1') {
    return 'Heading';
  }
  if (tagName === 'H2') {
    return 'Subheading';
  }
  if (tagName === 'H3') {
    return 'Subheading3';
  }
  if (tagName === 'H4') {
    return 'Subheading4';
  }
  if (tagName === 'H5') {
    return 'Subheading5';
  }
  if (tagName === 'H6') {
    return 'Subheading6';
  }
  if (tagName === 'UL') {
    return 'UnorderedList';
  }
  if (tagName === 'OL') {
    return 'OrderedList';
  }
  if (tagName === 'LI') {
    return 'ListItem';
  }
  if (tagName === 'DIV') {
    return 'Box';
  }
  if (tagName === 'NAV') {
    return 'Navigation';
  }
  if (tagName === 'g') {
    return 'Group';
  }

  const lower = tagName.toLowerCase();
  const camel = kebabToCamel(lower); // for web components
  return capitalize(camel);
}

export function webComponentToDiv(elementType: string) {
  // if the elementType is kebab case its a web component so just return a div
  if (elementType.includes('-')) {
    return 'div';
  }
  return elementType;
}
