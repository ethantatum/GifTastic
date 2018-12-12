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

// This function swaps the still gif with the animated gif when the image is clicked
$('.animate-link img').on('click', function() {

    let $this   = $(this),
            $index  = $this.index(),
                
            //$img    = $this.children(`img`),
            $imgSrc = $this.attr('src'),
            $imgAlt = $this.attr('data-alt');
            //$imgExt = $imgSrc.split('_');
            console.log($imgSrc);
            //console.log($imgExt);
                
    if($imgExt[1] === 's.gif') {
        $img.attr('src', $img.data('alt')).attr('data-alt', $imgSrc);
    } else {
        $img.attr('src', $imgAlt).attr('data-alt', $img.data('alt'));
    }
    
    });