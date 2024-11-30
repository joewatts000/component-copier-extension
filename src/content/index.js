import { insertPopupHtml } from './form';
import { appendJsxComponent } from './jsx';
import { elementHighlight, removeHighlight } from './highlight';
import {
  holyTrinity,
  generateComponentName,
  copyToClipboard,
  templateComponent,
} from './utils';
import {
  appendStyledComponents,
  generateSimpleStyledComponent,
  generateStyledComponentName,
} from './styledComponents';
import { hidePopup, showPopup } from './popup';
import { resetCursor, setupCursor } from './cursor';
import { getAllCSSRules, getStyles } from './css';
import { isTextNode, isValidElement, processAttributes } from './html';
import { capitalize, removeWhiteSpace } from './strings';
import { POPUP_ID } from './constants';
import { generateSimpleVanillaComponent } from './generateVanillaHtml';

let pickerActive = false;
let pageCssRules;

chrome.runtime.onMessage.addListener(function (request) {
  if (document.readyState !== 'complete') {
    return;
  }
  if (request.action === 'togglePicker') {
    enablePicker();
  }
});

function getAllPageCss() {
  // only get page css once
  if (!pageCssRules) {
    pageCssRules = getAllCSSRules();
  }
}

function enablePicker() {
  if (pickerActive) {
    return;
  }
  pickerActive = true;
  setupCursor();
  getAllPageCss();
  if (!document.getElementById(POPUP_ID)) {
    insertPopupHtml();
    addPickerEventListeners();
  }
}

function addPickerEventListeners() {
  document.addEventListener('click', elementPicker, { capture: true });
  document.addEventListener('mouseover', elementHighlight, { capture: true });
  document.addEventListener('mouseout', removeHighlight);
}

function removePickerEventListeners() {
  document.removeEventListener('click', elementPicker, { capture: true });
  document.removeEventListener('mouseover', elementHighlight, {
    capture: true,
  });
  document.removeEventListener('mouseout', removeHighlight);
}

function disablePicker() {
  pickerActive = false;
  resetCursor();
  removePickerEventListeners();
  removeHighlight();
}

function formatNameInput(name) {
  return capitalize(removeWhiteSpace(name));
}

function getComponentName(inputValue, element) {
  if (inputValue) {
    return formatNameInput(inputValue);
  }
  return `${generateComponentName(element)}Component`;
}

function elementPicker(e) {
  holyTrinity(e);
  disablePicker();
  showPopup();

  const element = e.target;
  const formElement = document.getElementById('react-component-generator-form');

  formElement.onsubmit = (event) => {
    event.preventDefault();
    const selectElement = document.getElementById('generated-type');
    const nameInput = document.getElementById('component-name-input');
    const componentName = getComponentName(nameInput.value, element);

    if (selectElement.value === 'full') {
      convertHTMLToComponents(element, componentName);
    } else if (selectElement.value === 'styled') {
      generateSimpleStyledComponent(element, componentName, pageCssRules);
    } else if (selectElement.value === 'vanilla') {
      const vanillaComponent = generateSimpleVanillaComponent(element);
      copyToClipboard(vanillaComponent);
    }

    hidePopup();
  };

  const fullPageHtmlButton = document.getElementById('full-page-html');
  fullPageHtmlButton.onclick = () => {
    // remove popup form from html
    const popup = document.getElementById(POPUP_ID);
    if (popup) {
      popup.remove();
    }
    const fullPageHtml = document.documentElement.outerHTML;
    copyToClipboard(fullPageHtml);
    hidePopup();
  };
}

function processTextNode(node) {
  const text = node.textContent.trim();
  return text ? { isText: true, textContent: text, children: [] } : null;
}

function processChildNodes(childNodes, processElementFn) {
  const processedChildren = [];
  let hasTextContent = false;

  for (const child of childNodes) {
    if (isTextNode(child)) {
      const text = child.textContent.trim();
      if (text && !hasTextContent) {
        processedChildren.push({
          isText: true,
          textContent: text,
          children: [],
        });
        hasTextContent = true;
      }
    } else {
      const processed = processElementFn(child);
      if (processed) {
        processedChildren.push(processed);
      }
    }
  }

  return processedChildren;
}

function convertHTMLToComponents(rootElement, rootComponentName) {
  let components = new Map();
  let componentCounter = new Map();

  function processElement(element) {
    if (isTextNode(element)) {
      return processTextNode(element);
    }

    if (!isValidElement(element)) {
      return null;
    }

    const componentName = generateStyledComponentName(
      element.tagName,
      componentCounter
    );

    const styles = getStyles(element, pageCssRules);

    components.set(componentName, {
      tag: element.tagName.toLowerCase(),
      styles,
    });

    const childNodes = Array.from(element.childNodes);
    const processedChildren = processChildNodes(childNodes, processElement);
    const attributes = processAttributes(element);

    return {
      componentName,
      children: processedChildren,
      textContent: '',
      isText: false,
      viewBox: element.viewBox,
      attributes,
    };
  }

  const processedTree = processElement(rootElement);
  const output = `
    ${appendStyledComponents(components)}
    ${appendJsxComponent(rootComponentName, processedTree)}
  `;

  return copyComponentTemplate(output);
}

function copyComponentTemplate(innerComponents) {
  const fullComponent = templateComponent(innerComponents);
  copyToClipboard(fullComponent);
}
