// =========================
// 🔊 SYS Sound
// システムサウンド管理
// =========================
const SYS_SOUND_URL =
    "https://tykekeden-ai.github.io/clocks/sounds/alarm.mp3";
const SYS_SOUND = new Audio(SYS_SOUND_URL);
SYS_SOUND.preload = "auto";
SYS_SOUND.loop = true;
// =========================
// 🔊 システムサウンド再生
// =========================
function playSysSound() {
    SYS_SOUND.currentTime = 0;
    return SYS_SOUND.play()
        .then(() => {
            console.log("🔊 SYS Sound 再生成功");
        })
        .catch(error => {
            console.error(
                "🔇 SYS Sound 再生失敗:",
                error
            );
            throw error;
        });
}
// =========================
// 🔇 システムサウンド停止
// =========================
function stopSysSound() {
    SYS_SOUND.pause();
    SYS_SOUND.currentTime = 0;
    console.log("🔇 SYS Sound 停止");
}
// =========================
// 🔊 システムサウンド準備
// =========================
function prepareSysSound() {
    SYS_SOUND.currentTime = 0;
    return SYS_SOUND.play()
        .then(() => {
            SYS_SOUND.pause();
            SYS_SOUND.currentTime = 0;
            console.log(
                "🔊 SYS Sound 準備完了"
            );
        })
        .catch(error => {
            console.error(
                "🔇 SYS Sound 準備失敗:",
                error
            );
        });
}
