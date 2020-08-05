const $ = require("jquery");

const movies = (obj) => {
    $(".col p").html("Loading...");
    if (Object.keys(obj).length < 2) {
        return fetch(obj.url).then(response => {
            return response.json();
        })
    }
    else {
        return fetch(obj.url, obj.options).then(response => {
            return response.json();
        })
    }
}

module.exports = {
  getMovies: () => {
      // Set loading placeholder
    // $(".container h3").html("Loading...");
    return movies({
        url: '/api/movies'
    });
  },
    // function to add a new movie
    addMovie: (title, rating, length) => {
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
            //.then((data) => (data))
            //.catch(/* handle errors */);
    }
};
