(function () {

  console.log('sanity check!');

})();


$(document).ready(function(){
  var title = document.getElementsByTagName("title")[0].innerHTML; //set navbar active class based on title
  switch(title) {
   case 'Authors':
       $("#authors").addClass( "active" );
       break;
   case 'Books':
       $("#books").addClass( "active" );
       break;
   default:

  }


});

$( "#filter" ).on( "click", function() {
  $( "#filterForm" ).toggle();
});

//fill book update modal form
$(document).on('click', '.update-book-btn', function() {
  const $this = $(this);
  const bookID = $this.attr('data-id');
  const description = $this.attr('data-description');
  const cover = $this.attr('data-cover');
  const genre = $this.attr('data-genre');
  const title = $this.attr('data-title');
  $('#form-title').val(title);
  $('#form-genre').val(genre);
  $('#form-cover').val(cover);
  $('#form-description').val(description);
  $('#form-id').val(bookID);
});

//submit book update modal form
$(document).on('submit', '#modal-book-form', function(event) {
  event.preventDefault();
  const $descriptionUpdate = $('#form-description').val();
  const $coverUpdate = $('#form-cover').val();
  const $genreUpdate = $('#form-genre').val();
  const $titleUpdate = $('#form-title').val();
  const $bookIDUpdate = $('#form-id').val();
  const payload = {
    description: $descriptionUpdate,
    cover: $coverUpdate,
    genre: $genreUpdate,
    title: $titleUpdate,
    id: $bookIDUpdate
  };
  $.ajax({
    type: 'PUT',
    url: `/api/v1/${$bookID}`,
    data: payload
  })
  .done((data) => {
    $('#myModal').modal('toggle');
    location.reload();
    console.log(data);
  })
  .fail((err) => {
    console.log(err);
  });
});
