const RickAndMortyAPI = 'https://rickandmortyapi.com/api/character/';
let favoriteCharactersData = [];
let characterGridData = [];
let currentPage = 1;
let currentPageData; 

// ARM BUTTONS
const searchInput = document.getElementById('filter-search');
const favoriteBar = document.getElementById('favorite-card-container');
const cardContainer = document.getElementById('card-container');
const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('previous-page');
searchInput.addEventListener('search', search);
nextPage.addEventListener('click', page);
prevPage.addEventListener('click', page);

load();

// This function is used to boot the app. 
// It renders the favorites and the card grid.
async function load() {
    if(localStorage.getItem('favorites')) {
        await getData(localStorage.getItem('favorites'), 'faves');
        await showData('faves');
    }
    await getData(`?page=${currentPage}`, 'grid');
    await showData('grid');
}

// This function is used to change the page. 
// It gets new char content and renders it in the grid.
async function page(event) {

    let targetID = event.target.id; 
    if (!paginationCheck(targetID)) {
        return;
    }
    
    currentPage = targetID === 'next-page' ? currentPage + 1 : currentPage - 1;

    let targetID = event.target.id;
    currentPage = targetID === 'next-page' ? currentPage + 1 : currentPage - 1;
    if(currentPage < 1) { currentPage = 1; }

    await getData(`?page=${currentPage}`, 'grid');
    await showData('grid');
}

// This function is used to search for characters of a given name.
// It gets char info and renders it to the grid. 
async function search(event) {
    const searchTerm = event.target.value.toUpperCase();
    await getData(`?name=${searchTerm}`, 'grid');
    await showData('grid');
}

// Called on heart click.
async function favorite(event) {
    if(!event.target.classList.contains('favoriteButton')) {
        return;
    }
    
    toggleHeartDisplay(event);

    const favorites = localStorage.getItem('favorites');
    const favoriteArray = favorites ? favorites.split(',') : [];

    // Removing a favorite
    if(favoriteArray.includes(event.currentTarget.id)) {
        favoriteArray.splice(favoriteArray.indexOf(event.currentTarget.id), 1);
    } else {
        // Add a favorite
        favoriteArray.push(event.currentTarget.id);
    }

    localStorage.setItem('favorites', favoriteArray);
    await getData(localStorage.getItem('favorites'), 'faves');
    await showData('faves');
}

async function getData(queryParam, destination) {
    if(queryParam === '' && destination === 'faves') {
        favoriteCharactersData = [];
        return;
    }

    const data = await fetch(`${RickAndMortyAPI}${queryParam}`);
    const parsedResponse = await data.json();
    // check out parsedResponse.info for metadata
    currentPageData = parsedResponse.info;
    console.log(currentPageData);

    if(destination === 'grid') {
        characterGridData = parsedResponse.results;
    } else {
        favoriteCharactersData = Array.isArray(parsedResponse) ? parsedResponse : [parsedResponse];
    }
}

// Looks at characterGridData and renders it in the grid.
function showData(destination) {
    if(destination === 'grid') {
        cardContainer.innerHTML = '';
    } else {
        favoriteBar.innerHTML = '';
    }
    const collection = destination === 'grid' ? characterGridData : favoriteCharactersData;
    collection.forEach((character) => {
        if(destination === 'grid') {
            renderCard(character);
            disablePageButtons();
        } else {
            renderFavoriteCard(character);
        }
    });
}

// Takes a single character's data and returns a card DOM element.
function renderCard(characterData) {
    let card = document.createElement('div');
    card.id = characterData.id;
    card.classList.add('characterCard');
    card.addEventListener('click', favorite);
    let cardTitle = document.createElement('div');
    cardTitle.classList.add('characterNames');
    let cardImg = document.createElement('img');
    let favoriteIcon = document.createElement('img');
    let cardText = document.createElement('ul');
    let textSpecies = document.createElement('li');
    let textStatus = document.createElement('li');
    let textLocation = document.createElement('li');

    favoriteIcon.src = checkFaves(card.id) ? 'img/favorite-heart.svg' : 'img/not-favorite-heart.svg'; 
    favoriteIcon.classList.add('favoriteButton');
    cardTitle.innerText = `${characterData.name}`;
    cardImg.src = characterData.image;
    textSpecies.innerText = `Species: ${characterData.species}`;
    textStatus.innerText = `Status: ${characterData.status}`;
    textLocation.innerText = `Location: ${characterData.location.name}`;
    card.appendChild(cardImg);
    card.appendChild(cardTitle);
    card.appendChild(favoriteIcon);
    card.appendChild(cardText);
    cardText.appendChild(textSpecies);
    cardText.appendChild(textStatus);
    cardText.appendChild(textLocation);
    cardContainer.appendChild(card);
}

function renderFavoriteCard(characterData) {
    let favoriteCard = document.createElement('div');
    favoriteCard.classList.add('favoriteCard');
    favoriteCard.id = `favorite-card-${characterData.id}`;
    let favoriteCardImg = document.createElement('img');
    favoriteCardImg.src = characterData.image;
    let favoriteCardName = document.createElement('div');
    favoriteCardName.innerText = characterData.name;
    let favoritePin = document.createElement('img');
    favoritePin.src = 'img/thumb-tack.svg';
    favoriteCard.appendChild(favoriteCardImg);
    favoriteCard.appendChild(favoriteCardName);
    favoriteCard.appendChild(favoritePin);
    favoriteBar.appendChild(favoriteCard);
}

function toggleHeartDisplay(event) {
    event.target.classList.toggle('favorited');
    event.target.src = event.target.classList.contains('favorited') 
        ? 'img/favorite-heart.svg' 
        : 'img/not-favorite-heart.svg';
}

function checkFaves(id) {
    const favorites = localStorage.getItem('favorites');
    if(!favorites) {
        return false;
    }
    return Boolean(favorites.split(',').find(elem => elem == id));
}

function paginationCheck(pageButton) {  
    return pageButton === 'next-page' ? currentPageData.next : currentPageData.prev;
}

function disablePageButtons() {
    nextPage.disabled = !currentPageData.next;
    prevPage.disabled = !currentPageData.prev;
}