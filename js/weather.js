async function getWeather() {
  const weatherEl = document.getElementById('weather');

  try {
    // Open-Meteo API（東京の緯度: 35.6785, 経度: 139.6823）
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&current_weather=true';
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('取得失敗');

    const data = await response.json();
    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;

    // 天気コードに応じた日本語表示（簡易判定）
    let weatherText = '晴れ / くもり';
    if (code >= 51 && code <= 67) weatherText = '雨';
    if (code >= 71) weatherText = '雪';
    if (code >= 95) weatherText = '雷雨';

    // 画面の要素を書き換え
    weatherEl.textContent = `${weatherText} (${temp}℃)`;

  } catch (error) {
    console.error('エラーの詳細:', error);
    weatherEl.textContent = '天気の取得に失敗しました';
  }
}

// 関数の実行
getWeather();
