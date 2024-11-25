// src/content/constants.ts
var controlChars = [
  String.fromCharCode(11),
  String.fromCharCode(12),
  String.fromCharCode(160),
  String.fromCharCode(133),
  String.fromCharCode(5760),
  String.fromCharCode(6158),
  String.fromCharCode(65279),
  String.fromCharCode(8232),
  String.fromCharCode(8233),
  String.fromCharCode(8239),
  String.fromCharCode(8287),
  String.fromCharCode(12288)
];
var specialChars = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
  "\xB4": "&acute;"
};
var ignoredHtmlAttributes = [
  "class",
  "data-previous-outline",
  "id",
  "target",
  "rel",
  "tabindex"
];
var POPUP_ID = "react-component-generator-popup";

// src/content/form.ts
var styles = `
  <style>
    #${POPUP_ID} {
      font-family: sans-serif;
      font-size: 15px;
      position: fixed; 
      top: 20px; 
      left: 20px; 
      background-color: #333; 
      padding: 20px;  
      z-index: 10000;
      text-align: center;
      --border-radius: 24px;
    }

    #${POPUP_ID} h3 {
      margin: 0 0 16px;
      font-weight: normal;
      color: white;
    }

    #${POPUP_ID} form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    #${POPUP_ID} input, #${POPUP_ID} select {
      background: white;
      color: #333;
      padding: 10px 16px;
      font-size: 16px;
      border: 1px solid #333;
      border-radius: var(--border-radius);
      min-width: 280px;
    }

    .select-wrapper {
      background-color: white;
      border-radius: var(--border-radius);
    }

    #${POPUP_ID} select {
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
      background-position: calc(100% - 0.75rem) center !important;
      -moz-appearance:none !important;
      -webkit-appearance: none !important; 
      appearance: none !important;
      padding-right: 2rem !important;
      color: #333;
    }

    #${POPUP_ID} button {
      padding: 8px 16px;
      font-size: 16px;
      border-radius: var(--border-radius);
      border: 1px solid #333;
      background-color: white;
      color: #333;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    #${POPUP_ID} button:hover {
      background-color: #333;
      color: white;
      border-color: white;
    }
  </style>
`;
var html = `
  <div id="${POPUP_ID}" style="display:none;">
    <h3>Customize Component</h3>
    <form id="react-component-generator-form">
      <input type="text" id="component-name-input" placeholder="Enter Component Name" />
      <div class="select-wrapper">
        <select id="generated-type">
          <option value="full">Full Component</option>
          <option value="styled">Styled Component</option>
        </select>
      </div>
      <button type="submit">Generate Component</button>
    </form>
  </div>
`;
function getPopupHtml() {
  return `${styles}${html}`;
}
function insertPopupHtml() {
  document.body.insertAdjacentHTML("beforeend", getPopupHtml());
}

// src/content/strings.ts
var trim = (s) => s.trim();
var replaceImportant = (s) => s.replace(/!important/g, "");
var replaceEmpty = (s) => s !== "";
var capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
var removeWhiteSpace = (str) => str.replace(/\s/g, "");
var kebabCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
var kebabToCamel = (str) => str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
var removeWeirdSpaces = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  try {
    const controlCharRegex = new RegExp(`[${controlChars.join("")}\u2000-\u200B]`, "g");
    return str.replace(controlCharRegex, "");
  } catch (error) {
    console.error("Error processing string:", error);
    return str;
  }
};
var removeExtraParentheses = (input) => {
  let openBrackets = 0;
  const result = [...input].filter((char) => {
    if (char === "(") {
      openBrackets++;
      return true;
    } else if (char === ")") {
      if (openBrackets > 0) {
        openBrackets--;
        return true;
      }
      return false;
    }
    return true;
  });
  return result.join("");
};

