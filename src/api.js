const $ = require("jquery");

const movies = fetch('/api/movies').then(response => {
    return response.json();
});

module.exports = {
  getMovies: () => {
      // Set loading placeholder
    // $(".container h3").html("Loading...");
    return movies;
  },
    // function to add a new movie
    addMovie: (title, rating, length) => {
        const movie = {
            title: title,
            rating: rating,
            id: length + 1
        };

        const url = '/api/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        };
        fetch(url, options)
            .then((data) => console.log(data))
            .catch(/* handle errors */);
    }
};
