function e(){return`
<style>
  #react-component-generator-popup {
    font-family: sans-serif;
    font-size: 16px;
    position: fixed; 
    top: 20px; 
    left: 20px; 
    background: white; 
    padding: 20px; 
    border: 1px solid #ccc; 
    z-index: 10000;
    text-align: center;
  }

  #react-component-generator-popup h3 {
    margin: 0 0 16px;
    color: black;
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
    color: black;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-width: 280px;
  }

  #react-component-generator-popup select {
    background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
    background-position: calc(100% - 0.75rem) center !important;
    -moz-appearance:none !important;
    -webkit-appearance: none !important; 
    appearance: none !important;
    padding-right: 2rem !important;
  }

  #react-component-generator-popup button {
    padding: 8px 16px;
    font-size: 16px;
    border: 1px solid grey;
    border-radius: 4px;
    background-color: white;
    color: black;
    cursor: pointer;
  }
</style>

<div id="react-component-generator-popup" style="display:none;">
  <h3>Customize Component</h3>
  <form id="react-component-generator-form">
    <input type="text" id="component-name-input" placeholder="Enter Component Name" />
    <select id="generated-type">
      <option value="full">Full Component</option>
      <option value="styled">Only Styled Components</option>
    </select>
    <button type="submit">Generate Component</button>
  </form>
</div>
`}function b(){document.body.insertAdjacentHTML("beforeend",e())}var F=["margin","padding","color","background-color","font-size","font-family","font-weight","line-height","border","border-radius","display","flex-direction","justify-content","align-items","position","top","right","bottom","left","z-index","flex","grid","transform"],T=[String.fromCharCode(11),String.fromCharCode(12),String.fromCharCode(160),String.fromCharCode(133),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(65279),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],H={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","\xB4":"&acute;"},V=["class","style","data-previous-outline","id","target","rel","tabindex"];function I(o){return o.replace(/[A-Z]/g,(f)=>`-${f.toLowerCase()}`)}function D(o,f){return Object.entries({...o,...f}).map(([g,n])=>{return`  ${I(g)}: ${n};`}).join("\n\t").replace(";;",";")}var oo=(o)=>{if(typeof o!=="string")return o;try{let f=new RegExp(`[${T.join("")}\u2000-\u200B]`,"g");return o.replace(f,"")}catch(f){return console.error("Error processing string:",f),o}};function X(o){return oo(o.replace(new RegExp(`[${Object.keys(H).join("")}]`,"g"),(f)=>H[f]))}function J(o){return o.cssText.split("{")[1].split("}")[0]}function K(o){return o.charAt(0).toUpperCase()+o.slice(1)}function O(o){return o.replace(/\s/g,"")}function E(o){let f=o.tagName.toLowerCase();return`${K(f)}`}function r(o){navigator.clipboard.writeText(o)}function B(o){o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()}function W(){let o=[];for(let f of document.styleSheets)try{for(let g of f.cssRules)if(g.type===CSSRule.STYLE_RULE)o.push({selector:g.selectorText,cssText:g.cssText})}catch{console.log("Stylesheet access error")}return o}function Z(o){return o==="0px"||o==="0"}function a(o){if(Z(o))return!0;let f=o.split(" ")[0];if(Z(f))return!0}function A(o){let f={...o};if(f["border-width"]==="0"||f["border-width"]===0||f["border-width"]==="0px")Object.keys(f).filter((g)=>g.startsWith("border-")).forEach((g)=>delete f[g]);return f}function P(o){let f=o.selector.split(",").map((x)=>x.replace(/^.*?(:hover|:focus)/,"$1")).join(","),g=o.cssText.match(/\{(.+)\}/),n=g?g[1].trim():"";return n?`${f} { ${n} }`:""}function j(o){return`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${o}
  `}function Q(o,f){if(!f)return;B(o),M();let g=o.target;g.dataset.previousOutline=g.style.outline,g.style.outline="2px solid #ff0000"}function M(){let o=document.querySelector("[data-previous-outline]");if(o)o.style.outline=o.dataset.previousOutline||"",delete o.dataset.previousOutline}function Y(o,f=1){if(!o)return"";let g="  ".repeat(f);if(o.isText)return`${g}${X(o.textContent)}`;let n=o.children.map((i)=>Y(i,f+1)).filter(Boolean).join("\n"),x=o.attributes?Object.entries(o.attributes).map(([i,z])=>`${i}="${z}"`).join(" "):"";if(!n)return`${g}<${o.componentName} ${x} />`;return`${g}<${o.componentName} ${x}>${n?"\n"+n+"\n"+g:""}</${o.componentName}>`}function fo(){let o=document.createElement("iframe");return o.style.display="none",document.body.appendChild(o),o}function go(o,f){let g=o.contentDocument;if(!g)return null;let n=g.createElement(f);return g.body.appendChild(n),n}function no(o,f){let g=fo(),n=go(g,o);if(!n)return document.body.removeChild(g),"";let x=n.style[f];if(x)return document.body.removeChild(g),`${x}`;let i=g.contentWindow?.getComputedStyle(n)[f];return document.body.removeChild(g),`${i}`}function G(o,f){let g=getComputedStyle(o),n={};F.forEach((p)=>{let y=g.getPropertyValue(p),$=no(o.tagName,p);if(p.includes("border")&&a(y))return;if(y&&y!==$&&!["none","normal","0px","auto"].includes(y))n[p]=y});let x="",i=[":hover",":active",":focus",":visited"],z=[],w=f.filter((p)=>{let y=o.matches(p.selector),$=i.some((_)=>p.selector.includes(_));if(y&&$)return z.push(p),!1;return y});if(w.length)w.forEach((p)=>{x+=`\n${J(p)}`});let d=Array.from(new Set(x.split(";"))).map((p)=>p.trim()).map((p)=>p.replace(" !important","")).filter((p)=>p!=="").reduce((p,y)=>{let[$,_]=y.split(":");return p[$]=_,p},{}),L=Object.entries(A(d));return`  /*** from getComputedStyle ***/

    ${D(n)}

    ${L.length>0?"/*** from CSS rules ***/":""}
    
    ${L.map(([p,y])=>`  ${I(p)}: ${y};`).join("\n")}

    ${z.length>0?"/*** alt states ***/":""}

    ${z.map(P).join("\n")}
  `}function S(o,f,g){let n=G(o,g),x=o.tagName.toLowerCase(),z=`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';
  ${u(f,n,x)}
  export { ${f} };
  `;r(z)}function u(o,f,g){return`const ${o} = styled.${g}\`\n${f}\n\`;\n`}function k(o,f){let g=f.get(o)||0;return f.set(o,g+1),`${o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}_${g}`}function R(o){return Array.from(o).map(([f,{tag:g,styles:n}])=>u(f,n,g)).join("")}function h(){let o=document.getElementById("react-component-generator-popup");if(!o)return;o.style.display="block";let f=document.getElementById("component-name-input");if(!f)return;f.focus()}function t(){let o=document.getElementById("react-component-generator-popup");if(!o)return;o.style.display="none",document.body.style.cursor="default"}function N(){document.body.style.cursor="crosshair"}function c(){document.body.style.cursor="default"}var C=!1,q,m,U;chrome.runtime.onMessage.addListener(function(o){if(o.action==="togglePicker")if(C=!C,C)po();else v()});function po(){N(),b(),xo(),io()}function xo(){q=document.getElementById("component-name-input"),m=document.getElementById("react-component-generator-form")}function io(){document.addEventListener("click",s,{capture:!0}),document.addEventListener("mouseover",(o)=>Q?.(o,C),{capture:!0}),document.addEventListener("mouseout",M)}function yo(){document.removeEventListener("click",s),document.removeEventListener("mouseover",(o)=>Q(o,C)),document.removeEventListener("mouseout",M)}function v(){C=!1,c(),yo(),M()}function s(o){if(!C)return;if(B(o),!U)U=W();C=!1;let f=o.target;h(),m.onsubmit=(g)=>{let n=document.getElementById("generated-type");g.preventDefault();let x=q.value?K(O(q.value)):`${E(f)}Component`;if(n.value==="full")Lo(f,x);else if(n.value==="styled")S(f,x,U);t()}}function wo(o,f){return`\nexport const ${o} = () => {\n  return (\n${Y(f)}\n  );\n};\n`}function l(o){return o.nodeType===3}function zo(o){let f=o.textContent.trim();return f?{isText:!0,textContent:f,children:[]}:null}function Co(o){return!!o.tagName}function $o(o,f){let g=[],n=!1;for(let x of o)if(l(x)){let i=x.textContent.trim();if(i&&!n)g.push({isText:!0,textContent:i,children:[]}),n=!0}else{let i=f(x);if(i)g.push(i)}return g}function Mo(o){return Array.from(o.attributes).filter((f)=>!V.includes(f.name)).map((f)=>{if(f.name==="href")return{name:"href",value:"javascript:void(0)"};return f}).reduce((f,g)=>{return f[g.name]=g.value,f},{})}function Lo(o,f){let g=new Map,n=new Map;function x(w){if(l(w))return zo(w);if(!Co(w))return null;let d=k(w.tagName,n),L=G(w,U);g.set(d,{tag:w.tagName.toLowerCase(),styles:L});let p=Array.from(w.childNodes),y=$o(p,x),$=Mo(w);return{componentName:d,children:y,textContent:"",isText:!1,viewBox:w.viewBox,attributes:$}}let i=x(o),z=R(g);return z+=wo(f,i),ro(z)}function ro(o){let f=j(o);r(f),v()}
