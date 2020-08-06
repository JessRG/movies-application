/**
 * es6 modules and imports
 */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sayHello from './hello';
const $ = require("jquery");

sayHello('World');

/**
 * require style imports
 */
// const {getMovies, addMovie, editMovie} = require('./api.js');
import { getMovies, addMovie, editMovie } from "./api";

const formCreate = $("#form-create");
const formEdit = $("#form-edit");
const createTab = $("#create-tab");
const editTab = $("#edit-tab");
const editTitle = $("#movieTitleEdit");
const editRating = $("#movieRatingEdit");
const movieList = $("#movieList");
let radioBtns = {};
let editID = '';


const render = () => getMovies().then((movies) => {
    movieList.html("");
    movies.forEach(({title, rating, id}) => {
        movieList.append(
            `<div class="d-flex align-items-baseline">` +
                `<input type="radio" id="selector${id}" name="selected-movie" value="movie${id}" class="d-none">` +
                `<label for="selector${id}" id="lbl${id}" class="col-10">` +
                    `<div class="d-flex">` +
                        `<div class="col-5"><div><span class="mTitle">${title}</span></div><div>rating: <span class="mRating">${rating}</span></div></div>` +
                        `<div><button class="d-none" id="deleteBtn${id}">Delete</button></div>` +
                    `</div>` +
                `</label>` +
            `</div>`);
    });
    radioBtns = $("#movieList input");
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

// Function to render movies to the page
const renderMovies = () => {
    render();
}

// Function to handle the edit form section
const handleEditForm = () => {
    movieList.children().each(function (index) {
        $(`#deleteBtn${index + 1}`).removeClass('d-none');
        $(`#selector${index + 1}`).removeClass('d-none');
    });

    // Event Listener for Radio Buttons when selected
    radioBtns.click(() => {
        $.each(radioBtns, function (idx) {
            if ($(`#movieList #selector${idx + 1}`).prop("checked")) {
                const movieTitle = $(`#lbl${idx + 1} .mTitle`).text();
                const movieRating = $(`#lbl${idx + 1} .mRating`).text();
                editTitle.val(movieTitle);
                editRating.val(movieRating);
                editID = idx + 1;
            }
        });
    });
}

renderMovies();

// Event Listener for Create Tab
createTab.click(() => {
    movieList.children().each(function (index) {
        $(`#deleteBtn${index + 1}`).addClass('d-none');
        $(`#selector${index + 1}`).addClass('d-none');
    });
});

//Event Listener for Edit Movie Tab
editTab.click(() => {
    handleEditForm();
});

// Event Listener for Create Movie form
formCreate.on("submit", (e) => {
    e.preventDefault();
    const newMovie = $("#movieTitleAdd").val();
    const rating = $("#movieRatingAdd").val();
    getMovies().then((data) => {
        movieList.html("");
        addMovie(newMovie, rating, data.length)
            .then(renderMovies);
    });
});

// Event Listener for Edit Movie form
formEdit.on("submit", (e) => {
    e.preventDefault();
    editMovie(editID, {
        title: editTitle.val(),
        rating: editRating.val()
    }).then(() => {
        render().then(handleEditForm);
    });
});


