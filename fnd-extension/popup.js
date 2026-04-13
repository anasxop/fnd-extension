const input = document.getElementById("newsInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");
const resultBox = document.getElementById("result");
const verdictBadge = document.getElementById("verdictBadge");
const confidenceText = document.getElementById("confidence");
const explanationText = document.getElementById("explanation");

analyzeBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  loading.classList.remove("hidden");
  resultBox.classList.add("hidden");

  try {
    // UPDATED URL HERE 👇
    const res = await fetch("https://fnd-backend-l4ay.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    showResult(data);
  } catch (err) {
    console.error(err);
    alert("Could not connect to the cloud server.");
  }

  loading.classList.add("hidden");
});

function showResult(data) {
  resultBox.classList.remove("hidden");

  verdictBadge.className = "";
  verdictBadge.textContent = data.final_verdict;

  if (data.final_verdict === "Real") {
    verdictBadge.classList.add("badge-real");
  } else if (data.final_verdict === "Fake") {
    verdictBadge.classList.add("badge-fake");
  } else {
    verdictBadge.classList.add("badge-uncertain");
  }

  confidenceText.textContent = `Confidence: ${data.confidence}%`;
  explanationText.textContent = data.explanation;
}