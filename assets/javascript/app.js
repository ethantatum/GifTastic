$(document).ready(function() {
    // VARIABLES
    // ============================================================================

    // Initial array of cartoons
    let cartoons = [`ThunderCats`, `He-Man`, `Transformers`, `She-Ra`, `DuckTales`, `Inspector Gadget`];
     


    // FUNCTIONS
    // ============================================================================

    // displayToonGif function re-renders the HTML to display the appropriate content
    function displayToonGif() {
        $(`#toons-view-one`).empty();
        $(`#toons-view-two`).empty();
        $(`#toons-view-three`).empty();

        let toon = $(this).attr(`data-name`)
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${toon}+cartoon&api_key=TqXsiW057A6TfMyJpYRpF4IynG9rHxk5&limit=10&rating=g&rating=pg&rating=pg-13`;

        // Creates AJAX call for the specific toon button being clicked
        $.ajax({
            url: queryURL,
            method: `GET`
        }).then(function(response) {
            console.log(response);
            console.log(response.data);
            

            for(let i = 0; i < 4; i++) {

                
                $(`#toons-view-one`).append(`<img src=${response.data[i].images.fixed_width.url}><br>`);
                $(`#toons-view-one`).append(`Rating: ${response.data[i].rating}<br>`);

            } 
            for(let k = 4; k < 7; k++) {

                
                $(`#toons-view-two`).append(`<img src=${response.data[k].images.fixed_width.url}><br>`);
                $(`#toons-view-two`).append(`Rating: ${response.data[k].rating}<br>`);

            }
            for(let l = 7; l < 10; l++) {

                
                $(`#toons-view-three`).append(`<img src=${response.data[l].images.fixed_width.url}><br>`);
                $(`#toons-view-three`).append(`Rating: ${response.data[l].rating}<br>`);

            }
        });

    }

    // Function for displaying toon data
    function renderButtons() {

        // Delete the content inside the toons-view div prior to adding new toons
        $(`#buttons-view`).empty();

        //Loop through the array of toons, then generate buttons for each toon in the array
        for(let j = 0; j < cartoons.length; j++) {
            let b = $(`<button>`); 
            b.addClass(`toon`);
            b.css(`float`, `left`);
            b.attr(`data-name`, cartoons[j]);
            b.text(cartoons[j]);
            $(`#buttons-view`).append(b);
        }

    }

      // This function handles events where the add toon button is clicked
      $("#add-toon").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        let toon = $(`#toon-input`).val().trim();

        // The toon from the textbox is then added to our array
        cartoons.push(toon);

        // Calling renderButtons which handles the processing of our cartoons array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "toon"
      $(document).on(`click`, `.toon`, displayToonGif);

      // Calling the renderButtons function to display the initial list of cartoons
      renderButtons();








});