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
