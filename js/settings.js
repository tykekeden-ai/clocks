// 設定欄を開閉
const settingsButton =
    document.getElementById("settings-items");

const settingsPanel =
    document.getElementById("settings-panel");

settingsButton.addEventListener("click", () => {
    settingsPanel.hidden = !settingsPanel.hidden;
});
