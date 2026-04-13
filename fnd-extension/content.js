let pill = document.createElement("div");
pill.id = "fnd-pill";
pill.innerText = "FND";
document.body.appendChild(pill);

// Styles
pill.style.position = "fixed";
pill.style.top = "20px";
pill.style.right = "20px";
pill.style.zIndex = "999999";
pill.style.padding = "10px 16px";
pill.style.borderRadius = "999px";
pill.style.cursor = "pointer";
pill.style.backdropFilter = "blur(12px)";
pill.style.background = "rgba(0,0,0,0.4)";
pill.style.color = "white";
pill.style.fontWeight = "bold";
pill.style.boxShadow = "0 0 20px rgba(0,0,0,0.4)";
pill.style.userSelect = "none";

// Drag logic
let isDragging = false;
let offsetX, offsetY;

pill.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - pill.getBoundingClientRect().left;
  offsetY = e.clientY - pill.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  pill.style.top = e.clientY - offsetY + "px";
  pill.style.left = e.clientX - offsetX + "px";
  pill.style.right = "auto";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Click = analyze selected text
pill.addEventListener("click", async () => {
  const selected = window.getSelection().toString().trim();
  if (!selected) {
    alert("Select some text first.");
    return;
  }

  // UPDATED URL HERE 👇
  const res = await fetch("https://fnd-backend-l4ay.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: selected })
  });

  const data = await res.json();
  showOverlayResult(data);
});

// Overlay UI
function showOverlayResult(data) {
  let overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.bottom = "20px";
  overlay.style.right = "20px";
  overlay.style.padding = "16px";
  overlay.style.borderRadius = "16px";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.backdropFilter = "blur(20px)";
  overlay.style.color = "white";
  overlay.style.zIndex = "999999";
  overlay.style.maxWidth = "300px";
  overlay.style.boxShadow = "0 0 30px rgba(0,0,0,0.5)";

  overlay.innerHTML = `
    <strong>${data.final_verdict}</strong> (${data.confidence}%)
    <p style="font-size:12px;margin-top:6px;">${data.explanation}</p>
    <button id="fnd-close">Close</button>
  `;

  document.body.appendChild(overlay);

  document.getElementById("fnd-close").onclick = () => overlay.remove();
}