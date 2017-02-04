(function() {
	"use strict";
	$.holdReady(true);
  var timeList =["11:00 am","12:00 pm","12:30 pm","01:00 pm","01:30 pm","02:00 pm","02:30 pm","03:00 pm","03:30 pm","04:00 pm","05:00 pm"];
	$("#myCarousel").carousel();  
  var categories;
    /*navigate */
  $('body').scrollspy({target: ".navbar", offset: 10});
  $("#myNavbar a").on('click', function(event) {
   	if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, function(){
        window.location.hash = hash;
      });
    }  
  }); 

  $('#login').on('click',function(){
  	$('.nav li').each( function(index){
  		$(this).removeClass('active');
  	});
  });

  $("#datepicker").datepicker();

  $('#time_input').autocomplete({
      source: timeList,
      minLength: 0
      });
  $('#time_input').focus(function() {
      $(this).autocomplete("search", $(this).val()
      );
  });
  //$('.nav-tabs').tab();

  /* multiple carousel */
  // Instantiate the Bootstrap carousel
  $('.multi-item-carousel').carousel({
    interval: 2500
  });

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


  //$.get( "http://192.168.100.2:8080/Restaurent_backend/api/category/", function( response ) {
    //categories = response.data;
    categories = [
      {
        category_id: 1,
        category_name: "Breakfast"
        },
        {
        category_id: 2,
        category_name: "Lunch"
        }
    ];
    categories.forEach(function(data){
      console.log(data.category_id);
      $('.menu-category .nav').append('<li><a data-toggle="tab" class="menu-name" href="' + 'category_' + data.category_id + '">' + data.category_name + '</a></li>');
      $('.menu-category .tab-content').append('<div id="' + 'category_' + data.category_id + '"' + 'class="tab-pane fade"></div>');
      var url = 'http://192.168.100.2:8080/Restaurent_backend/api/category/' + data.category_id + '?api_key=09171036-7446-4064-8c87-c14656191078';
      var currentCategory = data.category_id;
      $.get( url, function( response ) {
        console.log(response.data);
        response.data.forEach(function(obj, index){
          var floatClass = index % 2 == 0 ? 'floatL' : 'floatR';
          $('#'+'category_'+currentCategory+'').append('<div class="menu-item-blk ' + floatClass + '"><div class="item-left"><div class="item-left-img"><img class="img-circle" src="'+ obj.image_url+ '"></div><div class="item-left-details"><span class="item-name">'+ obj.menu_name +'</span><div class="item-desc">'+ obj.description + '</div></div></div><div class="item-right"><span class="price">' + obj.price + '</span></div></div>');
        });
      });
    });
  //});
  $(document).on("click", "#myMenus li a", function(e){
    var currentCategory = $(this).attr('href').slice(9);
    $('.tab-pane').each(function(i, val){
      $(this).removeClass('in');
      $(this).removeClass('active');
    });
    $('#'+'category_'+currentCategory+'').addClass('in').addClass('active');
  })

}());
