import { POPUP_ID } from './constants';
import { resetCursor } from './cursor';

function showPopup() {
  const popup: HTMLElement | null = document.getElementById(POPUP_ID);
  if (!popup) {
    return;
  }
  popup.style.display = 'block';
  const nameInput: HTMLElement | null = document.getElementById(
    'component-name-input'
  );
  if (!nameInput) {
    return;
  }
  nameInput.focus();
}

function hidePopup() {
  const popup: HTMLElement | null = document.getElementById(POPUP_ID);
  if (!popup) {
    return;
  }
  popup.style.display = 'none';
  resetCursor();
}

export { showPopup, hidePopup };
