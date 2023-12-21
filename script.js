// const API_KEY = "b674de7c8d6d490eb3ed734a2b225bae"; // NewsApi
// const url = "https://newsapi.org/v2/everything?q=";

const API_KEY = "c4ba8dab1a95e9aefa0edb9bd6f00d83"; // using Gnews
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener('load', ()=> fetchNews("India"))

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null
});