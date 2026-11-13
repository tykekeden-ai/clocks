// ==================================
// ⏰ 時計の表示切り替え
// ==================================

const clockMode = document.getElementById("clock-mode");
const analogClock = document.getElementById("analog-clock");
const digitalClock = document.getElementById("clock");

const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

// 表示方式を切り替える
function changeClockMode() {
    const mode = clockMode.value;

    analogClock.style.display =
        (mode === "analog" || mode === "hybrid")
            ? "block" : "none";

    digitalClock.style.display =
        (mode === "digital" || mode === "hybrid")
            ? "block" : "none";
}

// 時計を更新する
function updateClock() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // デジタル表示
    const time =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

    digitalClock.textContent = time;

    // アナログ表示
    const smoothSeconds = seconds + milliseconds / 1000;
    const secondAngle = smoothSeconds * 6;
    const minuteAngle = (minutes + smoothSeconds / 60) * 6;
    const hourAngle = ((hours % 12) + minutes / 60) * 30;

    hourHand.style.transform =
        `translateX(-50%) rotate(${hourAngle}deg)`;

    minuteHand.style.transform =
        `translateX(-50%) rotate(${minuteAngle}deg)`;

    secondHand.style.transform =
        `translateX(-50%) rotate(${secondAngle}deg)`;
}

// 選択欄の操作
clockMode.addEventListener("change", changeClockMode);

// 起動時
changeClockMode();
updateClock();

// 針を滑らかに動かす
setInterval(updateClock, 50);
