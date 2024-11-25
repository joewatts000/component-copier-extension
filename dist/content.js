var R=[String.fromCharCode(11),String.fromCharCode(12),String.fromCharCode(160),String.fromCharCode(133),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(65279),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],T={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","\xB4":"&acute;"},M=["class","style","data-previous-outline","id","target","rel","tabindex"],c="react-component-generator-popup";var io=`
  <style>
    #${c} {
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

    #${c} h3 {
      margin: 0 0 16px;
      font-weight: normal;
      color: white;
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

    #${c} select {
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
      background-position: calc(100% - 0.75rem) center !important;
      -moz-appearance:none !important;
      -webkit-appearance: none !important; 
      appearance: none !important;
      padding-right: 2rem !important;
      color: #333;
    }

    #${c} button {
      padding: 8px 16px;
      font-size: 16px;
      border-radius: var(--border-radius);
      border: 1px solid #333;
      background-color: white;
      color: #333;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    #${c} button:hover {
      background-color: #333;
      color: white;
      border-color: white;
    }
  </style>
`,so=`
  <div id="${c}" style="display:none;">
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
`;function po(){return`${io}${so}`}function L(){document.body.insertAdjacentHTML("beforeend",po())}var H=(o)=>o.trim(),I=(o)=>o.replace(/!important/g,""),b=(o)=>o!=="",m=(o)=>o.charAt(0).toUpperCase()+o.slice(1),z=(o)=>o.replace(/\s/g,""),v=(o)=>o.replace(/[A-Z]/g,(t)=>`-${t.toLowerCase()}`),A=(o)=>o.replace(/-([a-z])/g,(t,e)=>e.toUpperCase()),B=(o)=>{if(typeof o!=="string")return o;try{let t=new RegExp(`[${R.join("")}\u2000-\u200B]`,"g");return o.replace(t,"")}catch(t){return console.error("Error processing string:",t),o}},D=(o)=>{let t=0;return[...o].filter((n)=>{if(n==="(")return t++,!0;else if(n===")"){if(t>0)return t--,!0;return!1}return!0}).join("")};function co(o,t){let n=getComputedStyle(document.documentElement).getPropertyValue(o.trim());if(n)return n.trim();return t??null}function _(o){let[t,e]=o;while(e.includes("var(")){let i=e.indexOf("var("),s=e.indexOf(")",i),p=e.slice(i+4,s),[u,h]=p.includes(",")?p.split(",").map((a)=>a.trim()):[p.trim(),void 0],l=co(u,h);if(l===null)return console.error(`CSS variable ${u} could not be resolved.`),o;e=e.slice(0,i)+l+e.slice(s+1)}let n=e.replace(/^\s+|\s+$/g,""),r=D(n);return[t,r]}var uo=[":hover",":active",":focus",":visited"];function mo(o){return uo.some((t)=>o.includes(t))}function fo(o,t){let e=[],n=[];return o.forEach((r)=>{let i=t.matches(r.selector),s=mo(r.selector);if(i&&s)n.push(r);else if(i)e.push(r)}),{relevantCSS:e,pseudoRules:n}}function lo(o){let t=o.map(q).join("\n");return Array.from(new Set(t.split(";"))).map(H).map(I).filter(b).reduce((e,n)=>{let[r,i]=n.split(":");return e[r]=i,e},{})}function Co(o,t){let e=o?.map(([r,i])=>`  ${v(r)}: ${i};`).join("\n")||"",n=t?.map((r)=>F(r)).join("\n")||"";return`
    ${e}
  
    ${n}
  `}var E=(o)=>o.map(_);function d(o,t){let{relevantCSS:e,pseudoRules:n}=fo(t,o),r=k(lo(e)),i=E(Object.entries(r));return Co(i,n)}function U(){let o=[];for(let t of document.styleSheets)try{for(let e of t.cssRules)if(e instanceof CSSStyleRule)o.push({selector:e.selectorText,cssText:e.cssText})}catch{console.warn("Stylesheet access error")}return o}function P(o){return o.nodeType===3}function G(o){return!!o.tagName}function O(o){return Array.from(o.attributes).filter((t)=>!M.includes(t.name)).map((t)=>{if(t.name==="href")return{name:"href",value:"javascript:void(0)"};return t}).reduce((t,e)=>{return t[e.name]=e.value,t},{})}function C(o){if(o==="IMG")return"Image";if(o==="A")return"Anchor";if(o==="P")return"Text";if(o==="H1")return"Heading";if(o==="H2")return"Subheading";if(o==="H3")return"Subheading3";if(o==="H4")return"Subheading4";if(o==="H5")return"Subheading5";if(o==="H6")return"Subheading6";if(o==="UL")return"UnorderedList";if(o==="OL")return"OrderedList";if(o==="LI")return"ListItem";if(o==="DIV")return"Box";if(o==="NAV")return"Navigation";let t=o.toLowerCase(),e=A(t);return m(e)}function Q(o){if(o.includes("-"))return"div";return o}function Y(o){return B(o.replace(new RegExp(`[${Object.keys(T).join("")}]`,"g"),(t)=>T[t]))}function q(o){return o.cssText.split("{")[1].split("}")[0]}function Z(o){return C(o.tagName)}function g(o){navigator.clipboard.writeText(o)}function S(o){o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()}function k(o){let t={...o};if(t["border-width"]==="0"||t["border-width"]===0||t["border-width"]==="0px")Object.keys(t).filter((e)=>e.startsWith("border-")).forEach((e)=>delete t[e]);return t}function F(o){let t=o.selector.split(",").map((s)=>s.replace(/^.*?(:hover|:focus)/,"$1")).join(","),e=o.cssText.match(/\{(.+)\}/),n=e?e[1].trim():"",r=n.split(";").map((s)=>s.trim()).map((s)=>s.split(":")).map((s)=>s.map((p)=>p.trim())).filter((s)=>s[0]!==""),i=E(r).map((s)=>s.join(": ")).join(";\n");return n?`${t} { ${i}; }`:""}function K(o){return`/* eslint-disable import/no-unresolved */
  import styled from 'styled-components';

  ${o}
  `}function J(o,t=1){if(!o)return"";let e="  ".repeat(t);if(o.isText)return`${e}${Y(o.textContent)}`;let n=o.children.map((i)=>J(i,t+1)).filter(Boolean).join("\n"),r=o.attributes?Object.entries(o.attributes).map(([i,s])=>`${i}="${s}"`).join(" "):"";if(!n)return`${e}<${o.componentName} ${r} />`;return`${e}<${o.componentName} ${r}>${n?"\n"+n+"\n"+e:""}</${o.componentName}>`}function W(o,t){return`
    export const ${o} = () => {
      return (
        ${J(t)}
      );
    };
  `}function $(o){S(o),f();let t=o.target;t.dataset.previousOutline=t.style.outline,t.style.outline="2px solid #ff0000"}function f(){let o=document.querySelector("[data-previous-outline]");if(o)o.style.outline=o.dataset.previousOutline||"",delete o.dataset.previousOutline}function X(o,t,e){let n=d(o,e),r=o.tagName.toLowerCase(),s=`
    /* eslint-disable import/no-unresolved */
    import styled from 'styled-components';
    ${j(t,n,r)}
    export { ${t} };
  `;g(s)}function j(o,t,e){return`
    const ${o} = styled.${Q(e)}\`
      ${t}
    \`;
  `}function V(o,t){let e=C(o),n=t.get(e)||0;if(t.set(e,n+1),n===0)return e;return`${e}_${n}`}function N(o){return Array.from(o).map(([t,{tag:e,styles:n}])=>j(t,n,e)).join("")}function oo(){document.body.style.cursor="crosshair"}function x(){document.body.style.cursor="default"}function to(){let o=document.getElementById(c);if(!o)return;o.style.display="block";let t=document.getElementById("component-name-input");if(!t)return;t.focus()}function eo(){let o=document.getElementById(c);if(!o)return;o.style.display="none",x()}var w=!1,y;chrome.runtime.onMessage.addListener(function(o){if(document.readyState!=="complete")return;if(o.action==="togglePicker")So()});function go(){if(!y)y=U()}function So(){if(w)return;w=!0,oo(),go(),L(),xo()}function xo(){document.addEventListener("click",no,{capture:!0}),document.addEventListener("mouseover",$,{capture:!0}),document.addEventListener("mouseout",f)}function yo(){document.removeEventListener("click",no,{capture:!0}),document.removeEventListener("mouseover",$,{capture:!0}),document.removeEventListener("mouseout",f)}function ho(){w=!1,x(),yo(),f()}function ao(o){return m(z(o))}function To(o,t){if(o)return ao(o);return`${Z(t)}Component`}function no(o){S(o),ho(),to();let t=o.target,e=document.getElementById("react-component-generator-form");e.onsubmit=(n)=>{n.preventDefault();let r=document.getElementById("generated-type"),i=document.getElementById("component-name-input"),s=To(i.value,t);if(r.value==="full")Po(t,s);else if(r.value==="styled")X(t,s,y);eo()}}function vo(o){let t=o.textContent.trim();return t?{isText:!0,textContent:t,children:[]}:null}function Eo(o,t){let e=[],n=!1;for(let r of o)if(P(r)){let i=r.textContent.trim();if(i&&!n)e.push({isText:!0,textContent:i,children:[]}),n=!0}else{let i=t(r);if(i)e.push(i)}return e}function Po(o,t){let e=new Map,n=new Map;function r(p){if(P(p))return vo(p);if(!G(p))return null;let u=V(p.tagName,n),h=d(p,y);e.set(u,{tag:p.tagName.toLowerCase(),styles:h});let l=Array.from(p.childNodes),a=Eo(l,r),ro=O(p);return{componentName:u,children:a,textContent:"",isText:!1,viewBox:p.viewBox,attributes:ro}}let i=r(o),s=`
    ${N(e)}
    ${W(t,i)}
  `;return $o(s)}function $o(o){let t=K(o);g(t)}
