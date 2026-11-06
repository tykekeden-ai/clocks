(function() {
  // 1. スタイル（CSS）を動的に作成してヘッドに追加
  const style = document.createElement('style');
  style.textContent = `
    .weather-container {
      font-family: sans-serif;
      max-width: 500px;
      margin: 20px auto;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      color: #333;
    }
    .weather-container .search-box {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .weather-container .search-box input {
      flex: 1;
      padding: 8px 12px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    .weather-container .search-box button {
      padding: 8px 16px;
      font-size: 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .weather-container .search-box button:hover {
      background: #0056b3;
    }
    .weather-container .current-weather {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .weather-container .hourly-container {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 10px;
    }
    .weather-container .hourly-card {
      min-width: 70px;
      background: #f8f9fa;
      padding: 10px;
      border-radius: 6px;
      text-align: center;
      font-size: 14px;
      border: 1px solid #e9ecef;
    }
  `;
  document.head.appendChild(style);

  // 2. HTMLの構造（要素）を動的に作成してボディに追加
  const container = document.createElement('div');
  container.className = 'weather-container';
  container.innerHTML = `
    <h2>お天気チェッカー</h2>
    <div class="search-box">
      <input type="text" id="cityInput" placeholder="都市名を入力 (例: 東京, 大阪, London)" value="東京">
      <button id="searchBtn">検索</button>
    </div>
    <div class="current-weather">
      <h3 id="locationName">読み込み中...</h3>
      <p id="currentInfo">現在の天気を取得しています...</p>
    </div>
    <h3>12時間の天気・気温予測</h3>
    <div class="hourly-container" id="hourlyContainer"></div>
  `;
  document.body.appendChild(container);

  // 3. ロジック（JavaScriptの関数部分）
  function getWeatherText(code) {
    if (code === 0) return '晴れ ☀️';
    if (code >= 1 && code <= 3) return 'くもり ☁️';
    if (code >= 51 && code <= 67) return '雨 🌧️';
    if (code >= 71 && code <= 77) return '雪 ❄️';
    if (code >= 95) return '雷雨 ⚡';
    return '晴れ/くもり 🌤️';
  }

  async function searchWeather() {
    const cityName = document.getElementById('cityInput').value.trim();
    if (!cityName) return;

    const locationNameEl = document.getElementById('locationName');
    const currentInfoEl = document.getElementById('currentInfo');
    const hourlyContainerEl = document.getElementById('hourlyContainer');

    locationNameEl.textContent = '検索中...';
    currentInfoEl.textContent = '';
    hourlyContainerEl.innerHTML = '';

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=ja`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        locationNameEl.textContent = '見つかりませんでした';
        currentInfoEl.textContent = '正しい都市名を入力してください。';
        return;
      }

      const location = geoData.results[0];
      const lat = location.latitude;
      const lon = location.longitude;
      const displayName = `${location.name} (${location.country || ''})`;

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&timezone=auto`;
      
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();

      locationNameEl.textContent = displayName;
      const current = weatherData.current;
      const currentTemp = current.temperature_2m;
      const apparentTemp = current.apparent_temperature;
      const windSpeed = current.wind_speed_10m;
      const weatherText = getWeatherText(current.weather_code);

      currentInfoEl.innerHTML = `
        <strong>${weatherText}</strong> / 気温: ${currentTemp}℃<br>
        体感温度: ${apparentTemp}℃ | 風速: ${windSpeed} m/s
      `;

      const times = weatherData.hourly.time;
      const temps = weatherData.hourly.temperature_2m;
      const codes = weatherData.hourly.weather_code;

      const now = new Date();
      let startIndex = 0;
      for (let i = 0; i < times.length; i++) {
        if (new Date(times[i]) >= now) {
          startIndex = i;
          break;
        }
      }

      for (let i = startIndex; i < startIndex + 12 && i < times.length; i++) {
        const timeStr = new Date(times[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = temps[i];
        const codeText = getWeatherText(codes[i]);

        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
          <div style="font-weight:bold; color:#555;">${timeStr}</div>
          <div style="font-size:20px; margin:5px 0;">${codeText.split(' ')[1] || '🌤️'}</div>
          <div>${temp}℃</div>
        `;
        hourlyContainerEl.appendChild(card);
      }

    } catch (error) {
      console.error(error);
      locationNameEl.textContent = 'エラーが発生しました';
      currentInfoEl.textContent = 'データの取得に失敗しました。';
    }
  }

  // イベントリスナーの設定
  document.getElementById('searchBtn').addEventListener('click', searchWeather);
  document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
  });

  // 初期実行
  searchWeather();
})();
