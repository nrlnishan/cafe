(function() {
	"use strict";
	$.holdReady(true);
    var timeList =["11:00 am","12:00 pm","12:30 pm","01:00 pm","01:30 pm","02:00 pm","02:30 pm","03:00 pm","03:30 pm","04:00 pm","05:00 pm"];
	$("#myCarousel").carousel();  

    /*navigate */
  $('body').scrollspy({target: ".navbar", offset: 10});
  $("#myNavbar a").on('click', function(event) {
   	if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 200, function(){
        window.location.hash = hash;
      });
    }  
  }); 

  $('#login').on('click',function(){
  	$('.nav li').each( function(index){
  		$(this).removeClass('active');
  	});
  });

  $('.menu-option').on('click', function(){
    $(this).addClass('active');
  });

  $('#time_input').autocomplete({
      source: timeList,
      minLength: 0
      });
  $('#time_input').focus(function() {
      $(this).autocomplete("search", $(this).val()
      );
  });
  $(".nav-tabs a").click(function(){
      $(this).tab('show');
  });

  /* multiple carousel */
  // Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
  interval: false
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  } else {
    $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
}); 
  
}());