// src/content/resolveCssVariables.ts
function resolveCssVariable(variable, fallback) {
  const computedStyle = getComputedStyle(document.documentElement);
  const value = computedStyle.getPropertyValue(variable.trim());
  if (value) {
    return value.trim();
  }
  return fallback ?? null;
}
function resolveCssVariables(style) {
  let [propertyName, propertyValue] = style;
  while (propertyValue.includes("var(")) {
    const startIdx = propertyValue.indexOf("var(");
    const endIdx = propertyValue.indexOf(")", startIdx);
    const varContent = propertyValue.slice(startIdx + 4, endIdx);
    const [varName, fallback] = varContent.includes(",") ? varContent.split(",").map((str) => str.trim()) : [varContent.trim(), undefined];
    const resolvedValue = resolveCssVariable(varName, fallback);
    if (resolvedValue === null) {
      console.error(`CSS variable ${varName} could not be resolved.`);
      return style;
    }
    propertyValue = propertyValue.slice(0, startIdx) + resolvedValue + propertyValue.slice(endIdx + 1);
  }
  const trimmed = propertyValue.replace(/^\s+|\s+$/g, "");
  const cleanedValue = removeExtraParentheses(trimmed);
  return [propertyName, cleanedValue];
}

// src/content/templateComputedStyles.ts
function templateComputedStyles(element) {
  const computedStyles = getComputedStyle(element);
  const relevantComputedStyleProperties = [
    "margin",
    "padding",
    "color",
    "background-color",
    "font-size",
    "font-family",
    "font-weight",
    "line-height",
    "border",
    "border-radius",
    "display",
    "flex-direction",
    "justify-content",
    "align-items",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "z-index",
    "flex",
    "grid",
    "transform"
  ];
  const relevantComputedStyleValues = relevantComputedStyleProperties.map((property) => computedStyles.getPropertyValue(property)).filter((value) => {
    return value !== "" && value !== "initial";
  });
  return `
    /* css file not accessible, using computed styles instead */
    ${relevantComputedStyleProperties.map((property, index) => `${property}: ${relevantComputedStyleValues[index]};`).join("\n")}
  `;
}

// src/content/css.ts
var PSEUDO_SELECTORS = [":hover", ":active", ":focus", ":visited"];
function isPseudoRule(testSelector) {
  return PSEUDO_SELECTORS.some((selector) => testSelector.includes(selector));
}
function separateRules(cssRules, element) {
  const relevantCSS = [];
  const pseudoRules = [];
  cssRules.forEach((rule) => {
    const hasMatch = element.matches(rule.selector);
    const isPseudo = isPseudoRule(rule.selector);
    if (hasMatch && isPseudo) {
      pseudoRules.push(rule);
    } else if (hasMatch) {
      relevantCSS.push(rule);
    }
  });
  return { relevantCSS, pseudoRules };
}
function processCSS(css) {
  const cssStyle = css.map(splitCssRules).join("\n");
  return Array.from(new Set(cssStyle.split(";"))).map(trim).map(replaceImportant).filter(replaceEmpty).reduce((acc, rule) => {
    const [property, value] = rule.split(":");
    acc[property] = value;
    return acc;
  }, {});
}
function templateStyles(cssArray, pseudoArray) {
  const css = cssArray?.map(([key, value]) => `  ${kebabCase(key)}: ${value};`).join("\n") || "";
  const pseudo = [
    ...new Set(pseudoArray?.map((rule) => transformPsuedoSelectors(rule)))
  ]?.join("\n") || "";
  return `
    ${css}
  
    ${pseudo}
  `;
}
var cssPropertiesToPixels = (array) => array.map(resolveCssVariables);
function getStyles(element, cssRules) {
  if (cssRules.length === 0) {
    return templateComputedStyles(element);
  }
  const { relevantCSS, pseudoRules } = separateRules(cssRules, element);
  const uniqueRelevantCss = cleanBorderProperties(processCSS(relevantCSS));
  const resolvedCss = cssPropertiesToPixels(Object.entries(uniqueRelevantCss));
  return templateStyles(resolvedCss, pseudoRules);
}
function getAllCSSRules() {
  const rules = [];
  for (const stylesheet of document.styleSheets) {
    try {
      for (const rule of stylesheet.cssRules) {
        if (rule instanceof CSSStyleRule) {
          rules.push({
            selector: rule.selectorText,
            cssText: rule.cssText
          });
        }
      }
    } catch {
      console.warn("! -------- Stylesheet access error -------- !");
      return [];
    }
  }
  return rules;
}

