export function templateComputedStyles(element: HTMLElement) {
  const computedStyles = getComputedStyle(element);

  const relevantComputedStyleProperties = [
    'margin',
    'padding',
    'color',
    'background-color',
    'font-size',
    'font-family',
    'font-weight',
    'line-height',
    'border',
    'border-radius',
    'display',
    'flex-direction',
    'justify-content',
    'align-items',
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'z-index',
    'flex',
    'grid',
    'transform',
  ];

  const relevantComputedStyleValues = relevantComputedStyleProperties
    .map((property) => computedStyles.getPropertyValue(property))
    .filter((value) => {
      return value !== '' && value !== 'initial';
    });

  // TODO filter out default values for the element
  // TODO filter out values that do not add css e.g. border-width: 0px

  return `
    /* css file not accessible, using computed styles instead */
    ${relevantComputedStyleProperties
      .map(
        (property, index) =>
          `${property}: ${relevantComputedStyleValues[index]};`
      )
      .join('\n')}
  `;
}
