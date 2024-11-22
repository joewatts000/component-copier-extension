import { getStyles } from './css';
import { copyToClipboard } from './utils';

function generateSimpleStyledComponent(
  element: HTMLElement,
  componentName: string,
  pageCssRules: []
) {
  const relevantStyles = getStyles(element, pageCssRules);
  const elementType = element.tagName.toLowerCase();
  const styledComponentCode = generateStyledComponent(
    componentName,
    relevantStyles,
    elementType
  );
  const final = `/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';
  ${styledComponentCode}
  export { ${componentName} };
  `;
  copyToClipboard(final);
}

function generateStyledComponent(
  componentName: string,
  styles: StyleObject | string,
  elementType: string
) {
  return `const ${componentName} = styled.${elementType}\`\n${styles}\n\`;\n`;
}

function generateStyledComponentName(
  tagName: string,
  componentCounter: Map<string, number>
) {
  const count = componentCounter.get(tagName) || 0;
  componentCounter.set(tagName, count + 1);
  const capitalizedTag =
    tagName.charAt(0).toUpperCase() + tagName.slice(1).toLowerCase();
  return `${capitalizedTag}_${count}`;
}

type StyleObject = Record<string, string>;

type ComponentInfo = {
  tag: string;
  styles: StyleObject;
};

type ComponentsMap = Map<string, ComponentInfo>;

function appendStyledComponents(components: ComponentsMap) {
  return Array.from(components)
    .map(([name, { tag, styles }]) =>
      generateStyledComponent(name, styles, tag)
    )
    .join('');
}

export {
  generateSimpleStyledComponent,
  generateStyledComponent,
  generateStyledComponentName,
  appendStyledComponents,
};
