const styles = `
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
`;

const html = `
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
`;

function getPopupHtml() {
  return `${styles}${html}`;
}

export function insertPopupHtml() {
  document.body.insertAdjacentHTML('beforeend', getPopupHtml());
}
