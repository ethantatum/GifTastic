$(document).ready(function() {
    // VARIABLES
    // ============================================================================

    // Initial array of bands
    var bands = ["Metallica", "Green Day", "Van Halen", "OK Go"];


    // FUNCTIONS
    // ============================================================================

    // displayBandGif function re-renders the HTML to display the appropriate content
    function displayBandGif() {

        let band = $(this).attr("data-name");
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${band}&api_key=TqXsiW057A6TfMyJpYRpF4IynG9rHxk5&limit=10`;

        // Creates AJAX call for the specific band button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // Creates a div to hold the band
            //$(`#bands-view`).append(`Title: ${response.Title}<br>`);
            // Retrieves the Rating Data
            // Creates an element to have the rating displayed
            // Displays the rating
            //$(`#bands-view`).append(`Rating: ${response.Rated}<br>`);
            // Retrieves the release year
            // Creates an element to hold the release year
            // Displays the release year
            //$(`#bands-view`).append(`Release Year: ${response.Released}<br>`);
            // Retrieves the plot
            // Creates an element to hold the plot
            // Appends the plot
            //$(`#bands-view`).append(`Plot: ${response.Plot}<br>`);
            // Creates an element to hold the image
            // Appends the image
            //$(`#bands-view`).append(`<img src=${response.Poster}><br>`);
            // Puts the entire band above the previous bands.
        });

    }

    // Function for displaying band data
    function renderButtons() {

        // Delete the content inside the bands-view div prior to adding new bands
        $(`#bands-view`).empty();

        //Loop through the array of bands, then generate buttons for each band in the array
        for(let i = 0; i < bands.length; i++) {
        $(`#bands-view`)
                .append(`<button>${bands[i]}</button>`)
                .addClass("band");
        }

    }

      // This function handles events where the add band button is clicked
      $("#add-band").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        let band = $("#movie-input").val().trim();

        // The band from the textbox is then added to our array
        bands.push(band);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "band"
      $(document).on("click", ".band", displayBandGif);

      // Calling the renderButtons function to display the initial list of bands
      renderButtons();








});