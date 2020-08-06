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
import { getMovies, addMovie, editMovie, deleteMovie } from "./api";

const formCreate = $("#form-create");
const formEdit = $("#form-edit");
const createTab = $("#create-tab");
const editTab = $("#edit-tab");
const editTitle = $("#movieTitleEdit");
const editRating = $("#movieRatingEdit");
const movieList = $("#movieList");
let radioBtns = {};
let deleteBtns = {};
let editID = '';

const render = () => getMovies().then((movies) => {
    movieList.html("");
    editTab.removeClass("disabled");
    movies.forEach(({title, rating, id}) => {
        movieList.append(
            `<div class="d-flex align-items-baseline">` +
                `<input type="radio" id="selector${id}" name="selected-movie" value="movie${id}" class="d-none">` +
                `<label for="selector${id}" id="lbl${id}" class="col-10">` +
                    `<div class="d-flex">` +
                        `<div class="col-3"><div><span class="mTitle">${title}</span></div><div>rating: <span class="mRating">${rating}</span></div></div>` +
                        `<div><button class="d-none btn" id="deleteBtn${id}"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button></div>` +
                    `</div>` +
                `</label>` +
            `</div>`);
    });
    radioBtns = $("#movieList input");
    deleteBtns = $("#movieList button")
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

    // Event Listener for Delete Button
    let prevRadioBtn = undefined;
    deleteBtns.click((e) => {
        if (prevRadioBtn !== undefined) {
            prevRadioBtn.attr("checked", false);
        }
        deleteBtns.removeAttr("checked");
        const id = e.currentTarget.id.split("deleteBtn").join("");
        const currentRadioBtn = $(`#movieList #selector${id}`);
        currentRadioBtn.attr("checked", true);
        prevRadioBtn = currentRadioBtn;
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