// src/content/html.ts
function isTextNode(node) {
  return node.nodeType === 3;
}
function isValidElement(element) {
  return !!element.tagName;
}
function processAttributes(element) {
  return Array.from(element.attributes).filter((attribute) => attribute.value).filter((attribute) => !ignoredHtmlAttributes.includes(attribute.name)).map((attribute) => {
    if (attribute.name === "href") {
      return {
        name: "href",
        value: "javascript:void(0)"
      };
    }
    return attribute;
  }).reduce((acc, attribute) => {
    acc[attribute.name] = attribute.value;
    return acc;
  }, {});
}
function niceNameForTag(tagName) {
  if (tagName === "IMG") {
    return "Image";
  }
  if (tagName === "A") {
    return "Anchor";
  }
  if (tagName === "P") {
    return "Text";
  }
  if (tagName === "H1") {
    return "Heading";
  }
  if (tagName === "H2") {
    return "Subheading";
  }
  if (tagName === "H3") {
    return "Subheading3";
  }
  if (tagName === "H4") {
    return "Subheading4";
  }
  if (tagName === "H5") {
    return "Subheading5";
  }
  if (tagName === "H6") {
    return "Subheading6";
  }
  if (tagName === "UL") {
    return "UnorderedList";
  }
  if (tagName === "OL") {
    return "OrderedList";
  }
  if (tagName === "LI") {
    return "ListItem";
  }
  if (tagName === "DIV") {
    return "Box";
  }
  if (tagName === "NAV") {
    return "Navigation";
  }
  if (tagName === "g") {
    return "Group";
  }
  const lower = tagName.toLowerCase();
  const camel = kebabToCamel(lower);
  return capitalize(camel);
}
function webComponentToDiv(elementType) {
  if (elementType.includes("-")) {
    return "div";
  }
  return elementType;
}

// src/content/utils.ts
function replaceSpecialCharsWithHTMLEntities(str) {
  return removeWeirdSpaces(str.replace(new RegExp(`[${Object.keys(specialChars).join("")}]`, "g"), (char) => specialChars[char]));
}
function splitCssRules(rule) {
  return rule.cssText.split("{")[1].split("}")[0];
}
function generateComponentName(element) {
  return niceNameForTag(element.tagName);
}
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}
function holyTrinity(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
}
function cleanBorderProperties(styleObject) {
  const cleanedObject = { ...styleObject };
  if (cleanedObject["border-width"] === "0" || cleanedObject["border-width"] === 0 || cleanedObject["border-width"] === "0px") {
    Object.keys(cleanedObject).filter((key) => key.startsWith("border-")).forEach((key) => delete cleanedObject[key]);
  }
  return cleanedObject;
}
function transformPsuedoSelectors(selectorObj) {
  const cleanedSelectors = selectorObj.selector.split(",").map((sel) => sel.replace(/^.*?(:hover|:focus)/, "$1"));
  const uniqueSelectors = [...new Set(cleanedSelectors)];
  const joinedSelectors = uniqueSelectors.join(",");
  const match = selectorObj.cssText.match(/\{(.+)\}/);
  const cssRules = match ? match[1].trim() : "";
  const cssRulesArray = cssRules.split(";").map((rule) => rule.trim()).map((rule) => rule.split(":")).map((rule) => rule.map((str) => str.trim())).filter((rule) => rule[0] !== "");
  const resolvedCssRulesArray = cssPropertiesToPixels(cssRulesArray).map((rule) => rule.join(": ")).join(";\n");
  return cssRules ? `${joinedSelectors} { ${resolvedCssRulesArray}; }` : "";
}
function templateComponent(components) {
  return `/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${components}
  `;
}

