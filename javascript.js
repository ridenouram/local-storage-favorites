const RickAndMortyAPI = 'https://rickandmortyapi.com/api/character';
let characterArray = [];
const searchInput = document.getElementById('filter-search');
const favoriteBar = document.getElementById('favorite-container');
searchInput.addEventListener('keyup', searchMortyPad);

async function getFirstCharacters() {
    for(let i = 1; i <= 20; i++) {
        const APIResponse = await fetch(`${RickAndMortyAPI}/${i}`);
        const json = await APIResponse.json();
        let characterCard = {
            name: json.name,
            id: `${i}`,
            image: json.image,
            status: json.status,
            species: json.species,
            location: json.location.name,
            favorite: false
        };
        characterArray.push(characterCard);
    }
}

async function getCharacters() {
    for(let i = 21; i <= 826; i++) {
        const APIResponse = await fetch(`${RickAndMortyAPI}/${i}`);
        const json = await APIResponse.json();
        let characterCard = {
            name: json.name,
            id: json.id,
            image: json.image,
            status: json.status,
            species: json.species,
            location: json.location.name,
            favorite: false
        };
        characterArray.push(characterCard);
    }
    localStorage.setItem('Character Array', JSON.stringify(characterArray));
}

function createCharacterCards() {
    //for each character object in the character array, create a dom 
    // element/card render in a flexbox
    let characterCardContainer = document.getElementById('card-container');
    for(let i = 0; i < characterArray.length; i++) { 
        let card = document.createElement('div');
        card.classList.add('characterCard');
        let image = document.createElement('img'); 
        image.src = characterArray[i].image;
        let name = document.createElement('div');
        name.classList.add('characterNames');
        let favoriteIcon = document.createElement('img');
        if(characterArray[i].favorite) {
            favoriteIcon.src = 'img/favorite-heart.svg';
            favoriteIcon.classList.add('favorited');
        } else {favoriteIcon.src = 'img/not-favorite-heart.svg';}
        //each hearts index attribute matches card's index in character Array and child # in DOM container
        favoriteIcon.dataset.index = `${i}`;
        favoriteIcon.classList.add('favoriteButton');
        name.innerHTML = characterArray[i].name; 
        let text = document.createElement('ul');
        let status = document.createElement('li');
        status.innerHTML = `Status: ${characterArray[i].status}`;
        let species = document.createElement('li');
        species.innerHTML = `Species: ${characterArray[i].species}`;
        let location = document.createElement('li');
        location.innerHTML = `Location: ${characterArray[i].location}`;
        characterCardContainer.appendChild(card);
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(favoriteIcon);
        card.appendChild(text);
        text.appendChild(status);
        text.appendChild(species); 
        text.appendChild(location);   
    }
}


async function mortyAppInit() {
    console.log('fetching from API for first few characters');
    await getFirstCharacters();
    await createCharacterCards();
    console.log('fetching from API for other 800+ characters');
    await getCharacters();
    await createCharacterCards();
    await listenForFavorite();
}

// if the character array exists already in local storage, go get it and use that
// otherwise fetch all the api data, pop localstorage and then use that
function checkLocalStorage() {
    let myObj = localStorage.getItem('Character Array');
    if(myObj !== null) {
        characterArray = JSON.parse(myObj);
        console.log(characterArray);
        createCharacterCards();
        listenForFavorite();
    } else {
        console.log('else statement trigger');
        mortyAppInit();}
}

function updateLocalStorage() {
    localStorage.setItem('Character Array', JSON.stringify(characterArray));
}

checkLocalStorage();
favoriteBarSetup();
//clearFavorites();
function searchMortyPad(event) {
    // here I want to take each key up event and use it to search through all the
    // name values of each DOM element. Display hidden on all cards that do not match
    let searchValue = event.target.value.toUpperCase(); 
    console.log(searchValue);
    let characterCardNodesList = document.querySelectorAll('div.characterCard');
    let characterNameList = document.querySelectorAll('div.characterNames');
    for(let i = 0; i < characterCardNodesList.length; i++) {
        let characterName = characterNameList[i].innerHTML.toUpperCase();
        console.log(characterName);
        if(characterName.indexOf(searchValue) > -1) {
            characterCardNodesList[i].classList.remove('hidden');
        }
        else {
            characterCardNodesList[i].classList.add('hidden');
        }
    }
}
// favorite functionality building + local storage interaction
function listenForFavorite() {
    const favoriteButton = document.querySelectorAll('.favoriteButton');
    favoriteButton.forEach((favorite) => favorite.addEventListener('click', favoriteOnClick));
}

