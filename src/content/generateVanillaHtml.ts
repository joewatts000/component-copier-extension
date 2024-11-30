export function generateSimpleVanillaComponent(element) {
  // Helper function to recursively process each element
  function applyInlineStyles(el) {
    const computedStyles = getComputedStyle(el);

    // Generate a style string from the computed styles
    let styleString = '';
    for (let i = 0; i < computedStyles.length; i++) {
      const prop = computedStyles[i];
      const value = computedStyles.getPropertyValue(prop);
      styleString += `${prop}:${value};`;
    }

    // Apply the style string as the inline style
    el.setAttribute('style', styleString);

    // Recursively apply to children
    for (let child of el.children) {
      applyInlineStyles(child);
    }
  }

  applyInlineStyles(element);

  // Return the resulting HTML with inline styles
  return element.outerHTML;
}