// src/content/jsx.ts
function generateJSX(node, depth = 1) {
  if (!node)
    return "";
  const indent = "  ".repeat(depth);
  if (node.isText) {
    return `${indent}${replaceSpecialCharsWithHTMLEntities(node.textContent)}`;
  }
  const childrenJSX = node.children.map((child) => generateJSX(child, depth + 1)).filter(Boolean).join("\n");
  const attributeString = node.attributes ? Object.entries(node.attributes).map(([key, value]) => `${key}="${value}"`).join(" ") : "";
  if (!childrenJSX) {
    return `${indent}<${node.componentName} ${attributeString} />`;
  }
  return `${indent}<${node.componentName} ${attributeString}>${childrenJSX ? "\n" + childrenJSX + "\n" + indent : ""}</${node.componentName}>`;
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

// src/content/highlight.ts
function elementHighlight(e) {
  holyTrinity(e);
  removeHighlight();
  const element = e.target;
  element.dataset.previousOutline = element.style.outline;
  element.style.outline = "2px solid #ff0000";
}
function removeHighlight() {
  const highlighted = document.querySelector("[data-previous-outline]");
  if (highlighted) {
    highlighted.style.outline = highlighted.dataset.previousOutline || "";
    delete highlighted.dataset.previousOutline;
  }
}

// src/content/styledComponents.ts
function generateSimpleStyledComponent(element, componentName, pageCssRules) {
  const styles2 = getStyles(element, pageCssRules);
  const elementType = element.tagName.toLowerCase();
  const styledComponentCode = generateStyledComponent(componentName, styles2, elementType);
  const final = `
    /* eslint-disable import/no-unresolved */
    import styled from 'styled-components';
    ${styledComponentCode}
    export { ${componentName} };
  `;
  copyToClipboard(final);
}
function generateStyledComponent(componentName, styles2, elementType) {
  return `
    const ${componentName} = styled.${webComponentToDiv(elementType)}\`
      ${styles2}
    \`;
  `;
}
function generateStyledComponentName(tagName, componentCounter) {
  const niceName = niceNameForTag(tagName);
  const count = componentCounter.get(niceName) || 0;
  componentCounter.set(niceName, count + 1);
  if (count === 0) {
    return niceName;
  }
  return `${niceName}_${count}`;
}
function appendStyledComponents(components) {
  return Array.from(components).map(([name, { tag, styles: styles2 }]) => generateStyledComponent(name, styles2, tag)).join("");
}

// src/content/cursor.ts
function setupCursor() {
  document.body.style.cursor = "crosshair";
}
function resetCursor() {
  document.body.style.cursor = "default";
}

// src/content/popup.ts
function showPopup() {
  const popup = document.getElementById(POPUP_ID);
  if (!popup) {
    return;
  }
  popup.style.display = "block";
  const nameInput = document.getElementById("component-name-input");
  if (!nameInput) {
    return;
  }
  nameInput.focus();
}
function hidePopup() {
  const popup = document.getElementById(POPUP_ID);
  if (!popup) {
    return;
  }
  popup.style.display = "none";
  resetCursor();
}

// src/content/index.js
var pickerActive = false;
var pageCssRules;
chrome.runtime.onMessage.addListener(function(request) {
  if (document.readyState !== "complete") {
    return;
  }
  if (request.action === "togglePicker") {
    enablePicker();
  }
});
function getAllPageCss() {
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
  insertPopupHtml();
  addPickerEventListeners();
}
function addPickerEventListeners() {
  document.addEventListener("click", elementPicker, { capture: true });
  document.addEventListener("mouseover", elementHighlight, { capture: true });
  document.addEventListener("mouseout", removeHighlight);
}
function removePickerEventListeners() {
  document.removeEventListener("click", elementPicker, { capture: true });
  document.removeEventListener("mouseover", elementHighlight, {
    capture: true
  });
  document.removeEventListener("mouseout", removeHighlight);
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
  const formElement = document.getElementById("react-component-generator-form");
  formElement.onsubmit = (event) => {
    event.preventDefault();
    const selectElement = document.getElementById("generated-type");
    const nameInput = document.getElementById("component-name-input");
    const componentName = getComponentName(nameInput.value, element);
    if (selectElement.value === "full") {
      convertHTMLToComponents(element, componentName);
    } else if (selectElement.value === "styled") {
      generateSimpleStyledComponent(element, componentName, pageCssRules);
    }
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
          children: []
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
  let components = new Map;
  let componentCounter = new Map;
  function processElement(element) {
    if (isTextNode(element)) {
      return processTextNode(element);
    }
    if (!isValidElement(element)) {
      return null;
    }
    const componentName = generateStyledComponentName(element.tagName, componentCounter);
    const styles2 = getStyles(element, pageCssRules);
    components.set(componentName, {
      tag: element.tagName.toLowerCase(),
      styles: styles2
    });
    const childNodes = Array.from(element.childNodes);
    const processedChildren = processChildNodes(childNodes, processElement);
    const attributes = processAttributes(element);
    return {
      componentName,
      children: processedChildren,
      textContent: "",
      isText: false,
      viewBox: element.viewBox,
      attributes
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
