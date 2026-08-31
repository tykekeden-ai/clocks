// =========================
// 🌦️ OpenWeather 接続テスト
// =========================
// APIキー
const API_KEY = ";
// テスト場所：岐阜
const CITY = "Gifu";
const COUNTRY = "JP";
// 天気表示エリア
const weatherDisplay =
    document.getElementById("weather-display");
// =========================
// API URL
// =========================
const url =
    "https://api.openweathermap.org/data/2.5/weather" +
    "?q=" + CITY + "," + COUNTRY +
    "&appid=" + API_KEY +
    "&units=metric" +
    "&lang=ja";
// =========================
// 接続テスト開始
// =========================
weatherDisplay.textContent =
    "🌦️ OpenWeatherに接続中...";
// =========================
// APIへ接続
// =========================
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(
                "HTTP " + response.status
            );
        }
        return response.json();
    })
    .then(data => {
        // =========================
        // ✅ 接続成功
        // =========================
        weatherDisplay.innerHTML = `
            <div>
                ✅ OpenWeather 接続成功！
            </div>
            <div>
                📍 ${data.name}
            </div>
            <div>
                🌤️ ${data.weather[0].description}
            </div>
            <div>
                🌡️ ${data.main.temp}℃
            </div>
        `;
        console.log("取得データ:", data);
    })
    .catch(error => {
        // =========================
        // ❌ 接続失敗
        // =========================
        weatherDisplay.innerHTML = `
            <div>
                ❌ OpenWeather 接続失敗
            </div>
            <div>
                エラー：${error.message}
            </div>
        `;
    });
