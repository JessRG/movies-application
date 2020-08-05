/**
 * es6 modules and imports
 */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sayHello from './hello';
sayHello('World');

const $ = require("jquery");
const formCreate = $("#form-create");
const formEdit = $("#form-edit");
const editTab = $("#edit-tab");
const createTab = $("#create-tab");

/**
 * require style imports
 */
const {getMovies, addMovie} = require('./api.js');
const movieList = $("#movieList");


// * May need to make this a render function *
const renderMovies = () => {
  getMovies().then((movies) => {
    $(".container p").html("");
    movies.forEach(({title, rating, id}) => {
      movieList.append(`<div id=${id}>${title} - rating: ${rating} <button class="d-none" id=deleteBtn${id}>Delete</button></div>`);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}
renderMovies();

// Event Listener for Add Movie Button
formCreate.on("submit", (e) => {
  e.preventDefault();
  const newMovie = $("#movieTitleAdd").val();
  const rating = $("#movieRatingAdd").val();
  getMovies().then((data) => {
    movieList.html("");
    addMovie(newMovie, rating, data.length)
        .then(renderMovies);
  });
})

//Event Listener for Edit Movie Button
editTab.click(function() {
  //console.log($(this)); calls editTab
  console.log(movieList);
  movieList.children().each(function(index) {
    $(`#deleteBtn${index + 1}`).removeClass('d-none');
        console.log("Removed class");
      })
})

createTab.click(function() {

  movieList.children().each(function (index) {
    $(`#deleteBtn${index + 1}`).addClass('d-none');
    console.log("Added d-none");
  })
})