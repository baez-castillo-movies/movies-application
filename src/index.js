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
        document.querySelector(".container").innerHTML = "<div class='d-flex flex-wrap movies-back' id='movies'></div>"
        document.querySelector("#current-movie").innerHTML = "<option id='first-option'>Select a movie</option>"
        document.querySelector("#mcurtain").removeAttribute('checked')
        document.querySelector('#mcurtain').setAttribute("value","off")
        document.querySelector('#movieBtn').removeAttribute('disabled')
        document.querySelector('#edit-movie-btn').removeAttribute('disabled')

        for (let i = 0; i < movies.length; i++) {
            $("#movies").append(`<div class='card m-2 text-center card-width' id='${movies[i].id}'>
                                <div class="card-body text-wrap">
                                <h5>${movies[i].title}</h5>
                                <p class="card-text p-0 m-0 ">Rating: ${movies[i].rating}</p>
                                <p class="card-text p-0 m-0 mb-2">Genre: ${movies[i].genre}</p>
                                <button type="button" class="delete-btn btn btn-danger">Delete</button></div></div>`)
            $("#current-movie").append(`<option>${movies[i].title}</option>`)
        };
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}

makeMovies();


// adds movies to the db.json
document.querySelector('#movieBtn').addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector('#movieBtn').setAttribute('disabled','')
    document.querySelector('#edit-movie-btn').setAttribute('disabled','')
    let mTitle = document.querySelector('#title').value;
    let mRate = document.querySelector('#rating').value;
    let mGenre =document.querySelector('#genre').value;
    let movieInput = {
        title: mTitle,
        rating: mRate,
        genre: mGenre
    }
    fetch('/api/movies', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(movieInput)
    })
        .then()
        .catch((error) => {
            console.log(error);
        })
    makeMovies();
});


// allows movie to be called to edit
document.querySelector('#current-movie').addEventListener("click", function () {
    let dropdownValue = document.querySelector('#current-movie').value;
    fetch('/api/movies').then(response => response.json()).then(movies => {
        movies.forEach(({title, rating, genre, id}) => {
            if (dropdownValue === title) {
                document.querySelector('#movie-id').innerHTML = id
                document.querySelector('#movie-id').style.visibility = 'hidden'
                document.querySelector('#edited-title').value = dropdownValue
                document.querySelector('#edit-genre').value = genre
                document.querySelector('#edit-rating').value = rating
            }
        })
    });
})


// when this button is clicked the selected movie will be edited in db
document.querySelector('#edit-movie-btn').addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector('#movieBtn').setAttribute('disabled','')
    document.querySelector('#edit-movie-btn').setAttribute('disabled','')
    let dropdownIdValue = document.querySelector('#movie-id').innerHTML;
    fetch(`/api/movies/${dropdownIdValue}`, {
        method: "PATCH",
        body: JSON.stringify({
            title: document.querySelector('#edited-title').value,
            rating: document.querySelector('#edit-rating').value,
            genre: document.querySelector('#edit-genre').value
        }),
        headers: {"Content-Type": "application/json"}
    }).then().catch(error => console.log(error));
    makeMovies();
})


// delete buttons on the movies
$(document).on("click", "button.delete-btn", function(e){
    e.preventDefault();
    document.querySelector('#movieBtn').setAttribute('disabled','')
    document.querySelector('#edit-movie-btn').setAttribute('disabled','')
    let deleteMovieId = $(this).parent("div").parent("div").attr("id");
    fetch(`/api/movies/${deleteMovieId}`, {method: "DELETE"})
        .then(response => response.json())
        .then(movies => console.log(movies))
        .catch(error => console.log(error))
    makeMovies();
})