function favoriteOnClick(event) {
    addToFavorites(event);
    changeHeartDisplay(event);
}
//populate favorite bar with localstorage faves or empty favorite message
function favoriteBarSetup() {
    let emptyFavoriteCard = document.createElement('div');
    let emptyFavoriteCardText = document.createElement('p');
    emptyFavoriteCard.classList.add('favoriteCard', 'hidden');
    emptyFavoriteCard.id = 'empty-favorite-message';
    emptyFavoriteCardText.innerText = 'Use the heart icon to select your favorite Rick and Morty Characters!';
    favoriteBar.appendChild(emptyFavoriteCard);
    emptyFavoriteCard.appendChild(emptyFavoriteCardText);
    if(localStorage.length === 1) { // It might be better to create a favorites array in localstorage and check to see if that has a length >0 
        emptyFavoriteCard.classList.remove('hidden');
    } else {pinExistingFavorites();}
}

function addToFavorites(event) {
    let selectedFavoriteCardIndex = event.target.dataset.index; // each heart as an id that matches the id of the card
    event.target.classList.toggle('favorited');//red heart to black heart toggle
    if(event.target.classList.contains('favorited')) {
        console.log('this is one of my faves now');
        characterArray[selectedFavoriteCardIndex].favorite = true; 
        let serializedObj = JSON.stringify(characterArray[selectedFavoriteCardIndex]);// stringify the selected cards card object data
        window.localStorage.setItem(`${characterArray[selectedFavoriteCardIndex].name}`, `${serializedObj}`);
        console.log(characterArray[selectedFavoriteCardIndex]);
        updateLocalStorage();
        pinFavorite(characterArray[selectedFavoriteCardIndex]);
    } else { 
        console.log('this is NOT one of my faves now');
        characterArray[selectedFavoriteCardIndex].favorite = false;
        let serializedObj = JSON.stringify(characterArray[selectedFavoriteCardIndex]);// stringify the selected cards card object data
        localStorage.removeItem(`${characterArray[selectedFavoriteCardIndex].name}`, `${serializedObj}`);
        updateLocalStorage();
        unpinFavorite(characterArray[selectedFavoriteCardIndex]);
    }}

function changeHeartDisplay(event) {
    //debugger;
    if(event.target.classList.contains('favorited')) {
        event.target.src = 'img/favorite-heart.svg';
    } else { event.target.src = 'img/not-favorite-heart.svg';}
}
//pin all favorites stored in local storage on load
function pinExistingFavorites() {
    for(let i = 0; i < localStorage.length; i++) {
        let myLocalStorageObj = localStorage.getItem(localStorage.key(i));
        if(localStorage.key(i) === 'Character Array') continue;
        let favCharacterObj = JSON.parse(myLocalStorageObj);
        console.log(favCharacterObj);
        let favoriteCards = document.createElement('div');
        favoriteCards.classList.add('favoriteCard');
        favoriteCards.id = `favorite-card-${favCharacterObj.id}`;
        let favoriteCardImg = document.createElement('img');
        favoriteCardImg.src = favCharacterObj.image;
        let favoriteCardName = document.createElement('div');
        favoriteCardName.innerText = favCharacterObj.name; 
        let favoritePin = document.createElement('img');
        favoritePin.src = 'img/thumb-tack.svg';
        favoriteBar.appendChild(favoriteCards);
        favoriteCards.appendChild(favoriteCardImg);
        favoriteCards.appendChild(favoriteCardName);
        favoriteCards.appendChild(favoritePin);
    }
}
function pinFavorite(character) {
    //remove empty favorite card helper tool 
    let emptyFavoriteCard = document.getElementById('empty-favorite-message');
    emptyFavoriteCard.classList.add('hidden');
    //if favorite -> create DOM element 
    let favoriteCard = document.createElement('div');
    favoriteCard.classList.add('favoriteCard');
    favoriteCard.id = `favorite-card-${character.id}`;
    let favoriteCardImg = document.createElement('img');
    favoriteCardImg.src = character.image;
    let favoriteCardName = document.createElement('div');
    favoriteCardName.innerText = character.name; 
    favoriteBar.appendChild(favoriteCard);
    favoriteCard.appendChild(favoriteCardImg);
    favoriteCard.appendChild(favoriteCardName);
}
function unpinFavorite(character) {
    let unfavoriteCharacter = document.getElementById(`favorite-card-${character.id}`);
    unfavoriteCharacter.remove();
}