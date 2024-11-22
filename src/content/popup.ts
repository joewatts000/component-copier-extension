function showPopup() {
  const popup: HTMLElement | null = document.getElementById(
    'react-component-generator-popup'
  );
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
  const popup = document.getElementById('react-component-generator-popup');
  if (!popup) {
    return;
  }
  popup.style.display = 'none';
  document.body.style.cursor = 'default';
}

export { showPopup, hidePopup };
