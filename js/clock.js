function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const time = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock").textContent = time;
}

// 1秒ごとに更新
setInterval(updateClock, 1000);

// ページを開いた瞬間にも表示
updateClock();
