let stopwatchStartTime = 0;
let stopwatchElapsed = 0;
let stopwatchRunning = false;
let stopwatchTimer = null;
// =========================
// 要素を取得
// =========================
const stopwatchDisplay =
    document.getElementById("stopwatch-display");
const stopwatchStart =
    document.getElementById("stopwatch-start");
const stopwatchStop =
    document.getElementById("stopwatch-stop");
const stopwatchReset =
    document.getElementById("stopwatch-reset");
// =========================
// ⏱️ 表示を更新
// =========================
function updateStopwatch() {
    let elapsed = stopwatchElapsed;
    const hours = Math.floor(elapsed / 3600000);
    const minutes =
        Math.floor((elapsed % 3600000) / 60000);
    const seconds =
        Math.floor((elapsed % 60000) / 1000);
    const milliseconds =
        Math.floor((elapsed % 1000) / 10);
    stopwatchDisplay.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0");
}
// =========================
// ▶️ スタート
// =========================
stopwatchStart.addEventListener("click", () => {
    // すでに動いていたら何もしない
    if (stopwatchRunning) {
        return;
    }
    stopwatchRunning = true;
    stopwatchStartTime =
        performance.now() - stopwatchElapsed;
    stopwatchTimer = setInterval(() => {
        stopwatchElapsed =
            performance.now() - stopwatchStartTime;
        updateStopwatch();
    }, 10);
});
// =========================
// ⏸️ ストップ
// =========================
stopwatchStop.addEventListener("click", () => {
    if (!stopwatchRunning) {
        return;
    }
    stopwatchElapsed =
        performance.now() - stopwatchStartTime;
    stopwatchRunning = false;
    clearInterval(stopwatchTimer);
    stopwatchTimer = null;
    updateStopwatch();
});
// =========================
// 🔄 リセット
// =========================
stopwatchReset.addEventListener("click", () => {
    stopwatchRunning = false;
    clearInterval(stopwatchTimer);
    stopwatchTimer = null;
    stopwatchElapsed = 0;
    stopwatchStartTime = 0;
    updateStopwatch();
});
// =========================
// 初期表示
// =========================
updateStopwatch();
