const RickAndMortyAPI = 'https://rickandmortyapi.com/api/character';
const characterArray = [];

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
    console.log(characterArray);
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
        console.log(characterArray[i].image);
        let name = document.createElement('div');
        let favoriteIcon = document.createElement('img');
        favoriteIcon.src = '/heart-16px.png';
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
}
mortyPadSetup();