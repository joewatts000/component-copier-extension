import { insertPopupHtml } from './form';
import { elementHighlight, removeHighlight } from './highlight';
import {
  holyTrinity,
  getAllCSSRules,
  capitalize,
  removeWhiteSpace,
  generateComponentName,
  copyToClipboard,
  templateComponent,
} from './utils';
import { generateJSX } from './jsx';
import {
  appendStyledComponents,
  generateSimpleStyledComponent,
  generateStyledComponentName,
} from './styled';
import { hidePopup, showPopup } from './popup';
import { resetCursor, setupCursor } from './cursor';
import { getStyles } from './css';
import { ignoredHtmlAttributes } from './constants';

let pickerActive = false;
let pageCssRules;

chrome.runtime.onMessage.addListener(function (request) {
  if (document.readyState !== 'complete') {
    return;
  }
  if (request.action === 'togglePicker') {
    pickerActive = !pickerActive;
    if (pickerActive) {
      enablePicker();
    } else {
      disablePicker();
    }
  }
});

function getAllPageCss() {
  // only get page css once
  if (!pageCssRules) {
    pageCssRules = getAllCSSRules();
  }
}

function enablePicker() {
  setupCursor();
  getAllPageCss();
  insertPopupHtml();
  initializeFormElements();
  addPickerEventListeners();
}

function initializeFormElements() {


}

function addPickerEventListeners() {
  console.log('addPickerEventListeners');
  document.addEventListener('click', elementPicker, { capture: true });
  document.addEventListener(
    'mouseover',
    (e) => elementHighlight?.(e, pickerActive),
    { capture: true }
  );
  document.addEventListener('mouseout', removeHighlight);
}

function removePickerEventListeners() {
  console.log('removePickerEventListeners');
  document.removeEventListener('click', elementPicker, { capture: true });
  document.removeEventListener('mouseover', (e) =>
    elementHighlight(e, pickerActive)
  );
  document.removeEventListener('mouseout', removeHighlight);
}

function disablePicker() {
  pickerActive = false;
  resetCursor();
  removePickerEventListeners();
  removeHighlight();
}

function elementPicker(e) {
  holyTrinity(e);
  disablePicker();
  showPopup();



  const element = e.target;

  const formElement = document.getElementById('react-component-generator-form');
  const nameInput = document.getElementById('component-name-input');

  formElement.onsubmit = (event) => {
    const selectElement = document.getElementById('generated-type');
    event.preventDefault();
    const componentName = nameInput.value
      ? capitalize(removeWhiteSpace(nameInput.value))
      : `${generateComponentName(element)}Component`;

    if (selectElement.value === 'full') {
      convertHTMLToStyledComponents(element, componentName);
    } else if (selectElement.value === 'styled') {
      generateSimpleStyledComponent(element, componentName, pageCssRules);
    }

    hidePopup();
  };
}

function appendJsxComponent(name, tree) {
  return `
  export const ${name} = () => {
  return (
      ${generateJSX(tree)}
    );
  };
`;
}

function isTextNode(node) {
  return node.nodeType === 3;
}

function processTextNode(node) {
  const text = node.textContent.trim();
  return text ? { isText: true, textContent: text, children: [] } : null;
}

function isValidElement(element) {
  return !!element.tagName;
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

function processAttributes(element) {
  return Array.from(element.attributes)
    .filter((attribute) => !ignoredHtmlAttributes.includes(attribute.name))
    .map((attribute) => {
      // replace href with javascript:void(0) to prevent navigations
      if (attribute.name === 'href') {
        return {
          name: 'href',
          value: 'javascript:void(0)',
        };
      }
      return attribute;
    })
    .reduce((acc, attribute) => {
      acc[attribute.name] = attribute.value;
      return acc;
    }, {});
}

function convertHTMLToStyledComponents(rootElement, reactComponentName) {
  let components = new Map();
  let componentCounter = new Map();

  function processElement(element) {
    // text nodes
    if (isTextNode(element)) {
      return processTextNode(element);
    }

    // non-element nodes
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

  // process root element
  const processedTree = processElement(rootElement);

  const output = `${appendStyledComponents(components)} ${appendJsxComponent(reactComponentName, processedTree)}`;

  return copyComponentTemplate(output);
}

function copyComponentTemplate(innerComponents) {
  const fullComponent = templateComponent(innerComponents);
  copyToClipboard(fullComponent);
}
