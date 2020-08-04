/**
 * es6 modules and imports
 */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sayHello from './hello';
sayHello('World');

const $ = require("jquery");

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  const para = $(".col p");
  para.html("");
  movies.forEach(({title, rating, id}) => {
    para.append(`<div id=${id}>id#${id} - ${title} - rating: ${rating}</div>`);
  });

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
