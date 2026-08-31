let timerRemaining = 0;
let timerRunning = false;
let timerInterval = null;
// =========================
// 要素を取得
// =========================
const timerDisplay =
    document.getElementById("timer-display");
const timerSettings =
    document.getElementById("timer-settings");
const timerPanel =
    document.getElementById("timer-setting-panel");
const timerHours =
    document.getElementById("timer-hours");
const timerMinutes =
    document.getElementById("timer-minutes");
const timerSeconds =
    document.getElementById("timer-seconds");
const timerConfirm =
    document.getElementById("timer-confirm");
const timerStart =
    document.getElementById("timer-start");
const timerPause =
    document.getElementById("timer-pause");
const timerReset =
    document.getElementById("timer-reset");
// =========================
// 選択肢
// =========================
for (let i = 0; i <= 23; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent =
        String(i).padStart(2, "0");
    timerHours.appendChild(option);
}
for (let i = 0; i <= 59; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent =
        String(i).padStart(2, "0");
    timerMinutes.appendChild(option);
}
for (let i = 0; i <= 59; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent =
        String(i).padStart(2, "0");
    timerSeconds.appendChild(option);
}
// =========================
// 表示更新
// =========================
function updateTimerDisplay() {
    const hours =
        Math.floor(timerRemaining / 3600);
    const minutes =
        Math.floor((timerRemaining % 3600) / 60);
    const seconds =
        timerRemaining % 60;
    timerDisplay.textContent =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}
// =========================
// ⚙️ 設定
// =========================
timerSettings.addEventListener("click", () => {
    timerPanel.hidden =
        !timerPanel.hidden;
});
// =========================
// ✅ 決定
// =========================
timerConfirm.addEventListener("click", () => {
    const h = Number(timerHours.value);
    const m = Number(timerMinutes.value);
    const s = Number(timerSeconds.value);
    timerRemaining =
        h * 3600 +
        m * 60 +
        s;
    timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    stopSysSound();
    updateTimerDisplay();
    timerPanel.hidden = true;
    // 音声を準備
    prepareSysSound();
});
// =========================
// ▶️ スタート
// =========================
timerStart.addEventListener("click", () => {
    if (timerRunning) {
        return;
    }
    if (timerRemaining <= 0) {
        return;
    }
    // ユーザー操作中に音声を準備
    prepareSysSound();
    timerRunning = true;
    timerInterval = setInterval(() => {
        if (timerRemaining > 0) {
            timerRemaining--;
            updateTimerDisplay();
        }
        // =========================
        // 🔔 タイマー終了
        // =========================
        if (timerRemaining <= 0) {
            timerRemaining = 0;
            timerRunning = false;
            clearInterval(timerInterval);
            timerInterval = null;
            timerDisplay.textContent =
                "🔔 タイマー終了";
            // SYS Soundを再生
            playSysSound()
                .then(() => {
                    console.log(
                        "🔔 タイマー終了通知"
                    );
                })
                .catch(() => {
                    console.error(
                        "🔇 タイマー音を再生できませんでした"
                    );
                });
        }
    }, 1000);
});
// =========================
// ⏸️ 一時停止
// =========================
timerPause.addEventListener("click", () => {
    if (!timerRunning) {
        return;
    }
    timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
});
// =========================
// 🔄 リセット
// =========================
timerReset.addEventListener("click", () => {
    timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemaining = 0;
    stopSysSound();
    updateTimerDisplay();
});
