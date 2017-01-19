$(document).ready(function() {
  $('form#artist-form').submit(function(event){
    event.preventDefault()
    // console.log("this is working")
    const URL = "https://api.spotify.com/v1/search"
    let $input = $('input#artist-query')
    let userInput = $input.val()
    let query = userInput.split(' ').join('+')
    $input.val('')


  $.ajax({
    url: `${URL}?q=${query}&type=artist`,
    success: function(data){
      // var items = url.artists.items
      console.log(data)
      let artistList = $('ul#artist-list')
      let errorMessageLocation = $('form')
      artistList.html(' ')
      if (data.artists.items.length === 0) {
        errorMessageLocation.prepend('<p>Sorry, no artists found.</p>')
      } else {
      data.artists.items.forEach(function( artist ){
        let name = artist.name
        artistList.append(`<li>${name}</li>`)
      })}
    }
  })
})
})
