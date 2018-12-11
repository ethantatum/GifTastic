$(document).ready(function() {
    // VARIABLES
    // ============================================================================

    // Initial array of cartoons
    let cartoons = [`ThunderCats`, `He-Man`, `Transformers`, `She-Ra`, `DuckTales`, `Inspector Gadget`];
     


    // FUNCTIONS
    // ============================================================================

    // displayToonGif function re-renders the HTML to display the appropriate content
    function displayToonGif() {
        $(`#toons-view`).empty();

        let toon = $(this).attr(`data-name`)
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${toon}+cartoon&api_key=TqXsiW057A6TfMyJpYRpF4IynG9rHxk5&limit=10&rating=g&rating=pg&rating=pg-13`;

        // Creates AJAX call for the specific toon button being clicked
        $.ajax({
            url: queryURL,
            method: `GET`
        }).then(function(response) {
            console.log(response);
            console.log(response.data);
            

            for(let i = 0; i < response.data.length; i++) {

                let imageBox = $(`<div>`).addClass(`animate-link`);
                imageBox.append(`<img src=${response.data[i].images.fixed_width_still.url}><br>`)
                        .attr(`data-alt`, response.data[i].images.fixed_width.url);
                imageBox.append(`Rating: ${response.data[i].rating}<br>`).css(`text-align`, `center`);
                $(`#toons-view`).append(imageBox);
                console.log(imageBox);
            } 
            //Function to retrieve animated gif stored in `data-alt` class (https://www.hongkiat.com/blog/on-click-animated-gif/)
            let getGif = function() {
                let gif = [];
                $('.animate-link').each(function() {
                  let data = $(this).data('alt');
                  gif.push(data);
                });
                return gif;
              }
               let gif = getGif();
               console.log(gif);

            // Function to preload the animated gifs
            let image = [];
 
                $.each(gif, function(index) {
                image[index]     = new Image();
                image[index].src = gif[index];
                });
        });

    }





    // Function for displaying toon data
    function renderButtons() {

        // Delete the content inside the toons-view div prior to adding new toons
        $(`#buttons-view`).empty();

        //Loop through the array of toons, then generate buttons for each toon in the array
        for(let j = 0; j < cartoons.length; j++) {
            let b = $(`<button>`); 
            b.addClass(`toon`, `gif`);
            //b.css(`float`, `left`);
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


      // This function swaps the still gif with the animated gif when the image is clicked
      $('#toons-view').on('click', function() {
 
        let $this   = $(this),
                $index  = $this.index(),
                 
                $img    = $this.children('.animate-link'),
                $imgSrc = $img.attr('src'),
                $imgAlt = $img.attr('data-alt'),
                $imgExt = $imgAlt.split('_');
                 
        if($imgExt[1] !== 's.gif') {
            $img.attr('src', $img.data('alt')).attr('data-alt', $imgSrc);
        } else {
            $img.attr('src', $imgAlt).attr('data-alt', $img.data('alt'));
        }
       
      });





});