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
    url: `/api/v1/books/${$bookIDUpdate}`,
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

//fill author update modal form
$(document).on('click', '.update-author-btn', function() {
  const $this = $(this);
  const authorID = $this.attr('data-id');
  const first_nameUpdate = $this.attr('data-first_name');
  const last_nameUpdate = $this.attr('data-last_name');
  const biographyUpdate = $this.attr('data-biography');
  const portraitUpdate = $this.attr('data-portrait');
  $('#form-first_name').val(first_nameUpdate);
  $('#form-last_name').val(last_nameUpdate);
  $('#form-biography').val(biographyUpdate);
  $('#form-portrait').val(portraitUpdate);
  $('#form-id').val(authorID);
});

//submit author update modal form
$(document).on('submit', '#modal-author-form', function(event) {
  event.preventDefault();
  const $first_nameUpdate = $('#form-first_name').val();
  const $last_nameUpdate = $('#form-last_name').val();
  const $biographyUpdate = $('#form-biography').val();
  const $portraitUpdate = $('#form-portrait').val();
  const $authorIDUpdate = $('#form-id').val();
  const payload = {
    first_name: $first_nameUpdate,
    last_name: $last_nameUpdate,
    biography: $biographyUpdate,
    portrait: $portraitUpdate,
    id: $authorIDUpdate
  };
  $.ajax({
    type: 'PUT',
    url: `/api/v1/authors/${$authorIDUpdate}`,
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

// delete author button
$(document).on('click', '.delete-author-btn', function() {
  const answer = confirm('Are you sure?');
  if (answer) {
    const $this = $(this);
    const authorID = $this.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/api/v1/authors/${authorID}`
    })
    .done((data) => {
      location.reload();
      console.log(data);
    })
    .fail((err) => {
      console.log(err);
    });
  }
});

// delete book button
$(document).on('click', '.delete-book-btn', function() {
  const answer = confirm('Are you sure?');
  if (answer) {
    const $this = $(this);
    const bookID = $this.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/api/v1/books/${bookID}`
    })
    .done((data) => {
      location.reload();
      console.log(data);
    })
    .fail((err) => {
      console.log(err);
    });
  }
});
