import { describe, it, expect } from 'bun:test';
import { isTextNode, niceNameForTag } from './html';

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

describe('niceNameForTag', () => {
  it('should return the e2 version of a tag name', () => {
    expect(niceNameForTag('DIV')).toBe('Box');
    expect(niceNameForTag('H1')).toBe('Heading');
    expect(niceNameForTag('P')).toBe('Text');
    expect(niceNameForTag('IMG')).toBe('Image');
    expect(niceNameForTag('A')).toBe('Anchor');
    expect(niceNameForTag('UL')).toBe('UnorderedList');
    expect(niceNameForTag('OL')).toBe('OrderedList');
    expect(niceNameForTag('LI')).toBe('ListItem');
    expect(niceNameForTag('H2')).toBe('Subheading');
    expect(niceNameForTag('H3')).toBe('Subheading3');
    expect(niceNameForTag('H4')).toBe('Subheading4');
    expect(niceNameForTag('H5')).toBe('Subheading5');
    expect(niceNameForTag('H6')).toBe('Subheading6');
    expect(niceNameForTag('SPAN')).toBe('Span');
  });

  it('should return the e2 version of unexpected tags', () => {
    expect(niceNameForTag('FOO')).toBe('Foo');
    expect(niceNameForTag('FOO-BAR')).toBe('FooBar');
  });
});
