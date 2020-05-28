/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
// const {getMovies} = require('./api.js');
import {getMovies} from './api';

// creates a list after the promise returns
let makeMovies = () => {
  getMovies().then((movies) => {
    // console.log('Here are all the movies:');
    document.querySelector(".container").innerHTML = "<ul id='movies'></ul>"
    movies.forEach(({title, rating, id}) => {
      // creates and shows the current movie db
      let list = document.createElement('li');
      let currentMovie = document.createTextNode(`ID:${id} Title:${title} Rating:${rating}`);
      list.appendChild(currentMovie);
      document.querySelector('#movies').appendChild(list);

      // populates the dropdown with the current movies in the db
      let dropdown = document.createElement("option");
      let currentDropdown = document.createTextNode(`${title}`);
      dropdown.appendChild(currentDropdown);
      document.querySelector("#current-movie").appendChild(dropdown);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}

makeMovies();

// adds movies to the db.json
document.querySelector('#movieBtn').addEventListener("click", function (e) {
  e.preventDefault();
  let mTitle = document.querySelector('#title').value;
  let mRate = document.querySelector('#rating').value;
  let movieInput = {
    title: mTitle,
    rating: mRate,
  }
  fetch('/api/movies', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(movieInput)
  })
      .then()
      .catch((error) => {console.log(error);})
  makeMovies();
});



document.querySelector('#current-movie').addEventListener("click", function () {
  let dropdownValue = document.querySelector('#current-movie').value;
  console.log(dropdownValue);
});
