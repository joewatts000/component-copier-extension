import { describe, it, expect } from 'bun:test';
import { isTextNode } from './html';

type PartialText = {
  nodeType: number;
  textContent: string;
  data: string;
};

type PartialElement = {
  nodeType: number;
  tagName: string;
};

// Declare a partial Document type with just the methods we need
interface PartialDocument {
  createTextNode(): PartialText;
  createElement(): PartialElement;
}

// Cast our mock document to PartialDocument
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).document = {
  createTextNode(text: string): PartialText {
    return { nodeType: 3, textContent: text, data: text };
  },
  createElement(tagName: string): PartialElement {
    return { nodeType: 1, tagName };
  },
} as PartialDocument;

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
