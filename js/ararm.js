document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("alarm-settings");
    const panel = document.getElementById("alarm-setting-panel");

    button.addEventListener("click", () => {
        panel.hidden = !panel.hidden;
    });

});
