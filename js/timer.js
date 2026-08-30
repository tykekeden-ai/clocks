let timerRemaining = 0;
let timerInterval = null;
let timerRunning = false;

const display = document.getElementById("timer-display");

const hoursInput = document.getElementById("timer-hours");
const minutesInput = document.getElementById("timer-minutes");
const secondsInput = document.getElementById("timer-seconds");

const settingPanel =
    document.getElementById("timer-setting-panel");

function updateTimerDisplay() {
    const hours = Math.floor(timerRemaining / 3600);
    const minutes = Math.floor((timerRemaining % 3600) / 60);
    const seconds = timerRemaining % 60;

    display.textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}


// 設定を開く
document
    .getElementById("timer-settings")
    .addEventListener("click", () => {

        settingPanel.hidden = !settingPanel.hidden;

    });


// 設定を決定
document
    .getElementById("timer-confirm")
    .addEventListener("click", () => {

        const hours = Number(hoursInput.value) || 0;
        const minutes = Number(minutesInput.value) || 0;
        const seconds = Number(secondsInput.value) || 0;

        timerRemaining =
            hours * 3600 +
            minutes * 60 +
            seconds;

        if (timerRemaining <= 0) {
            alert("時間を設定してください");
            return;
        }

        updateTimerDisplay();

        settingPanel.hidden = true;
    });


// スタート
document
    .getElementById("timer-start")
    .addEventListener("click", () => {

        if (timerRunning) return;

        if (timerRemaining <= 0) {
            alert("先にタイマーを設定してください");
            return;
        }

        timerRunning = true;

        timerInterval = setInterval(() => {

            timerRemaining--;

            updateTimerDisplay();

            if (timerRemaining <= 0) {

                clearInterval(timerInterval);

                timerInterval = null;
                timerRunning = false;

                alert("⏰ タイマー終了！");
            }

        }, 1000);
    });


// 一時停止
document
    .getElementById("timer-pause")
    .addEventListener("click", () => {

        clearInterval(timerInterval);

        timerInterval = null;
        timerRunning = false;
    });


// リセット
document
    .getElementById("timer-reset")
    .addEventListener("click", () => {

        clearInterval(timerInterval);

        timerInterval = null;
        timerRunning = false;

        timerRemaining = 0;

        updateTimerDisplay();
    });


updateTimerDisplay();
