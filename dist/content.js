var M=[String.fromCharCode(11),String.fromCharCode(12),String.fromCharCode(160),String.fromCharCode(133),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(65279),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],P={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","\xB4":"&acute;"},R=["class","data-previous-outline","id","target","rel","tabindex"],c="react-component-generator-popup";var po=`
  <style>
    #${c} {
      font-family: 'Roboto', sans-serif;
      font-size: 15px;
      position: fixed; 
      top: 20px; 
      left: 20px; 
      background-color: #fff; 
      padding: 20px;  
      z-index: 10000;
      text-align: center;
      --border-radius: 24px;
      --mainInputHeight: 35px;
      --accentPrimary: #00b4ff;
      --textPrimary: #272b3a;
      --accentPrimaryHover: #55d1ff;
      color: var(--textPrimary);
    }

    #${c} * {
      box-sizing: border-box;
    }

    #${c} #e2-logo {
      width: 60px;
    }

    #${c} h3 {
      margin: 0 0 16px;
      font-weight: normal;
      font-size: 18px;
      color: var(--textPrimary);
    }

    #${c} form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    #${c} input, #${c} select {
      background: white;
      color: var(--textPrimary);
      padding: 10px 16px;
      font-size: 16px;
      border: 1px solid #333;
      border-radius: var(--border-radius);
      min-width: 280px;
      width: calc(100% - 16px);
    }

    .select-wrapper {
      width: calc(100% - 16px);
      min-width: 280px;
      background-color: white;
      border-radius: var(--border-radius);
    }

    #${c} select {
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
      background-position: calc(100% - 0.75rem) center !important;
      -moz-appearance:none !important;
      -webkit-appearance: none !important; 
      appearance: none !important;
      padding-right: 2rem !important;
      color: var(--textPrimary);
      width: 100%;
    }

    #${c} button {
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      line-height: normal;
      overflow: visible;
      cursor: pointer;
      background-color: var(--accentPrimary);
      color: white;
      padding: 0.2rem 1rem;
      height: var(--mainInputHeight);
      width: auto;
      border-radius: 3px;
      border: 0;
      transition: 0.1s;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    #${c} button:hover {
      background-color: var(--accentPrimaryHover);
      color: white;
    }

    hr {
      margin: 16px 0;
    }
    
    #full-page-html {
      margin-top: 16px;  
    }
  </style>
`,co=`
  <div id="${c}" style="display:none;">
    <svg id="e2-logo" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.36 62.36"><defs><style>.cls-1{fill:none;}.cls-2{fill:#131631;}.cls-3{fill:#9ccff3;}.cls-4{fill:#00b4ff;}</style></defs><title>e2-logo-blueDark-RGB</title><rect class="cls-1" x="1.42" y="1.42" width="59.53" height="59.53"></rect><path class="cls-2" d="M34.91,31.21a3.91,3.91,0,1,1-3.9-3.9V1.93A29.29,29.29,0,1,0,60.29,31.21Z"></path><path class="cls-3" d="M31,1.93H60.29V31.21A29.28,29.28,0,0,0,31,1.93Z"></path><path class="cls-4" d="M31,1.93V27.31a3.91,3.91,0,0,1,3.9,3.9H60.29A29.28,29.28,0,0,0,31,1.93Z"></path></svg>
    <h3>Copy Component</h3>
    <form id="react-component-generator-form">
      <input type="text" id="component-name-input" placeholder="Component Name" />
      <div class="select-wrapper">
        <select id="generated-type">
          <option value="vanilla">Vanilla Component</option>
          <option value="full">React Component</option>
          <option value="styled">Styled Component</option>
        </select>
      </div>
      <button type="submit">Generate Component</button>
    </form>
    <hr />
    <h3>Get Full Page HTML for DXS</h3>
    <button type="button" id="full-page-html">Get HTML</button>
  </div>
