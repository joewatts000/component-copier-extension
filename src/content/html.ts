import { ignoredHtmlAttributes } from './constants';

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
