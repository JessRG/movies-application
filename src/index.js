/**
 * es6 modules and imports
 */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sayHello from './hello';
sayHello('World');

const $ = require("jquery");
const formCreate = $("#form-create");

/**
 * require style imports
 */
const {getMovies, addMovie} = require('./api.js');

// * May need to make this a render function *
getMovies().then((movies) => {
  const para = $(".col p");
  $(".container h3").html("");
  movies.forEach(({title, rating, id}) => {
    para.append(`<div id=${id}>id#${id} - ${title} - rating: ${rating}</div>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

// Event Listener for Add Movie Button
formCreate.on("submit", (e) => {
  e.preventDefault();
  const newMovie = $("#movieTitle").val();
  const rating = $("#movieRating").val();
  getMovies().then((data) => {
    addMovie(newMovie, rating, data.length);
  });
})
