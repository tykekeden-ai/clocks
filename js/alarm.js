let alarmTime = null;
let alarmTriggered = false;

// 要素を取得
const display = document.getElementById("alarm-display");
const panel = document.getElementById("alarm-setting-panel");

const hours = document.getElementById("alarm-hours");
const minutes = document.getElementById("alarm-minutes");

const settingsButton = document.getElementById("alarm-settings");
const confirmButton = document.getElementById("alarm-confirm");
const cancelButton = document.getElementById("alarm-cancel");

// 🔔 GitHub Pages上の音声
const alarmSound = new Audio("sounds/alarm.mp3");

alarmSound.preload = "auto";
alarmSound.loop = true;


// =========================
// 時間 00～23
// =========================

for (let i = 0; i <= 23; i++) {
    const option = document.createElement("option");

    option.value = i;
    option.textContent = String(i).padStart(2, "0");

    hours.appendChild(option);
}


// =========================
// 分 00～59
// =========================

for (let i = 0; i <= 59; i++) {
    const option = document.createElement("option");

    option.value = i;
    option.textContent = String(i).padStart(2, "0");

    minutes.appendChild(option);
}


// =========================
// ⚙️ 設定ボタン
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
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0");

    alarmTriggered = false;

    // 前の音を停止
    alarmSound.pause();
    alarmSound.currentTime = 0;

    display.textContent = "設定: " + alarmTime;

    panel.hidden = true;
});


// =========================
// 🔕 解除
// =========================

cancelButton.addEventListener("click", () => {

    alarmTime = null;
    alarmTriggered = false;

    alarmSound.pause();
    alarmSound.currentTime = 0;

    display.textContent = "未設定";
});


// =========================
// 🔔 アラームチェック
// =========================

setInterval(() => {

    // アラームが設定されていない
    if (!alarmTime || alarmTriggered) {
        return;
    }

    const now = new Date();

    const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");


    // 設定時刻になった
    if (currentTime === alarmTime) {

        alarmTriggered = true;

        display.textContent = "🔔 アラーム作動中";

        // 🔊 音を鳴らす
        alarmSound.currentTime = 0;

        alarmSound.play()
            .then(() => {
                console.log("🔔 アラーム音再生成功");
            })
            .catch((error) => {
                console.error("🔇 アラーム音再生失敗:", error);
            });

        alert("🔔 アラーム！");
    }

}, 1000);
