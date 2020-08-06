const $ = require("jquery");

const movies = (obj) => {
    // set loading placeholder
    $("#movieList").html("Loading...");
    $("#edit-tab").addClass("disabled");
    if (Object.keys(obj).length < 2) {
        return fetch(obj.url)
            .then(response => response.json());
    } else {
        return fetch(obj.url, obj.options)
            .then(response => response.json());
    }
}

const getMovies = () => {
    return movies({ url: '/api/movies' });
}

// function to add a new movie
const addMovie = (title, rating, length) => {
    const movie = {
        title: title,
        rating: rating,
        id: length + 1
    };
    //console.log(Object.keys(movie).length);
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    };
    return movies({ url, options });
}

// function to edit a movie
const editMovie = (id, movie) => {
    const url = `/api/movies/${id}`;
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    };
    return movies({ url, options });
}

// function to delete a movie
const deleteMovie = (id, movie) => {
    const url = `/api/movies/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    };
    return movies({ url, options });
}

export { getMovies, addMovie, editMovie, deleteMovie };
