class characterCard {
    constructor(name, id, status, species, location) {
        this.name = name;
        this.id = id;
        this.status = status;
        this.species = species;
        this.location = location;
        this.favroite = false; 
    }

    display();
    favorite();
    hover();
    buildCard();
}
