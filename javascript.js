// TO - DO 
// favorite button functions: change display when clicked, create pinned favorite card in fav bar, make 
// favorite characters in favorite bar UN-favorite-able; setting favorite boolen
// to true can be the circuit switch for these functions 
// local storage: using a similar function, we want to save the favorited/pinned characters in local storage so that 
// when the page is reloaded they stay pinned to the favorite board. localStorage.setItem will allow us to set a key
// value pair. Since the pinned favorite characters will display name, and image -- those are items we should opt to store
// API pagination: We should have the first fetch to the RickAndMortyAPI be for just the first page of characters, then a 
// subsequent fetch for the other ones to reduce the amount of time it takes to render the screen. 

const RickAndMortyAPI = 'https://rickandmortyapi.com/api/character';
const characterArray = [];
const searchInput = document.getElementById('filter-search');
searchInput.addEventListener('keyup', searchMortyPad);


async function getCharacters() {
    for(let i = 1; i <= 826; i++) {
        const APIResponse = await fetch(`${RickAndMortyAPI}/${i}`);
        const json = await APIResponse.json();
        let characterCard = {
            name: json.name,
            image: json.image,
            status: json.status,
            species: json.species,
            location: json.location.name,
            favorite: false
        };
        characterArray.push(characterCard);
    }
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
        favoriteIcon.src = '/red-heart.png';
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
async function mortyPadSetup() {
    await getCharacters();
    await createCharacterCards();
    await addFavoriteButtonFuncion();
}
mortyPadSetup();

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

function addFavoriteButtonFuncion() {
    const favoriteButton = document.querySelectorAll('.favoriteButton');
    favoriteButton.forEach((favorite) => favorite.addEventListener('click', favoriteOnClick));

}

function favoriteOnClick(event) {
    console.log(event);
// here I want to be able to click on the heart icon in any card and select it 
// as a favorite character. Each heart will need an event listener and when each 
// card is selected, I want to:
// 1. change the display of the heart, when selected
//changeHeartDisplay();
// 2. create copy of chosen card's image and name in favorite bar
//pinFavorite();
// 3. create function to remove from favorite bar by clicking -> change color of heart
//unpinFavorite();

}