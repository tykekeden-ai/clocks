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
const stopwatchLap =
    document.getElementById("stopwatch-lap");
const stopwatchReset =
    document.getElementById("stopwatch-reset");
const stopwatchLapList =
    document.getElementById("stopwatch-lap-list");
// =========================
// ⏱️ 時間を文字列に変換
// =========================
function formatStopwatchTime(elapsed) {
    const hours = Math.floor(elapsed / 3600000);
    const minutes =
        Math.floor((elapsed % 3600000) / 60000);
    const seconds =
        Math.floor((elapsed % 60000) / 1000);
    const milliseconds =
        Math.floor((elapsed % 1000) / 10);
    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}
// =========================
// ⏱️ 表示を更新
// =========================
function updateStopwatch() {
    stopwatchDisplay.textContent =
        formatStopwatchTime(stopwatchElapsed);
}
// =========================
// ▶️ スタート
// =========================
stopwatchStart.addEventListener("click", () => {
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
// 🏁 ラップ
// =========================
stopwatchLap.addEventListener("click", () => {
    // 動作中でなければラップを記録しない
    if (!stopwatchRunning) {
        return;
    }
    const lapTime =
        formatStopwatchTime(stopwatchElapsed);
    const lapItem =
        document.createElement("li");
    lapItem.textContent =
        lapTime;
    stopwatchLapList.appendChild(lapItem);
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
    // ラップも全部消す
    stopwatchLapList.innerHTML = "";
    updateStopwatch();
});
// =========================
// 初期表示
// =========================
updateStopwatch();
