var T=[String.fromCharCode(11),String.fromCharCode(12),String.fromCharCode(160),String.fromCharCode(133),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(65279),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],x={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","\xB4":"&acute;"},w=["class","style","data-previous-outline","id","target","rel","tabindex"],s="react-component-generator-popup";var et=`
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
`,rt=`
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
`;function nt(){return`${et}${rt}`}function P(){document.body.insertAdjacentHTML("beforeend",nt())}var $=(t)=>t.trim(),b=(t)=>t.replace(/!important/g,""),R=(t)=>t!=="",u=(t)=>t.charAt(0).toUpperCase()+t.slice(1),L=(t)=>t.replace(/\s/g,""),y=(t)=>t.replace(/[A-Z]/g,(o)=>`-${o.toLowerCase()}`),M=(t)=>t.replace(/-([a-z])/g,(o,e)=>e.toUpperCase()),I=(t)=>{if(typeof t!=="string")return t;try{let o=new RegExp(`[${T.join("")}\u2000-\u200B]`,"g");return t.replace(o,"")}catch(o){return console.error("Error processing string:",o),t}};function h(t){return t.nodeType===3}function H(t){return!!t.tagName}function B(t){return Array.from(t.attributes).filter((o)=>!w.includes(o.name)).map((o)=>{if(o.name==="href")return{name:"href",value:"javascript:void(0)"};return o}).reduce((o,e)=>{return o[e.name]=e.value,o},{})}function m(t){if(t==="IMG")return"Image";if(t==="A")return"Anchor";if(t==="P")return"Text";if(t==="H1")return"Heading";if(t==="H2")return"Subheading";if(t==="H3")return"Subheading3";if(t==="H4")return"Subheading4";if(t==="H5")return"Subheading5";if(t==="H6")return"Subheading6";if(t==="UL")return"UnorderedList";if(t==="OL")return"OrderedList";if(t==="LI")return"ListItem";if(t==="DIV")return"Box";let o=t.toLowerCase(),e=M(o);return u(e)}function k(t){if(t.includes("-"))return"div";return t}function z(t){return I(t.replace(new RegExp(`[${Object.keys(x).join("")}]`,"g"),(o)=>x[o]))}function A(t){return t.cssText.split("{")[1].split("}")[0]}function D(t){return m(t.tagName)}function d(t){navigator.clipboard.writeText(t)}function f(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function U(){let t=[];for(let o of document.styleSheets)try{for(let e of o.cssRules)if(e.type===CSSRule.STYLE_RULE)t.push({selector:e.selectorText,cssText:e.cssText})}catch{console.log("Stylesheet access error")}return t}function _(t){let o={...t};if(o["border-width"]==="0"||o["border-width"]===0||o["border-width"]==="0px")Object.keys(o).filter((e)=>e.startsWith("border-")).forEach((e)=>delete o[e]);return o}function q(t){let o=t.selector.split(",").map((n)=>n.replace(/^.*?(:hover|:focus)/,"$1")).join(","),e=t.cssText.match(/\{(.+)\}/),r=e?e[1].trim():"";return r?`${o} { ${r} }`:""}function W(t){return`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${t}
  `}function Z(t,o=1){if(!t)return"";let e="  ".repeat(o);if(t.isText)return`${e}${z(t.textContent)}`;let r=t.children.map((i)=>Z(i,o+1)).filter(Boolean).join("\n"),n=t.attributes?Object.entries(t.attributes).map(([i,p])=>`${i}="${p}"`).join(" "):"";if(!r)return`${e}<${t.componentName} ${n} />`;return`${e}<${t.componentName} ${n}>${r?"\n"+r+"\n"+e:""}</${t.componentName}>`}function F(t,o){return`
    export const ${t} = () => {
      return (
        ${Z(o)}
      );
    };
  `}function S(t){f(t),l();let o=t.target;o.dataset.previousOutline=o.style.outline,o.style.outline="2px solid #ff0000"}function l(){let t=document.querySelector("[data-previous-outline]");if(t)t.style.outline=t.dataset.previousOutline||"",delete t.dataset.previousOutline}var it=[":hover",":active",":focus",":visited"];function st(t){return it.some((o)=>t.includes(o))}function pt(t,o){let e=[],r=[];return t.forEach((n)=>{let i=o.matches(n.selector),p=st(n.selector);if(i&&p)r.push(n);else if(i)e.push(n)}),{relevantCSS:e,pseudoRules:r}}function ct(t){let o=t.map(A).join("\n");return Array.from(new Set(o.split(";"))).map($).map(b).filter(R).reduce((e,r)=>{let[n,i]=r.split(":");return e[n]=i,e},{})}function ut(t,o){let e=t?.map(([n,i])=>`  ${y(n)}: ${i};`).join("\n")||"",r=o?.map((n)=>q(n)).join("\n")||"";return`
    ${e}
  
    ${r}
  `}function a(t,o){let{relevantCSS:e,pseudoRules:r}=pt(o,t),n=ct(e),i=_(n),p=Object.entries(i);return ut(p,r)}function G(t,o,e){let r=a(t,e),n=t.tagName.toLowerCase(),p=`
    /* eslint-disable import/no-unresolved */
    import styled from 'styled-components';
    ${K(o,r,n)}
    export { ${o} };
  `;d(p)}function K(t,o,e){let r=k(e);return`
    const ${t} = styled.${r}\`
      ${o}
    \`;
  `}function O(t,o){let e=m(t),r=o.get(e)||0;if(o.set(e,r+1),r===0)return e;return`${e}_${r}`}function Q(t){return Array.from(t).map(([o,{tag:e,styles:r}])=>K(o,r,e)).join("")}function V(){document.body.style.cursor="crosshair"}function C(){document.body.style.cursor="default"}function Y(){let t=document.getElementById(s);if(!t)return;t.style.display="block";let o=document.getElementById("component-name-input");if(!o)return;o.focus()}function J(){let t=document.getElementById(s);if(!t)return;t.style.display="none",C()}var v=!1,g;chrome.runtime.onMessage.addListener(function(t){if(document.readyState!=="complete")return;if(t.action==="togglePicker")mt()});function lt(){if(!g)g=U()}function mt(){if(v)return;v=!0,V(),lt(),P(),dt()}function dt(){document.addEventListener("click",X,{capture:!0}),document.addEventListener("mouseover",S,{capture:!0}),document.addEventListener("mouseout",l)}function ft(){document.removeEventListener("click",X,{capture:!0}),document.removeEventListener("mouseover",S,{capture:!0}),document.removeEventListener("mouseout",l)}function at(){v=!1,C(),ft(),l()}function Ct(t){return u(L(t))}function gt(t,o){if(t)return Ct(t);return`${D(o)}Component`}function X(t){f(t),at(),Y();let o=t.target,e=document.getElementById("react-component-generator-form");e.onsubmit=(r)=>{r.preventDefault();let n=document.getElementById("generated-type"),i=document.getElementById("component-name-input"),p=gt(i.value,o);if(n.value==="full")ht(o,p);else if(n.value==="styled")G(o,p,g);J()}}function xt(t){let o=t.textContent.trim();return o?{isText:!0,textContent:o,children:[]}:null}function yt(t,o){let e=[],r=!1;for(let n of t)if(h(n)){let i=n.textContent.trim();if(i&&!r)e.push({isText:!0,textContent:i,children:[]}),r=!0}else{let i=o(n);if(i)e.push(i)}return e}function ht(t,o){let e=new Map,r=new Map;function n(c){if(h(c))return xt(c);if(!H(c))return null;let E=O(c.tagName,r),j=a(c,g);e.set(E,{tag:c.tagName.toLowerCase(),styles:j});let N=Array.from(c.childNodes),tt=yt(N,n),ot=B(c);return{componentName:E,children:tt,textContent:"",isText:!1,viewBox:c.viewBox,attributes:ot}}let i=n(t),p=`${Q(e)} ${F(o,i)}`;return St(p)}function St(t){let o=W(t);d(o)}