`;function mo(){return`${po}${co}`}function L(){document.body.insertAdjacentHTML("beforeend",mo())}var b=(o)=>o.trim(),I=(o)=>o.replace(/!important/g,""),B=(o)=>o!=="",l=(o)=>o.charAt(0).toUpperCase()+o.slice(1),A=(o)=>o.replace(/\s/g,""),v=(o)=>o.replace(/[A-Z]/g,(t)=>`-${t.toLowerCase()}`),z=(o)=>o.replace(/-([a-z])/g,(t,n)=>n.toUpperCase()),D=(o)=>{if(typeof o!=="string")return o;try{let t=new RegExp(`[${M.join("")}\u2000-\u200B]`,"g");return o.replace(t,"")}catch(t){return console.error("Error processing string:",t),o}},_=(o)=>{let t=0;return[...o].filter((r)=>{if(r==="(")return t++,!0;else if(r===")"){if(t>0)return t--,!0;return!1}return!0}).join("")};function uo(o,t){let r=getComputedStyle(document.documentElement).getPropertyValue(o.trim());if(r)return r.trim();return t??null}function U(o){let[t,n]=o;while(n.includes("var(")){let i=n.indexOf("var("),m=n.indexOf(")",i),s=n.slice(i+4,m),[p,f]=s.includes(",")?s.split(",").map((S)=>S.trim()):[s.trim(),void 0],g=uo(p,f);if(g===null)return console.error(`CSS variable ${p} could not be resolved.`),o;n=n.slice(0,i)+g+n.slice(m+1)}let r=n.replace(/^\s+|\s+$/g,""),e=_(r);return[t,e]}function k(o){let t=getComputedStyle(o),n=["margin","padding","color","background-color","font-size","font-family","font-weight","line-height","border","border-radius","display","flex-direction","justify-content","align-items","position","top","right","bottom","left","z-index","flex","grid","transform"],r=n.map((e)=>t.getPropertyValue(e)).filter((e)=>{return e!==""&&e!=="initial"});return`
    /* css file not accessible, using computed styles instead */
    ${n.map((e,i)=>`${e}: ${r[i]};`).join("\n")}
  `}var fo=[":hover",":active",":focus",":visited"];function lo(o){return fo.some((t)=>o.includes(t))}function go(o,t){let n=[],r=[];return o.forEach((e)=>{let i=t.matches(e.selector),m=lo(e.selector);if(i&&m)r.push(e);else if(i)n.push(e)}),{relevantCSS:n,pseudoRules:r}}function Co(o){let t=o.map(q).join("\n");return Array.from(new Set(t.split(";"))).map(b).map(I).filter(B).reduce((n,r)=>{let[e,i]=r.split(":");return n[e]=i,n},{})}function ao(o,t){let n=o?.map(([e,i])=>`  ${v(e)}: ${i};`).join("\n")||"",r=[...new Set(t?.map((e)=>F(e)))].join("\n")||"";return`
    ${n}
  
    ${r}
  `}var T=(o)=>o.map(U);function C(o,t){if(t.length===0)return k(o);let{relevantCSS:n,pseudoRules:r}=go(t,o),e=Z(Co(n)),i=T(Object.entries(e));return ao(i,r)}function G(){let o=[];for(let t of document.styleSheets)try{for(let n of t.cssRules)if(n instanceof CSSStyleRule)o.push({selector:n.selectorText,cssText:n.cssText})}catch{return console.warn("! -------- Stylesheet access error -------- !"),[]}return o}function w(o){return o.nodeType===3}function Q(o){return!!o.tagName}function Y(o){return Array.from(o.attributes).filter((t)=>t.value).filter((t)=>!R.includes(t.name)).map((t)=>{if(t.name==="href")return{name:"href",value:"javascript:void(0)"};return t}).reduce((t,n)=>{return t[n.name]=n.value,t},{})}function a(o){if(o==="IMG")return"Image";if(o==="A")return"Anchor";if(o==="P")return"Text";if(o==="H1")return"Heading";if(o==="H2")return"Subheading";if(o==="H3")return"Subheading3";if(o==="H4")return"Subheading4";if(o==="H5")return"Subheading5";if(o==="H6")return"Subheading6";if(o==="UL")return"UnorderedList";if(o==="OL")return"OrderedList";if(o==="LI")return"ListItem";if(o==="DIV")return"Box";if(o==="NAV")return"Navigation";if(o==="g")return"Group";let t=o.toLowerCase(),n=z(t);return l(n)}function K(o){if(o.includes("-"))return"div";return o}function O(o){return D(o.replace(new RegExp(`[${Object.keys(P).join("")}]`,"g"),(t)=>P[t]))}function q(o){return o.cssText.split("{")[1].split("}")[0]}function J(o){return a(o.tagName)}function u(o){navigator.clipboard.writeText(o)}function x(o){o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()}function Z(o){let t={...o};if(t["border-width"]==="0"||t["border-width"]===0||t["border-width"]==="0px")Object.keys(t).filter((n)=>n.startsWith("border-")).forEach((n)=>delete t[n]);return t}function F(o){let t=o.selector.split(",").map((p)=>p.replace(/^.*?(:hover|:focus)/,"$1")),r=[...new Set(t)].join(","),e=o.cssText.match(/\{(.+)\}/),i=e?e[1].trim():"",m=i.split(";").map((p)=>p.trim()).map((p)=>p.split(":")).map((p)=>p.map((f)=>f.trim())).filter((p)=>p[0]!==""),s=T(m).map((p)=>p.join(": ")).join(";\n");return i?`${r} { ${s}; }`:""}function W(o){return`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${o}
  `}function X(o,t=1){if(!o)return"";let n="  ".repeat(t);if(o.isText)return`${n}${O(o.textContent)}`;let r=o.children.map((i)=>X(i,t+1)).filter(Boolean).join("\n"),e=o.attributes?Object.entries(o.attributes).map(([i,m])=>`${i}="${m}"`).join(" "):"";if(!r)return`${n}<${o.componentName} ${e} />`;return`${n}<${o.componentName} ${e}>${r?"\n"+r+"\n"+n:""}</${o.componentName}>`}function j(o,t){return`
    export const ${o} = () => {
      return (
        ${X(t)}
      );
    };
  `}function E(o){x(o),d();let t=o.target;t.dataset.previousOutline=t.style.outline,t.style.outline="2px solid #ff0000"}function d(){let o=document.querySelector("[data-previous-outline]");if(o)o.style.outline=o.dataset.previousOutline||"",delete o.dataset.previousOutline}function V(o,t,n){let r=C(o,n),e=o.tagName.toLowerCase(),m=`
    /* eslint-disable import/no-unresolved */
    import styled from 'styled-components';
    ${N(t,r,e)}
    export { ${t} };
  `;u(m)}function N(o,t,n){return`
    const ${o} = styled.${K(n)}\`
      ${t}
    \`;
  `}function oo(o,t){let n=a(o),r=t.get(n)||0;if(t.set(n,r+1),r===0)return n;return`${n}_${r}`}function to(o){return Array.from(o).map(([t,{tag:n,styles:r}])=>N(t,r,n)).join("")}function no(){document.body.style.cursor="crosshair"}function h(){document.body.style.cursor="default"}function eo(){let o=document.getElementById(c);if(!o)return;o.style.display="block";let t=document.getElementById("component-name-input");if(!t)return;t.focus()}function $(){let o=document.getElementById(c);if(!o)return;o.style.display="none",h()}function ro(o){function t(n){let r=getComputedStyle(n),e="";for(let i=0;i<r.length;i++){let m=r[i],s=r.getPropertyValue(m);e+=`${m}:${s};`}n.setAttribute("style",e);for(let i of n.children)t(i)}return t(o),o.outerHTML}var H=!1,y;chrome.runtime.onMessage.addListener(function(o){if(document.readyState!=="complete")return;if(o.action==="togglePicker")ho()});function xo(){if(!y)y=G()}function ho(){if(H)return;if(H=!0,no(),xo(),!document.getElementById(c))L(),yo()}function yo(){document.addEventListener("click",io,{capture:!0}),document.addEventListener("mouseover",E,{capture:!0}),document.addEventListener("mouseout",d)}function So(){document.removeEventListener("click",io,{capture:!0}),document.removeEventListener("mouseover",E,{capture:!0}),document.removeEventListener("mouseout",d)}function Po(){H=!1,h(),So(),d()}function vo(o){return l(A(o))}function To(o,t){if(o)return vo(o);return`${J(t)}Component`}function io(o){x(o),Po(),eo();let t=o.target,n=document.getElementById("react-component-generator-form");n.onsubmit=(e)=>{e.preventDefault();let i=document.getElementById("generated-type"),m=document.getElementById("component-name-input"),s=To(m.value,t);if(i.value==="full")$o(t,s);else if(i.value==="styled")V(t,s,y);else if(i.value==="vanilla"){let p=ro(t);u(p)}$()};let r=document.getElementById("full-page-html");r.onclick=()=>{let e=document.getElementById(c);if(e)e.remove();let i=document.documentElement.outerHTML;u(i),$()}}function wo(o){let t=o.textContent.trim();return t?{isText:!0,textContent:t,children:[]}:null}function Eo(o,t){let n=[],r=!1;for(let e of o)if(w(e)){let i=e.textContent.trim();if(i&&!r)n.push({isText:!0,textContent:i,children:[]}),r=!0}else{let i=t(e);if(i)n.push(i)}return n}function $o(o,t){let n=new Map,r=new Map;function e(s){if(w(s))return wo(s);if(!Q(s))return null;let p=oo(s.tagName,r),f=C(s,y);n.set(p,{tag:s.tagName.toLowerCase(),styles:f});let g=Array.from(s.childNodes),S=Eo(g,e),so=Y(s);return{componentName:p,children:S,textContent:"",isText:!1,viewBox:s.viewBox,attributes:so}}let i=e(o),m=`
    ${to(n)}
    ${j(t,i)}
  `;return Ho(m)}function Ho(o){let t=W(o);u(t)}
