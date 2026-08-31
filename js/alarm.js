let alarmTime = null;
let alarmTriggered = false;
// =========================
// 要素を取得
// =========================
const display =
    document.getElementById("alarm-display");
const panel =
    document.getElementById("alarm-setting-panel");
const hours =
    document.getElementById("alarm-hours");
const minutes =
    document.getElementById("alarm-minutes");
const settingsButton =
    document.getElementById("alarm-settings");
const confirmButton =
    document.getElementById("alarm-confirm");
const cancelButton =
    document.getElementById("alarm-cancel");
// =========================
// 🔔 アラーム音
// =========================
const alarmSound =
    new Audio("sounds/alarm.mp3");
alarmSound.preload = "auto";
alarmSound.loop = true;
// =========================
// 🔊 音声を準備
// =========================
function prepareAlarmSound() {
    alarmSound.currentTime = 0;
    alarmSound.play()
        .then(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;
            console.log(
                "🔊 アラーム音声準備完了"
            );
        })
        .catch(error => {
            console.error(
                "🔇 アラーム音声準備失敗:",
                error
            );
        });
}
// =========================
// 🔇 音声停止
// =========================
function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}
// =========================
// 時間 00～23
// =========================
for (let i = 0; i <= 23; i++) {
    const option =
        document.createElement("option");
    option.value = i;
    option.textContent =
        String(i).padStart(2, "0");
    hours.appendChild(option);
}
// =========================
// 分 00～59
// =========================
for (let i = 0; i <= 59; i++) {
    const option =
        document.createElement("option");
    option.value = i;
    option.textContent =
        String(i).padStart(2, "0");
    minutes.appendChild(option);
}
// =========================
// ⚙️ 設定
// =========================
settingsButton.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
});
// =========================
// ✅ 決定
// =========================
confirmButton.addEventListener("click", () => {
    const h = Number(hours.value);
    const m = Number(minutes.value);
    alarmTime =
        String(h).padStart(2, "0") +
        ":" +
        String(m).padStart(2, "0");
    alarmTriggered = false;
    stopAlarmSound();
    display.textContent =
        "設定: " + alarmTime;
    panel.hidden = true;
    // ユーザー操作中に音声を準備
    prepareAlarmSound();
});
// =========================
// 🔕 解除
// =========================
cancelButton.addEventListener("click", () => {
    alarmTime = null;
    alarmTriggered = false;
    stopAlarmSound();
    display.textContent = "未設定";
});
// =========================
// 🔔 アラームチェック
// =========================
setInterval(() => {
    if (!alarmTime || alarmTriggered) {
        return;
    }
    const now = new Date();
    const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");
    if (currentTime === alarmTime) {
        alarmTriggered = true;
        display.textContent =
            "🔔 アラーム作動中";
        alarmSound.currentTime = 0;
        alarmSound.play()
            .then(() => {
                console.log(
                    "🔔 アラーム音再生成功"
                );
            })
            .catch(error => {
                console.error(
                    "🔇 アラーム音再生失敗:",
                    error
                );
            });
        alert("🔔 アラーム！");
    }
}, 1000);
