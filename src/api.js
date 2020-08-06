const $ = require("jquery");

const movies = (obj) => {
    $("#movieList").html("Loading...");
    if (Object.keys(obj).length < 2) {
        return fetch(obj.url).then(response => {
            return response.json();
        })
    } else {
        return fetch(obj.url, obj.options).then(response => {
            return response.json();
        })
    }
}

// module.exports = {
const getMovies = () => {
    // Set loading placeholder
    // $(".container h3").html("Loading...");
    return movies({
        url: '/api/movies'
    });
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
    return movies({url, options})
}

// function to edit a movie
const editMovie = (id, editMovie) => {
    const url = `/api/movies/${id}`;
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMovie)
    }
    return movies({url, options})
}
// };

export { getMovies, addMovie, editMovie };
