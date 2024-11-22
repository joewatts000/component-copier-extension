import { replaceSpecialCharsWithHTMLEntities } from './utils';

type Node = {
  isText: boolean;
  textContent: string;
  children: Node[];
  attributes: never;
  componentName: string;
};

export function generateJSX(node: Node | null, depth = 1) {
  if (!node) return '';
  const indent = '  '.repeat(depth);

  if (node.isText) {
    return `${indent}${replaceSpecialCharsWithHTMLEntities(node.textContent)}`;
  }

  const childrenJSX = node.children
    .map((child) => generateJSX(child, depth + 1))
    .filter(Boolean)
    .join('\n');

  const attributeString = node.attributes
    ? Object.entries(node.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
    : '';

  // if its an empty element like <br> or <img> generate a self closing tag
  if (!childrenJSX) {
    return `${indent}<${node.componentName} ${attributeString} />`;
  }

  return `${indent}<${node.componentName} ${attributeString}>${childrenJSX ? '\n' + childrenJSX + '\n' + indent : ''}</${node.componentName}>`;
}
