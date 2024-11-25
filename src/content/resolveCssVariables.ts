import { removeExtraParentheses } from './strings';

type StyleProperty = [string, string];

function resolveCssVariable(
  variable: string,
  fallback?: string
): string | null {
  const computedStyle = getComputedStyle(document.documentElement);
  const value = computedStyle.getPropertyValue(variable.trim());

  if (value) {
    return value.trim();
  }

  return fallback ?? null;
}

export function resolveCssVariables(style: StyleProperty): StyleProperty {
  let [propertyName, propertyValue] = style;

  while (propertyValue.includes('var(')) {
    const startIdx = propertyValue.indexOf('var(');
    const endIdx = propertyValue.indexOf(')', startIdx);
    const varContent = propertyValue.slice(startIdx + 4, endIdx);

    const [varName, fallback] = varContent.includes(',')
      ? varContent.split(',').map((str) => str.trim())
      : [varContent.trim(), undefined];

    const resolvedValue = resolveCssVariable(varName, fallback);
    if (resolvedValue === null) {
      console.error(`CSS variable ${varName} could not be resolved.`);
      return style;
    }

    propertyValue =
      propertyValue.slice(0, startIdx) +
      resolvedValue +
      propertyValue.slice(endIdx + 1);
  }

  // TODO: this is a cleanup hack, fix in the while loop instead
  // trim whitespace from start and end
  const trimmed = propertyValue.replace(/^\s+|\s+$/g, '');
  // clean up extra end parentheses without a start parentheses
  const cleanedValue = removeExtraParentheses(trimmed);

  return [propertyName, cleanedValue];
}
