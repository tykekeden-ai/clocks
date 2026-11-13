
// ==================================
// ⚙️ 設定欄
// ==================================

const settingsButton = document.getElementById("settings-items");
const settingsPanel = document.getElementById("settings-panel");

// 設定欄を開閉
settingsButton.addEventListener("click", () => {
    settingsPanel.hidden = !settingsPanel.hidden;
});

// ==================================
// 🎨 色変更
// ==================================

const colorTarget = document.getElementById("color-target");
const colorPicker = document.getElementById("color-picker");
const colorApply = document.getElementById("color-apply");

// 色を適用する対象
function getColorElements(target) {
    switch (target) {
        case "background":
            return [document.body];

        case "text":
            return [
                document.querySelector("h1"),
                ...document.querySelectorAll("h2, h3, p, label"),
                ...document.querySelectorAll("section")
            ];

        case "clock":
            return [
                document.getElementById("clock"),
                document.getElementById("analog-clock")
            ];

        case "timer":
            return [document.getElementById("timer")];

        case "alarm":
            return [document.getElementById("alarm")];

        case "button":
            return [...document.querySelectorAll("button")];
        
        default:
            return [];
    }
}

// 選択した色を適用
function applyColor(target, color) {
    const elements = getColorElements(target);

    elements.forEach(element => {
        if (!element) return;

        if (target === "background" ||
            target === "clock" ||
            target === "timer" ||
            target === "alarm") {
            element.style.background = color;
        } else if (target === "text") {
            element.style.color = color;
        } else if (target === "button") {
            element.style.background = color;
        }
    });
}

// 色を適用するボタン
colorApply.addEventListener("click", () => {
    const target = colorTarget.value;
    const color = colorPicker.value;

    applyColor(target, color);

    // 選択した色を保存
    localStorage.setItem("clock-color-" + target, color);
});

// 保存済みの色を読み込む
const colorTargets = [
    "background",
    "text",
    "clock",
    "timer",
    "alarm",
    "button"
];

colorTargets.forEach(target => {
    const savedColor = localStorage.getItem("clock-color-" + target);

    if (savedColor) {
        applyColor(target, savedColor);
    }
});

// 項目を選んだとき、保存済みの色を表示
colorTarget.addEventListener("change", () => {
    const savedColor = localStorage.getItem(
        "clock-color-" + colorTarget.value
    );

    colorPicker.value = savedColor || "#000000";
});
