chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "fnd-check",
    title: "Check with FND",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "fnd-check") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: sendSelectedToFND,
      args: [info.selectionText]
    });
  }
});

function sendSelectedToFND(text) {
  // UPDATED URL HERE 👇
  fetch("https://fnd-backend-l4ay.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
    .then((res) => res.json())
    .then((data) => {
      alert(
        `${data.final_verdict} (${data.confidence}%)\n\n${data.explanation}`
      );
    });
}