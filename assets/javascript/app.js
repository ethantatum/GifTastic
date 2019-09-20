$(document).ready(function () {
  // VARIABLES
  // ============================================================================

  // Initial array of cartoons
  let cartoons = [`thundercats`, `rainbow brite`, `he-man`, `care bears`, `transformers`, `she-ra`, `ducktales`, `inspector gadget`];

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
    }).then(function (response) {
      console.log(response);
      console.log(response.data);

      for (let i = 0; i < response.data.length; i++) {

        let imageBox = $(`<div>`).addClass(`imageBox`);
        let image = $(`<img class="gif" src=${response.data[i].images.fixed_width_still.url}>`);
        image.attr(`data-animate`, response.data[i].images.fixed_width.url)
          .attr(`data-still`, response.data[i].images.fixed_width_still.url)
          .attr(`data-state`, `still`);
        imageBox.append(image)
          .append(`<br>`);
        imageBox.append(`Rating: ${response.data[i].rating}<br>`).css(`text-align`, `center`);
        $(`#toons-view`).append(imageBox);

      }

    });

  }

  // Function for displaying toon data
  function renderButtons() {

    // Delete the content inside the toons-view div prior to adding new toons
    $(`#buttons-view`).empty();
    $(`input`).text(``);

    //Loop through the array of toons, then generate buttons for each toon in the array
    for (let j = 0; j < cartoons.length; j++) {
      let b = $(`<button>`);
      b.addClass(`toon`);
      b.attr(`data-name`, cartoons[j]);
      // Make the first character uppercase
      let buttonText = cartoons[j].charAt(0).toUpperCase() + cartoons[j].slice(1);
      b.text(buttonText);
      $(`#buttons-view`).append(b);
    }

  }

  // This function handles events where the add toon button is clicked
  $("#add-toon").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    let toon = $(`#toon-input`).val().trim().toLowerCase();

    // Check for empty input
    if (toon == "") {
      alert(`Please enter a cartoon to add!`);
    } else if (cartoons.indexOf(toon) > -1) {
      alert(`${toon.charAt(0).toUpperCase() + toon.slice(1)} is already added - try another one!`);
      $(`#toon-input`).val(``);
    } else {
      // The toon from the textbox is then added to our array
      cartoons.push(toon);
      // Then the input box is cleared of user text
      $(`#toon-input`).val(``);

      // Calling renderButtons which handles the processing of our cartoons array
      renderButtons();
    }

  });

  // Adding click event listeners to all elements with a class of "toon"
  $(document).on(`click`, `.toon`, displayToonGif);

  // Calling the renderButtons function to display the initial list of cartoons
  renderButtons();

  // Adding click event listener to gifs to start and stop animation
  $("#toons-view").on("click", ".gif", function () {
    let state = $(this).attr(`data-state`);

    if (state === `still`) {
      $(this).attr(`src`, $(this).attr(`data-animate`));

      $(this).attr(`data-state`, `animate`);
    }
    if (state === `animate`) {
      $(this).attr(`src`, $(this).attr(`data-still`));

      $(this).attr(`data-state`, `still`);
    }
    console.log(this);
  });

});