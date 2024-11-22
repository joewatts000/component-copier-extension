import { describe, it, expect } from 'bun:test';
import { isTextNode } from './html';

globalThis.document = {
  createTextNode(text: string) {
    return { nodeType: 3, textContent: text };
  },
  createElement(tagName: string) {
    return { nodeType: 1, tagName };
  },
};

describe('isTextNode', () => {
  it('should return true for text nodes', () => {
    const node = document.createTextNode('hello');
    expect(isTextNode(node)).toBe(true);
  });

  it('should return false for non-text nodes', () => {
    const node = document.createElement('div');
    expect(isTextNode(node)).toBe(false);
  });
});
