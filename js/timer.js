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
// 🔔 タイマー終了音
// =========================

const timerSound = new Audio("sounds/alarm.mp3");

timerSound.preload = "auto";
timerSound.loop = true;


// =========================
// 🔊 音声を準備
// =========================

function prepareTimerSound() {

    timerSound.currentTime = 0;

    timerSound.play()
        .then(() => {

            timerSound.pause();
            timerSound.currentTime = 0;

            console.log("🔊 タイマー音声準備完了");

        })
        .catch(error => {

            console.error(
                "🔇 タイマー音声準備失敗:",
                error
            );

        });
}


// =========================
// 🔇 音声停止
// =========================

function stopTimerSound() {

    timerSound.pause();
    timerSound.currentTime = 0;
}


// =========================
// 時間の選択肢
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
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}


// =========================
// ⚙️ 設定
// =========================

timerSettings.addEventListener("click", () => {

    timerPanel.hidden = !timerPanel.hidden;

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

    stopTimerSound();

    updateTimerDisplay();

    timerPanel.hidden = true;

    // ユーザー操作中に音声を準備
    prepareTimerSound();

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
    prepareTimerSound();

    timerRunning = true;

    timerInterval = setInterval(() => {

        if (timerRemaining > 0) {

            timerRemaining--;

            updateTimerDisplay();

        }

        if (timerRemaining <= 0) {

            timerRemaining = 0;

            timerRunning = false;

            clearInterval(timerInterval);

            timerInterval = null;

            timerDisplay.textContent =
                "🔔 タイマー終了";

            // 🔔 MP3再生
            timerSound.currentTime = 0;

            timerSound.play()
                .then(() => {

                    console.log(
                        "🔔 タイマー終了音再生成功"
                    );

                })
                .catch(error => {

                    console.error(
                        "🔇 タイマー終了音再生失敗:",
                        error
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

    stopTimerSound();

    updateTimerDisplay();

});
