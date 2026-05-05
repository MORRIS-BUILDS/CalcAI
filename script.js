let display = document.getElementById("display");
let historyDiv = document.getElementById("history");

let history = [];

function append(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function parseInput(input) {
  const map = {
    "plus": "+",
    "minus": "-",
    "into": "*",
    "multiply": "*",
    "divide": "/",
    "square root of": "sqrt",
    "log": "log10"
  };

  for (let key in map) {
    input = input.replaceAll(key, map[key]);
  }

  return input;
}

function calculate() {
  try {
    let parsed = parseInput(display.value.toLowerCase());
    let result = math.evaluate(parsed);
    display.value = result;
    addHistory(parsed + "=" + result);
  } catch {
    display.value = "Error";
  }
}

function addHistory(item) {
  history.push(item);
  historyDiv.innerHTML = history.map(h => `<p>${h}</p>`).join('');
}

/* 🎤 Voice */
function startVoice() {
  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.onresult = e => display.value = e.results[0][0].transcript;
  rec.start();
}

/* 📊 Graph */
function plotGraph() {
  let expr = display.value;

  let x = [], y = [];

  for (let i = -10; i <= 10; i++) {
    x.push(i);
    try {
      y.push(math.evaluate(expr, {x: i}));
    } catch {
      y.push(null);
    }
  }

  Plotly.newPlot("graph", [{x, y, type: "scatter"}]);
}

/* 🤖 AI */
async function askAI() {
  let query = display.value;

  let res = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({query})
  });

  let data = await res.json();
  display.value = data.result;
}

/* 📱 PWA */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}