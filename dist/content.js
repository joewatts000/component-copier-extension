function J(){return`
<style>
  #react-component-generator-popup {
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

  #react-component-generator-popup h3 {
    margin: 0 0 16px;
    font-weight: normal;
    color: white;
  }

  #react-component-generator-popup form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  #react-component-generator-popup input, #react-component-generator-popup select {
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

  #react-component-generator-popup select {
    background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
    background-position: calc(100% - 0.75rem) center !important;
    -moz-appearance:none !important;
    -webkit-appearance: none !important; 
    appearance: none !important;
    padding-right: 2rem !important;
    color: #333;
  }

  #react-component-generator-popup button {
    padding: 8px 16px;
    font-size: 16px;
    border-radius: var(--border-radius);
    border: 1px solid #333;
    background-color: white;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  #react-component-generator-popup button:hover {
    background-color: #333;
    color: white;
    border-color: white;
  }
</style>

<div id="react-component-generator-popup" style="display:none;">
  <h3>Customize Component</h3>
  <form id="react-component-generator-form">
    <input type="text" id="component-name-input" placeholder="Enter Component Name" />
    <div class="select-wrapper">
      <select id="generated-type">
        <option value="full">Full Component</option>
        <option value="styled">Only Styled Components</option>
      </select>
    </div>
    <button type="submit">Generate Component</button>
  </form>
</div>
`}function w(){document.body.insertAdjacentHTML("beforeend",J())}var $=[String.fromCharCode(11),String.fromCharCode(12),String.fromCharCode(160),String.fromCharCode(133),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(65279),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],x={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","´":"&acute;"},M=["class","style","data-previous-outline","id","target","rel","tabindex"];function b(o){return o.replace(/[A-Z]/g,(r)=>`-${r.toLowerCase()}`)}var A=(o)=>{if(typeof o!=="string")return o;try{let r=new RegExp(`[${$.join("")} -​]`,"g");return o.replace(r,"")}catch(r){return console.error("Error processing string:",r),o}};function R(o){return A(o.replace(new RegExp(`[${Object.keys(x).join("")}]`,"g"),(r)=>x[r]))}function h(o){return o.cssText.split("{")[1].split("}")[0]}function S(o){return o.charAt(0).toUpperCase()+o.slice(1)}function T(o){return o.replace(/\s/g,"")}function z(o){let r=o.tagName.toLowerCase();return`${S(r)}`}function s(o){navigator.clipboard.writeText(o)}function c(o){o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()}function B(){let o=[];for(let r of document.styleSheets)try{for(let t of r.cssRules)if(t.type===CSSRule.STYLE_RULE)o.push({selector:t.selectorText,cssText:t.cssText})}catch{console.log("Stylesheet access error")}return o}function I(o){let r={...o};if(r["border-width"]==="0"||r["border-width"]===0||r["border-width"]==="0px")Object.keys(r).filter((t)=>t.startsWith("border-")).forEach((t)=>delete r[t]);return r}function L(o){let r=o.selector.split(",").map((p)=>p.replace(/^.*?(:hover|:focus)/,"$1")).join(","),t=o.cssText.match(/\{(.+)\}/),n=t?t[1].trim():"";return n?`${r} { ${n} }`:""}function E(o){return`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${o}
  `}function l(o,r){if(!r)return;c(o),g();let t=o.target;t.dataset.previousOutline=t.style.outline,t.style.outline="2px solid #ff0000"}function g(){let o=document.querySelector("[data-previous-outline]");if(o)o.style.outline=o.dataset.previousOutline||"",delete o.dataset.previousOutline}function m(o,r=1){if(!o)return"";let t="  ".repeat(r);if(o.isText)return`${t}${R(o.textContent)}`;let n=o.children.map((i)=>m(i,r+1)).filter(Boolean).join(`
`),p=o.attributes?Object.entries(o.attributes).map(([i,a])=>`${i}="${a}"`).join(" "):"";if(!n)return`${t}<${o.componentName} ${p} />`;return`${t}<${o.componentName} ${p}>${n?`
`+n+`
`+t:""}</${o.componentName}>`}var H=(o)=>o.trim(),U=(o)=>o.replace(/!important/g,""),_=(o)=>o!=="";var j=[":hover",":active",":focus",":visited"];function k(o){return j.some((r)=>o.includes(r))}function N(o,r){let t=[],n=[];return o.forEach((p)=>{let i=r.matches(p.selector),a=k(p.selector);if(i&&a)n.push(p);else if(i)t.push(p)}),{relevantCSS:t,pseudoRules:n}}function oo(o){let r=o.map(h).join(`
`);return Array.from(new Set(r.split(";"))).map(H).map(U).filter(_).reduce((t,n)=>{let[p,i]=n.split(":");return t[p]=i,t},{})}function ro(o,r){return`
    ${o.length>0?"/*** from CSS rules ***/":""}
    
    ${o.map(([t,n])=>`  ${b(t)}: ${n};`).join(`
`)}

    ${r.length>0?"/*** alt states ***/":""}

    ${r.map((t)=>L(t)).join(`
`)}
  `}function d(o,r){let{relevantCSS:t,pseudoRules:n}=N(r,o),p=oo(t),i=Object.entries(I(p));return ro(i,n)}function q(o,r,t){let n=d(o,t),p=o.tagName.toLowerCase(),a=`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';
  ${v(r,n,p)}
  export { ${r} };
  `;s(a)}function v(o,r,t){return`const ${o} = styled.${t}\`
${r}
\`;
`}function D(o,r){let t=r.get(o)||0;return r.set(o,t+1),`${o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}_${t}`}function G(o){return Array.from(o).map(([r,{tag:t,styles:n}])=>v(r,n,t)).join("")}function Z(){let o=document.getElementById("react-component-generator-popup");if(!o)return;o.style.display="block";let r=document.getElementById("component-name-input");if(!r)return;r.focus()}function K(){let o=document.getElementById("react-component-generator-popup");if(!o)return;o.style.display="none",document.body.style.cursor="default"}function Q(){document.body.style.cursor="crosshair"}function Y(){document.body.style.cursor="default"}var f=!1,y;chrome.runtime.onMessage.addListener(function(o){if(document.readyState!=="complete")return;if(o.action==="togglePicker")if(f=!f,f)no();else V()});function to(){if(!y)y=B()}function no(){Q(),to(),w(),po(),io()}function po(){}function io(){console.log("addPickerEventListeners"),document.addEventListener("click",F,{capture:!0}),document.addEventListener("mouseover",(o)=>l?.(o,f),{capture:!0}),document.addEventListener("mouseout",g)}function ao(){console.log("removePickerEventListeners"),document.removeEventListener("click",F,{capture:!0}),document.removeEventListener("mouseover",(o)=>l(o,f)),document.removeEventListener("mouseout",g)}function V(){f=!1,Y(),ao(),g()}function F(o){c(o),V(),Z();let r=o.target,t=document.getElementById("react-component-generator-form"),n=document.getElementById("component-name-input");t.onsubmit=(p)=>{let i=document.getElementById("generated-type");p.preventDefault();let a=n.value?S(T(n.value)):`${z(r)}Component`;if(i.value==="full")yo(r,a);else if(i.value==="styled")q(r,a,y);K()}}function uo(o,r){return`
  export const ${o} = () => {
  return (
      ${m(r)}
    );
  };
`}function O(o){return o.nodeType===3}function fo(o){let r=o.textContent.trim();return r?{isText:!0,textContent:r,children:[]}:null}function go(o){return!!o.tagName}function so(o,r){let t=[],n=!1;for(let p of o)if(O(p)){let i=p.textContent.trim();if(i&&!n)t.push({isText:!0,textContent:i,children:[]}),n=!0}else{let i=r(p);if(i)t.push(i)}return t}function co(o){return Array.from(o.attributes).filter((r)=>!M.includes(r.name)).map((r)=>{if(r.name==="href")return{name:"href",value:"javascript:void(0)"};return r}).reduce((r,t)=>{return r[t.name]=t.value,r},{})}function yo(o,r){let t=new Map,n=new Map;function p(u){if(O(u))return fo(u);if(!go(u))return null;let C=D(u.tagName,n),P=d(u,y);t.set(C,{tag:u.tagName.toLowerCase(),styles:P});let W=Array.from(u.childNodes),X=so(W,p),e=co(u);return{componentName:C,children:X,textContent:"",isText:!1,viewBox:u.viewBox,attributes:e}}let i=p(o),a=`${G(t)} ${uo(r,i)}`;return xo(a)}function xo(o){let r=E(o);s(r)}
