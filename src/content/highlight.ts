import { holyTrinity } from './utils';

function elementHighlight(e: MouseEvent) {
  holyTrinity(e);
  removeHighlight();
  const element = e.target as HTMLElement;
  element.dataset.previousOutline = element.style.outline;
  element.style.outline = '2px solid #ff0000';
}

function removeHighlight() {
  const highlighted: HTMLElement | null = document.querySelector(
    '[data-previous-outline]'
  );
  if (highlighted) {
    highlighted.style.outline = highlighted.dataset.previousOutline || '';
    delete highlighted.dataset.previousOutline;
  }
}

export { elementHighlight, removeHighlight };
