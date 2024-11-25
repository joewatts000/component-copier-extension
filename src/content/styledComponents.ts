import { getStyles } from './css';
import { copyToClipboard } from './utils';
import { niceNameForTag, webComponentToDiv } from './html';

export function generateSimpleStyledComponent(
  element: HTMLElement,
  componentName: string,
  pageCssRules: []
) {
  const styles = getStyles(element, pageCssRules);
  const elementType = element.tagName.toLowerCase();
  const styledComponentCode = generateStyledComponent(
    componentName,
    styles,
    elementType
  );
  const final = `
    /* eslint-disable import/no-unresolved */
    import styled from 'styled-components';
    ${styledComponentCode}
    export { ${componentName} };
  `;
  copyToClipboard(final);
}

export function generateStyledComponent(
  componentName: string,
  styles: StyleObject | string,
  elementType: string
) {
  const nonWebComponent = webComponentToDiv(elementType);
  return `
    const ${componentName} = styled.${nonWebComponent}\`
      ${styles}
    \`;
  `;
}

export function generateStyledComponentName(
  tagName: string,
  componentCounter: Map<string, number>
) {
  const niceName = niceNameForTag(tagName);
  const count = componentCounter.get(niceName) || 0;
  componentCounter.set(niceName, count + 1);
  if (count === 0) {
    return niceName;
  }
  return `${niceName}_${count}`;
}

type StyleObject = Record<string, string>;

type ComponentInfo = {
  tag: string;
  styles: StyleObject;
};

type ComponentsMap = Map<string, ComponentInfo>;

export function appendStyledComponents(components: ComponentsMap) {
  return Array.from(components)
    .map(([name, { tag, styles }]) =>
      generateStyledComponent(name, styles, tag)
    )
    .join('');
}
