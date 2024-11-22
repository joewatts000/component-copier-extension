export function isTextNode(node: HTMLDivElement | Text) {
  return node.nodeType === 3;
}

export function processTextNode(node: { textContent: string }) {
  const text = node.textContent.trim();
  return text ? { isText: true, textContent: text, children: [] } : null;
}
