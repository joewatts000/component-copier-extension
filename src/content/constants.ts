export const relevantComputedStyleProperties = [
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

export const controlChars = [
  String.fromCharCode(0x000b),
  String.fromCharCode(0x000c),
  String.fromCharCode(0x00a0),
  String.fromCharCode(0x0085),
  String.fromCharCode(0x1680),
  String.fromCharCode(0x180e),
  String.fromCharCode(0xfeff),
  String.fromCharCode(0x2028),
  String.fromCharCode(0x2029),
  String.fromCharCode(0x202f),
  String.fromCharCode(0x205f),
  String.fromCharCode(0x3000),
];

export const specialChars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
  '´': '&acute;',
};

export const ignoredHtmlAttributes = [
  'class',
  'style',
  'data-previous-outline',
  'id',
  'target',
  'rel',
  'tabindex',
];
