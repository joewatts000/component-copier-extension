import { POPUP_ID } from './constants';

const styles = `
  <style>
    #${POPUP_ID} {
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

    #${POPUP_ID} * {
      box-sizing: border-box;
    }

    #${POPUP_ID} #e2-logo {
      width: 60px;
    }

    #${POPUP_ID} h3 {
      margin: 0 0 16px;
      font-weight: normal;
      font-size: 18px;
      color: var(--textPrimary);
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

    #${POPUP_ID} select {
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
      background-position: calc(100% - 0.75rem) center !important;
      -moz-appearance:none !important;
      -webkit-appearance: none !important; 
      appearance: none !important;
      padding-right: 2rem !important;
      color: var(--textPrimary);
      width: 100%;
    }

    #${POPUP_ID} button {
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

    #${POPUP_ID} button:hover {
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
`;

const html = `
  <div id="${POPUP_ID}" style="display:none;">
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
`;

function getPopupHtml() {
  return `${styles}${html}`;
}

export function insertPopupHtml() {
  document.body.insertAdjacentHTML('beforeend', getPopupHtml());
}
