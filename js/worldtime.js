const worldCities = [
    {
        name: "ロンドン",
        zone: "Europe/London",
        flag: "🇬🇧"
    },
    {
        name: "東京",
        zone: "Asia/Tokyo",
        flag: "🇯🇵"
    },
    {
        name: "ニューヨーク",
        zone: "America/New_York",
        flag: "🇺🇸"
    }
];

const worldClocks = document.getElementById("world-clocks");
const citySelector = document.getElementById("city-selector");
const citySelect = document.getElementById("city-select");

function displayWorldTimes() {
    worldClocks.innerHTML = "";

    worldCities.forEach(city => {
        const div = document.createElement("div");

        const time = new Intl.DateTimeFormat("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: city.zone
        }).format(new Date());

        div.textContent =
            `${city.flag} ${city.name}　${time}`;

        worldClocks.appendChild(div);
    });
}

function updateWorldTimes() {
    displayWorldTimes();
}

document
    .getElementById("more-world-time")
    .addEventListener("click", () => {
        citySelector.hidden = !citySelector.hidden;
    });

document
    .getElementById("add-city")
    .addEventListener("click", () => {

        const zone = citySelect.value;

        if (!zone) return;

        const name =
            citySelect.options[citySelect.selectedIndex].text;

        const exists =
            worldCities.some(city => city.zone === zone);

        if (exists) {
            alert("その都市はすでに表示されています。");
            return;
        }

        worldCities.push({
            name: name,
            zone: zone,
            flag: "🌐"
        });

        displayWorldTimes();

        citySelect.value = "";
    });

setInterval(updateWorldTimes, 1000);

displayWorldTimes();
