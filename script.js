const input = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultContainer = document.querySelector('.result-container');

fetchTopAnime();

searchBtn.addEventListener('click', () => {

    const inputValue = input.value.trim();

    const apiUrl = "https://api.jikan.moe/v4/anime?q=" + inputValue;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const animeList = data.data;
            resultContainer.innerHTML = "";


            animeList.forEach(anime => {
                renderAnime(anime);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

function renderAnime(anime) {
    const card = `
        <div class="card">
            <img src="${anime.images.jpg.image_url}" />
            <h3>${anime.title}</h3>
            <p>⭐ ${anime.score ?? "N/A"}</p>
            <p>${anime.episodes ?? "?"} episodes</p>
        </div>
    `;

    resultContainer.innerHTML += card;
}

function fetchTopAnime() {
    fetch("https://api.jikan.moe/v4/top/anime")
        .then(response => response.json())
        .then(data => {
            resultContainer.innerHTML = ""; 
            data.data.forEach(anime => renderAnime(anime));
        })
        .catch(err => console.error("Error fetching top anime:", err));
}