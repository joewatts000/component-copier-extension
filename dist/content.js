function e(){return`
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
`}function $(){document.body.insertAdjacentHTML("beforeend",e())}var M=[String.fromCharCode(11),String.fromCharCode(12),String.fromCharCode(160),String.fromCharCode(133),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(65279),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],x={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","\xB4":"&acute;"},b=["class","style","data-previous-outline","id","target","rel","tabindex"];function R(o){return o.replace(/[A-Z]/g,(r)=>`-${r.toLowerCase()}`)}var k=(o)=>{if(typeof o!=="string")return o;try{let r=new RegExp(`[${M.join("")}\u2000-\u200B]`,"g");return o.replace(r,"")}catch(r){return console.error("Error processing string:",r),o}};function h(o){return k(o.replace(new RegExp(`[${Object.keys(x).join("")}]`,"g"),(r)=>x[r]))}function T(o){return o.cssText.split("{")[1].split("}")[0]}function S(o){return o.charAt(0).toUpperCase()+o.slice(1)}function z(o){return o.replace(/\s/g,"")}function B(o){let r=o.tagName.toLowerCase();return`${S(r)}`}function s(o){navigator.clipboard.writeText(o)}function d(o){o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()}function L(){let o=[];for(let r of document.styleSheets)try{for(let t of r.cssRules)if(t.type===CSSRule.STYLE_RULE)o.push({selector:t.selectorText,cssText:t.cssText})}catch{console.log("Stylesheet access error")}return o}function I(o){let r={...o};if(r["border-width"]==="0"||r["border-width"]===0||r["border-width"]==="0px")Object.keys(r).filter((t)=>t.startsWith("border-")).forEach((t)=>delete r[t]);return r}function H(o){let r=o.selector.split(",").map((p)=>p.replace(/^.*?(:hover|:focus)/,"$1")).join(","),t=o.cssText.match(/\{(.+)\}/),n=t?t[1].trim():"";return n?`${r} { ${n} }`:""}function E(o){return`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${o}
  `}function l(o,r){if(!r)return;d(o),g();let t=o.target;t.dataset.previousOutline=t.style.outline,t.style.outline="2px solid #ff0000"}function g(){let o=document.querySelector("[data-previous-outline]");if(o)o.style.outline=o.dataset.previousOutline||"",delete o.dataset.previousOutline}function m(o,r=1){if(!o)return"";let t="  ".repeat(r);if(o.isText)return`${t}${h(o.textContent)}`;let n=o.children.map((i)=>m(i,r+1)).filter(Boolean).join("\n"),p=o.attributes?Object.entries(o.attributes).map(([i,u])=>`${i}="${u}"`).join(" "):"";if(!n)return`${t}<${o.componentName} ${p} />`;return`${t}<${o.componentName} ${p}>${n?"\n"+n+"\n"+t:""}</${o.componentName}>`}var U=(o)=>o.trim(),_=(o)=>o.replace(/!important/g,""),q=(o)=>o!=="";var N=[":hover",":active",":focus",":visited"];function oo(o){return N.some((r)=>o.includes(r))}function ro(o,r){let t=[],n=[];return o.forEach((p)=>{let i=r.matches(p.selector),u=oo(p.selector);if(i&&u)n.push(p);else if(i)t.push(p)}),{relevantCSS:t,pseudoRules:n}}function to(o){let r=o.map(T).join("\n");return Array.from(new Set(r.split(";"))).map(U).map(_).filter(q).reduce((t,n)=>{let[p,i]=n.split(":");return t[p]=i,t},{})}function no(o,r){return`
    ${o.length>0?"/*** from CSS rules ***/":""}
    
    ${o.map(([t,n])=>`  ${R(t)}: ${n};`).join("\n")}

    ${r.length>0?"/*** alt states ***/":""}

    ${r.map((t)=>H(t)).join("\n")}
  `}function y(o,r){let{relevantCSS:t,pseudoRules:n}=ro(r,o),p=to(t),i=Object.entries(I(p));return no(i,n)}function D(o,r,t){let n=y(o,t),p=o.tagName.toLowerCase(),u=`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';
  ${G(r,n,p)}
  export { ${r} };
  `;s(u)}function G(o,r,t){return`const ${o} = styled.${t}\`\n${r}\n\`;\n`}function Z(o,r){let t=r.get(o)||0;return r.set(o,t+1),`${o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}_${t}`}function K(o){return Array.from(o).map(([r,{tag:t,styles:n}])=>G(r,n,t)).join("")}function Q(){let o=document.getElementById("react-component-generator-popup");if(!o)return;o.style.display="block";let r=document.getElementById("component-name-input");if(!r)return;r.focus()}function Y(){let o=document.getElementById("react-component-generator-popup");if(!o)return;o.style.display="none",document.body.style.cursor="default"}function v(){document.body.style.cursor="crosshair"}function P(){document.body.style.cursor="default"}var f=!1,C,V,c;chrome.runtime.onMessage.addListener(function(o){if(o.action==="togglePicker")if(f=!f,f)po();else F()});function po(){v(),$(),io(),ao()}function io(){C=document.getElementById("component-name-input"),V=document.getElementById("react-component-generator-form")}function ao(){document.addEventListener("click",O,{capture:!0}),document.addEventListener("mouseover",(o)=>l?.(o,f),{capture:!0}),document.addEventListener("mouseout",g)}function uo(){document.removeEventListener("click",O),document.removeEventListener("mouseover",(o)=>l(o,f)),document.removeEventListener("mouseout",g)}function F(){f=!1,P(),uo(),g()}function O(o){if(!f)return;if(d(o),!c)c=L();f=!1;let r=o.target;Q(),V.onsubmit=(t)=>{let n=document.getElementById("generated-type");t.preventDefault();let p=C.value?S(z(C.value)):`${B(r)}Component`;if(n.value==="full")xo(r,p);else if(n.value==="styled")D(r,p,c);Y()}}function fo(o,r){return`\nexport const ${o} = () => {\n  return (\n${m(r)}\n  );\n};\n`}function W(o){return o.nodeType===3}function go(o){let r=o.textContent.trim();return r?{isText:!0,textContent:r,children:[]}:null}function so(o){return!!o.tagName}function yo(o,r){let t=[],n=!1;for(let p of o)if(W(p)){let i=p.textContent.trim();if(i&&!n)t.push({isText:!0,textContent:i,children:[]}),n=!0}else{let i=r(p);if(i)t.push(i)}return t}function co(o){return Array.from(o.attributes).filter((r)=>!b.includes(r.name)).map((r)=>{if(r.name==="href")return{name:"href",value:"javascript:void(0)"};return r}).reduce((r,t)=>{return r[t.name]=t.value,r},{})}function xo(o,r){let t=new Map,n=new Map;function p(a){if(W(a))return go(a);if(!so(a))return null;let w=Z(a.tagName,n),X=y(a,c);t.set(w,{tag:a.tagName.toLowerCase(),styles:X});let J=Array.from(a.childNodes),j=yo(J,p),A=co(a);return{componentName:w,children:j,textContent:"",isText:!1,viewBox:a.viewBox,attributes:A}}let i=p(o),u=K(t);return u+=fo(r,i),So(u)}function So(o){let r=E(o);s(r),F()}
