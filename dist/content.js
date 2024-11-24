var T=[String.fromCharCode(11),String.fromCharCode(12),String.fromCharCode(160),String.fromCharCode(133),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(65279),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","\xB4":"&acute;"},E=["class","style","data-previous-outline","id","target","rel","tabindex"],s="react-component-generator-popup";var j=`
  <style>
    #${s} {
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

    #${s} h3 {
      margin: 0 0 16px;
      font-weight: normal;
      color: white;
    }

    #${s} form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    #${s} input, #${s} select {
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

    #${s} select {
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
      background-position: calc(100% - 0.75rem) center !important;
      -moz-appearance:none !important;
      -webkit-appearance: none !important; 
      appearance: none !important;
      padding-right: 2rem !important;
      color: #333;
    }

    #${s} button {
      padding: 8px 16px;
      font-size: 16px;
      border-radius: var(--border-radius);
      border: 1px solid #333;
      background-color: white;
      color: #333;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    #${s} button:hover {
      background-color: #333;
      color: white;
      border-color: white;
    }
  </style>
`,tt=`
  <div id="${s}" style="display:none;">
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
`;function et(){return`${j}${tt}`}function w(){document.body.insertAdjacentHTML("beforeend",et())}var P=(t)=>t.trim(),$=(t)=>t.replace(/!important/g,""),b=(t)=>t!=="";function m(t){return t.charAt(0).toUpperCase()+t.slice(1)}function R(t){return t.replace(/\s/g,"")}function x(t){return t.replace(/[A-Z]/g,(e)=>`-${e.toLowerCase()}`)}var L=(t)=>{if(typeof t!=="string")return t;try{let e=new RegExp(`[${T.join("")}\u2000-\u200B]`,"g");return t.replace(e,"")}catch(e){return console.error("Error processing string:",e),t}};function M(t){return L(t.replace(new RegExp(`[${Object.keys(C).join("")}]`,"g"),(e)=>C[e]))}function I(t){return t.cssText.split("{")[1].split("}")[0]}function H(t){let e=t.tagName.toLowerCase();return`${m(e)}`}function a(t){navigator.clipboard.writeText(t)}function l(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function z(){let t=[];for(let e of document.styleSheets)try{for(let o of e.cssRules)if(o.type===CSSRule.STYLE_RULE)t.push({selector:o.selectorText,cssText:o.cssText})}catch{console.log("Stylesheet access error")}return t}function k(t){let e={...t};if(e["border-width"]==="0"||e["border-width"]===0||e["border-width"]==="0px")Object.keys(e).filter((o)=>o.startsWith("border-")).forEach((o)=>delete e[o]);return e}function B(t){let e=t.selector.split(",").map((r)=>r.replace(/^.*?(:hover|:focus)/,"$1")).join(","),o=t.cssText.match(/\{(.+)\}/),n=o?o[1].trim():"";return n?`${e} { ${n} }`:""}function A(t){return`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${t}
  `}function N(t,e=1){if(!t)return"";let o="  ".repeat(e);if(t.isText)return`${o}${M(t.textContent)}`;let n=t.children.map((i)=>N(i,e+1)).filter(Boolean).join("\n"),r=t.attributes?Object.entries(t.attributes).map(([i,p])=>`${i}="${p}"`).join(" "):"";if(!n)return`${o}<${t.componentName} ${r} />`;return`${o}<${t.componentName} ${r}>${n?"\n"+n+"\n"+o:""}</${t.componentName}>`}function D(t,e){return`
    export const ${t} = () => {
      return (
        ${N(e)}
      );
    };
  `}function y(t){l(t),u();let e=t.target;e.dataset.previousOutline=e.style.outline,e.style.outline="2px solid #ff0000"}function u(){let t=document.querySelector("[data-previous-outline]");if(t)t.style.outline=t.dataset.previousOutline||"",delete t.dataset.previousOutline}var ot=[":hover",":active",":focus",":visited"];function rt(t){return ot.some((e)=>t.includes(e))}function nt(t,e){let o=[],n=[];return t.forEach((r)=>{let i=e.matches(r.selector),p=rt(r.selector);if(i&&p)n.push(r);else if(i)o.push(r)}),{relevantCSS:o,pseudoRules:n}}function it(t){let e=t.map(I).join("\n");return Array.from(new Set(e.split(";"))).map(P).map($).filter(b).reduce((o,n)=>{let[r,i]=n.split(":");return o[r]=i,o},{})}function st(t,e){let o=t?.map(([r,i])=>`  ${x(r)}: ${i};`).join("\n")||"",n=e?.map((r)=>B(r)).join("\n")||"";return`
    ${o}
  
    ${n}
  `}function d(t,e){let{relevantCSS:o,pseudoRules:n}=nt(e,t),r=it(o),i=k(r),p=Object.entries(i);return st(p,n)}function U(t,e,o){let n=d(t,o),r=t.tagName.toLowerCase(),p=`
    /* eslint-disable import/no-unresolved */
    import styled from 'styled-components';
    ${_(e,n,r)}
    export { ${e} };
  `;a(p)}function _(t,e,o){return`
    const ${t} = styled.${o}\`
      ${e}
    \`;
  `}function q(t,e){let o=e.get(t)||0;return e.set(t,o+1),`${m(t)}_${o}`}function Z(t){return Array.from(t).map(([e,{tag:o,styles:n}])=>_(e,n,o)).join("")}function W(){document.body.style.cursor="crosshair"}function f(){document.body.style.cursor="default"}function F(){let t=document.getElementById(s);if(!t)return;t.style.display="block";let e=document.getElementById("component-name-input");if(!e)return;e.focus()}function G(){let t=document.getElementById(s);if(!t)return;t.style.display="none",f()}function h(t){return t.nodeType===3}function K(t){return!!t.tagName}function O(t){return Array.from(t.attributes).filter((e)=>!E.includes(e.name)).map((e)=>{if(e.name==="href")return{name:"href",value:"javascript:void(0)"};return e}).reduce((e,o)=>{return e[o.name]=o.value,e},{})}var S=!1,g;chrome.runtime.onMessage.addListener(function(t){if(document.readyState!=="complete")return;if(t.action==="togglePicker")ct()});function pt(){if(!g)g=z()}function ct(){if(S)return;S=!0,W(),pt(),w(),mt()}function mt(){document.addEventListener("click",Q,{capture:!0}),document.addEventListener("mouseover",y,{capture:!0}),document.addEventListener("mouseout",u)}function ut(){document.removeEventListener("click",Q,{capture:!0}),document.removeEventListener("mouseover",y,{capture:!0}),document.removeEventListener("mouseout",u)}function at(){S=!1,f(),ut(),u()}function lt(t){return m(R(t))}function dt(t,e){if(t)return lt(t);return`${H(e)}Component`}function Q(t){l(t),at(),F();let e=t.target,o=document.getElementById("react-component-generator-form");o.onsubmit=(n)=>{n.preventDefault();let r=document.getElementById("generated-type"),i=document.getElementById("component-name-input"),p=dt(i.value,e);if(r.value==="full")Ct(e,p);else if(r.value==="styled")U(e,p,g);G()}}function ft(t){let e=t.textContent.trim();return e?{isText:!0,textContent:e,children:[]}:null}function gt(t,e){let o=[],n=!1;for(let r of t)if(h(r)){let i=r.textContent.trim();if(i&&!n)o.push({isText:!0,textContent:i,children:[]}),n=!0}else{let i=e(r);if(i)o.push(i)}return o}function Ct(t,e){let o=new Map,n=new Map;function r(c){if(h(c))return ft(c);if(!K(c))return null;let v=q(c.tagName,n),V=d(c,g);o.set(v,{tag:c.tagName.toLowerCase(),styles:V});let Y=Array.from(c.childNodes),J=gt(Y,r),X=O(c);return{componentName:v,children:J,textContent:"",isText:!1,viewBox:c.viewBox,attributes:X}}let i=r(t),p=`${Z(o)} ${D(e,i)}`;return xt(p)}function xt(t){let e=A(t);a(e)}
