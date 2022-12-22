# local-storage-favorites
An app for favoriting Rick and Morty characters and saving them to local storage 

## App Objective
Create a web app for viewing characters from the Rick and Morty API. This app allows the user to add and remove characters from their favorites and view a list of their favorites, as well as browse the full list of characters available from the API. 

## Learning Objective
Become familiar with adding, removing, and editing items in your browser's local storage. Fetch and render data from an external API.

## App Functionality
Similar to the pokedex, this app will fetch characters from the Rick and Morty API and render them as cards in a list, displaying the name, image, etc of each character (there is a lot of data available from this API, you can choose what data you want to display to the user). 
Example: ![image](https://user-images.githubusercontent.com/25269980/209225130-3f1300a1-8b70-4a9c-b960-c22fe149db2d.png)

Addiitonally, a button should render with each character so that the user can add that character to their favorites. This button should be the image of a star or heart that changes appearance when a character is selected as a favorite, making it clear to the user the character has been favorited.
![image](https://user-images.githubusercontent.com/25269980/209225624-5c229cd9-489d-4d21-8d18-393804df0e52.png)

A list of the user's favorites should render in a section at the top of the page, above the general list of characters. When a character is favorited, it should be added to this section. The user shoud be able to remove the character from their favorites by reselecting the favorite icon on the card. 

## Recipe

1. Basically, recreate the steps for building the pokedex, but use the Rick and Morty API instead. The javascript pattern for this will be super similar, but you'll need to read through the API documentation to figure out how to fetch the list of characters. If you have time and want to implement search and filtering, go for it! It's not essential but would be good practice to do that again. 
2. Once you have the list of characters styled and rendering, create the functionality for adding and removing characters to favorites.
  1. Characters will be saved as favorites in the local storage of your browser. Do some research and become comfortable with the concept of local storage and how you interact with it through javascript. Recommended resources:
    * https://www.youtube.com/watch?v=AUOzvFzdIk4&ab_channel=dcode
    * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  2. I encourage you to take some time to experiment with adding and accessing data to your local storage directly from your project so that you have a working understanding of local storage before continuing on. 
  3. Add an "Add to favorites" button (a plain button element is fine for now) to your character card elements. When this button is clicked, the character object should be added to an array of favorites stored in local storage. Example:
<img width="1022" alt="Screen Shot 2022-12-22 at 1 29 50 PM" src="https://user-images.githubusercontent.com/25269980/209229823-28e5dc3c-2e7f-4cd2-9faa-305658a41bb1.png">
  4. Create and style your favorites section at the top of the page. Render the characters stored in favorites. 
  5. Add a "Remove from favorites" button to the character cards. When this button is pressed, the character is removed from the list of favorites in local storage and should no longer appear in the rendered favorites section. 
  6. Combine these two buttons into one favorites icon button that changes appearance based on whether the character is favorited or not
3. Stretch goals:
  * Rather than storing the entire character object in local storage, switch to only saving the ID of the character in the favorites array. When rendering the user's favorites, use that ID to find the character object in the general list of characters - this pattern is closer to how data is accessed and stored in a database. It might be tricky to figure out at first, but I highly recommend taking on this stretch goal!
  * Create a new page for displaying the favorited characters, and a sidebar or top bar that lets the user switch between the general list of characters and the list of favorites (instead of the favorites and general list being on the same page)
  * Allow the user to input a note about their favorite characters. The note should be saved with the character in local storage, and the user should be able to edit these notes. 
  * Deploy your site using Netlify


