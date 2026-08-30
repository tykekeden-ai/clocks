alert("alarm.js 読み込み成功！");
const button = document.getElementById("alarm-settings");
const panel = document.getElementById("alarm-setting-panel");

button.addEventListener("click", function () {
    panel.hidden = !panel.hidden;
});
