let alarmTime = null;
let lastTriggeredDate = null;

const display = document.getElementById("alarm-display");
const panel = document.getElementById("alarm-setting-panel");

const hours = document.getElementById("alarm-hours");
const minutes = document.getElementById("alarm-minutes");

const settingsButton = document.getElementById("alarm-settings");
const confirmButton = document.getElementById("alarm-confirm");
const cancelButton = document.getElementById("alarm-cancel");
const stopButton = document.getElementById("alarm-stop");

// 🔔 アラーム音
const alarmSound = new Audio("sounds/alarm.mp3");

// 音声を繰り返す
alarmSound.loop = true;


// =========================
// 時・分の選択肢を作る
// =========================

// 時間 00～23
for (let i = 0; i <= 23; i++) {
    const option = document.createElement("option");

    option.value = i;
    option.textContent = String(i).padStart(2, "0");

    hours.appendChild(option);
}


// 分 00～59
for (let i = 0; i <= 59; i++) {
    const option = document.createElement("option");

    option.value = i;
    option.textContent = String(i).padStart(2, "0");

    minutes.appendChild(option);
}


// =========================
// 日付を YYYY-MM-DD 形式で取得
// =========================

function getDateKey(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");
}


// =========================
// 🔊 アラーム音を停止
// =========================

function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
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
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0");

    // 新しい設定として、鳴動済みの日付をリセット
    lastTriggeredDate = null;

    // 念のため音を停止
    stopAlarmSound();

    display.textContent = "設定: " + alarmTime;

    panel.hidden = true;
});


// =========================
// 🔕 アラーム設定を解除
// =========================

cancelButton.addEventListener("click", () => {
    alarmTime = null;
    lastTriggeredDate = null;

    stopAlarmSound();

    display.textContent = "未設定";
});


// =========================
// 🔇 アラーム音を停止
// =========================

stopButton.addEventListener("click", () => {
    stopAlarmSound();

    display.textContent = alarmTime
        ? "設定: " + alarmTime
        : "未設定";
});


// =========================
// 🔔 アラーム監視
// =========================

setInterval(() => {
    // アラーム未設定なら何もしない
    if (!alarmTime) {
        return;
    }

    const now = new Date();

    const currentTime =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");

    const currentDate = getDateKey(now);

    // 当日すでに鳴動済みなら何もしない
    if (lastTriggeredDate === currentDate) {
        return;
    }

    // 設定時刻になった
    if (currentTime === alarmTime) {
        // 鳴動した日付を記録する
        lastTriggeredDate = currentDate;

        // 🔔 音を鳴らす
        alarmSound.currentTime = 0;
        alarmSound.play().catch(error => {
            console.log("音声を再生できませんでした:", error);
        });

        display.textContent = "🔔 アラーム鳴動中";
    }
}, 1000);
