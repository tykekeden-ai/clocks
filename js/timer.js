document.addEventListener("DOMContentLoaded", () => {

    let timerRemaining = 0;
    let timerInterval = null;
    let timerRunning = false;

    const display = document.getElementById("timer-display");
    const hoursInput = document.getElementById("timer-hours");
    const minutesInput = document.getElementById("timer-minutes");
    const secondsInput = document.getElementById("timer-seconds");
    const settingPanel = document.getElementById("timer-setting-panel");

    // 分・秒を作る
    for (let i = 0; i <= 59; i++) {

        const minute = document.createElement("option");
        minute.value = i;
        minute.textContent = String(i).padStart(2, "0");
        minutesInput.appendChild(minute);

        const second = document.createElement("option");
        second.value = i;
        second.textContent = String(i).padStart(2, "0");
        secondsInput.appendChild(second);
    }


    // 表示更新
    function updateTimerDisplay() {

        const h = Math.floor(timerRemaining / 3600);
        const m = Math.floor((timerRemaining % 3600) / 60);
        const s = timerRemaining % 60;

        display.textContent =
            String(h).padStart(2, "0") + ":" +
            String(m).padStart(2, "0") + ":" +
            String(s).padStart(2, "0");
    }


    // ⚙️ 設定
    document.getElementById("timer-settings").onclick = () => {

        settingPanel.hidden = !settingPanel.hidden;

    };


    // 決定
    document.getElementById("timer-confirm").onclick = () => {

        const h = Number(hoursInput.value);
        const m = Number(minutesInput.value);
        const s = Number(secondsInput.value);

        timerRemaining = h * 3600 + m * 60 + s;

        if (timerRemaining === 0) {
            alert("時間を設定してください");
            return;
        }

        updateTimerDisplay();

        settingPanel.hidden = true;
    };


    // ▶ スタート
    document.getElementById("timer-start").onclick = () => {

        if (timerRunning) return;

        if (timerRemaining <= 0) {
            alert("先に時間を設定してください");
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
    };


    // ⏸ 一時停止
    document.getElementById("timer-pause").onclick = () => {

        clearInterval(timerInterval);

        timerInterval = null;
        timerRunning = false;
    };


    // 🔄 リセット
    document.getElementById("timer-reset").onclick = () => {

        clearInterval(timerInterval);

        timerInterval = null;
        timerRunning = false;

        timerRemaining = 0;

        updateTimerDisplay();
    };


    updateTimerDisplay();

});
