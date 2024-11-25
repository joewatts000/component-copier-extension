import { describe, it, expect } from 'bun:test';
import { capitalize, kebabToCamel } from './strings';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('foo')).toBe('Foo');
    expect(capitalize('FOO')).toBe('FOO');
    expect(capitalize('fOO')).toBe('FOO');
  });
});

describe('kebabToCamel', () => {
  it('should convert kebab case to camel case', () => {
    expect(kebabToCamel('foo-bar')).toBe('fooBar');
    expect(kebabToCamel('foo-bar-foo')).toBe('fooBarFoo');
    expect(kebabToCamel('foo')).toBe('foo');
  });
});
