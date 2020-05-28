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

  let mTitle = document.querySelector('#title').value;
  let mRate = document.querySelector('#rating').value;
  document.querySelector('#movieBtn').addEventListener("click", function (e) {
    e.preventDefault();
    var movieInput = {
      title: mTitle,
      rating: mRate,
      id: movies.length + 1
    }
    var URL = "/url/movies";
    var options = {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify(movieInput)

    }
    fetch(URL, options).then(response => response.JSON).then(movies => console.log(movies))
  });





