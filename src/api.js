const $ = require("jquery");

module.exports = {
  getMovies: () => {
    const subtitle = $(".container h3").html("Loading...");
    return fetch('/api/movies')
      .then(response => {
        subtitle.html("");
        return response.json();
      });
  }
};
