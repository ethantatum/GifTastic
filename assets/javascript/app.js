$(document).ready(function() {
    // VARIABLES
    // ============================================================================

    // Initial array of cartoons
    var cartoons = ["ThunderCats", "He-Man", "G.I. Joe", "She-Ra", "DuckTales", "Inspector Gadget"];


    // FUNCTIONS
    // ============================================================================

    // displayToonGif function re-renders the HTML to display the appropriate content
    function displayToonGif() {

        let toon = $(this)
                .attr("data-name")
                .replace(' ', '+');
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${toon}&api_key=TqXsiW057A6TfMyJpYRpF4IynG9rHxk5&limit=10`;

        // Creates AJAX call for the specific toon button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // Creates a div to hold the toon
            //$(`#toons-view`).append(`Title: ${response.Title}<br>`);
            // Retrieves the Rating Data
            // Creates an element to have the rating displayed
            // Displays the rating
            //$(`#toons-view`).append(`Rating: ${response.Rated}<br>`);
            // Retrieves the release year
            // Creates an element to hold the release year
            // Displays the release year
            //$(`#toons-view`).append(`Release Year: ${response.Released}<br>`);
            // Retrieves the plot
            // Creates an element to hold the plot
            // Appends the plot
            //$(`#toons-view`).append(`Plot: ${response.Plot}<br>`);
            // Creates an element to hold the image
            // Appends the image
            //$(`#toons-view`).append(`<img src=${response.Poster}><br>`);
            // Puts the entire toon above the previous toons.
        });

    }

    // Function for displaying toon data
    function renderButtons() {

        // Delete the content inside the toons-view div prior to adding new toons
        $(`#toons-view`).empty();

        //Loop through the array of toons, then generate buttons for each toon in the array
        for(let i = 0; i < cartoons.length; i++) {
        $(`#toons-view`)
                .append(`<button>${cartoons[i]}</button>`)
                .addClass("band");
        }

    }

      // This function handles events where the add toon button is clicked
      $("#add-toon").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        let toon = $("#toon-input").val().trim();

        // The toon from the textbox is then added to our array
        cartoons.push(toon);

        // Calling renderButtons which handles the processing of our cartoons array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "toon"
      $(document).on("click", ".toon", displayToonGif);

      // Calling the renderButtons function to display the initial list of cartoons
      renderButtons();








});