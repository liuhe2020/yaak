// DOM queries
const emoticonsContainer = document.querySelector(".emoticons-container");
const emoticonButton = document.querySelector(".emotion-button");
const clearButton = document.querySelector(".clear-button");
const inputField = document.querySelector(".input");

// Displaying emoticons in the DOM
const emoticonCodes = [
  128512,
  128513,
  128514,
  129315,
  128515,
  128516,
  128517,
  128518,
  128519,
  128520,
  128521,
  128522,
  128523,
  128524,
  128525,
  128526,
  128527,
  128528,
  128529,
  128530,
  128531,
  128532,
  128533,
  128534,
  128535,
  128536,
  128537,
  128538,
  128539,
  128540,
  128541,
  128542,
  128543,
  128544,
  128545,
  128546,
  128547,
  128548,
  128549,
  128550,
  128551,
  128552,
  128553,
  128554,
  128555,
  128556,
  128557,
  128558,
  129296,
  129297,
  129298,
  129299,
  129300,
  129301,
  129303,
  128559,
  129316,
  129317,
  129318,
  129319,
  129320,
  129321,
  129322,
  129323,
  129324,
  129325,
  129326,
  129327,
  128560,
  128561,
  128562,
  128563,
  128564,
  128565,
  128566,
  128567,
  128568,
  128569,
  128570,
  128571,
  128572,
  128573,
  128574,
  128575,
  128576,
  128577,
  128578,
  128579,
  128580,
  128581,
  128582,
  128583,
  128584,
  128585,
  128586,
  128587,
  128588,
  128589,
  128147,
  128148,
  128149,
  128150,
  128151,
  128152,
  128153,
  128154,
  128155,
  128156,
  128157,
  128590,
  128591,
  128070,
  128071,
  128072,
  128073,
  128074,
  128075,
  128076,
  128077,
  128078,
  128079,
  128170,
  128406,
  129304,
  129305,
  129306,
  129307,
  129308,
  129309,
  129310,
  129311,
  129295,
];

emoticonCodes.forEach((emoticon) => {
  emoticonsContainer.innerHTML += `<span class="emoji">&#${emoticon}</span>`;
});

// Emoticons slider
const openEmoticons = () => {
  emoticonsContainer.style.marginBottom = "0";
  clearButton.style.marginRight = "0";
  clearButton.style.opacity = "100";
};

const closeEmoticons = () => {
  emoticonsContainer.style.marginBottom = `-${emoticonsContainer.offsetHeight}px`;
  clearButton.style.marginRight = "-40px";
  clearButton.style.opacity = "0";
};

emoticonButton.addEventListener("click", openEmoticons);
clearButton.addEventListener("click", closeEmoticons);

// Inputting emoticon
const insertEmoticons = (e) => {
  let emoji = e.target.textContent;
  let msg = inputField.value;
  let cursor = inputField.selectionStart;
  let cursorEnd = inputField.selectionEnd;
  if (e.target.tagName === "SPAN") {
    // Input clicked emoji into the text
    inputField.value = msg.slice(0, cursor) + emoji + msg.slice(cursor);
    // Set cursor focus back to the input
    inputField.focus();
    // Move cursor to after emoji input, each emoji occupies 2 keyboard characters
    inputField.setSelectionRange(cursorEnd + 2, cursorEnd + 2);
  }
};

emoticonsContainer.addEventListener("click", insertEmoticons);
