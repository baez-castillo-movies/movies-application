/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
// const {getMovies} = require('./api.js');
import { getMovies } from './api';
// import {formClick} from "./form";

console.log(getMovies);

let makeMovies = () => {
  getMovies().then((movies) => {
    // console.log('Here are all the movies:');
    document.querySelector(".container").innerHTML = "<ul id='movies'></ul>"
    movies.forEach(({title, rating, id}) => {
      let list = document.createElement('li');
      let currentMovie = document.createTextNode(`ID:${id} Title:${title} Rating:${rating}`);
      list.appendChild(currentMovie);
      document.querySelector('#movies').appendChild(list);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}

makeMovies();

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





