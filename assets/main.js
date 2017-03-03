  (function() {
  	"use strict";
  	$.holdReady(true);
    var timeList =["11:00 am","12:00 pm","12:30 pm","01:00 pm","01:30 pm","02:00 pm","02:30 pm","03:00 pm","03:30 pm","04:00 pm","05:00 pm"];
    $("#myCarousel").carousel();  
    var categories,response;
    var imageSource = ['images/cafe_image1.jpg', 'images/cafe_image2.jpg', 'images/cafe_image3.jpg']
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
      response = {
        status: "200 OK",
        message: "Success",
        data: [
        {
          menu_id: 20,
          menu_name: "EGGS ON TOAST",
          price: "8.50`",
          category: {
            category_id: 1,
            category_name: "Breakfast"
          },
          description: "TWO EGGS OF YOUR CHOICE ON TOAST ",
          image_url: "/static/image/Breakfast/EGGS ON TOAST.jpg"
        },
        {
          menu_id: 21,
          menu_name: "BACON & EGGS",
          price: "12.90",
          category: {
            category_id: 1,
            category_name: "Breakfast"
          },
          description: "TWO EGGS OF YOUR CHOICE ON TOAST, HERBED TOMATO",
          image_url: "/static/image/Breakfast/BACON & EGGS.jpg"
        },
        {
          menu_id: 22,
          menu_name: "EGG BENEDICT",
          price: "15.90",
          category: {
            category_id: 1,
            category_name: "Breakfast"
          },
          description: "WILTED SPINACH, POACHED EGGS, HOLLANDAISE ON TOAST WITH LEG HAM OR BACON ($14.90) WITH SMOKED SALMON ($15.90)",
          image_url: "/static/image/Breakfast/EGG BENEDICT.jpg"
        },
        {
          menu_id: 23,
          menu_name: "GLUTEN FREE CORN FRITTERS",
          price: "13.90",
          category: {
            category_id: 1,
            category_name: "Breakfast"
          },
          description: "WITH AVOCADO, TOMATO RELISH & POACHED EGGS",
          image_url: "/static/image/Breakfast/GLUTEN FREE CORN FRITTERS.jpg"
        },
        {
          menu_id: 24,
          menu_name: "ORIGINAL PANCAKES",
          price: "10.50",
          category: {
            category_id: 1,
            category_name: "Breakfast"
          },
          description: "3 STACKED PANCAKES, VANILLA ICE CREAM, MAPLE SYRUP AND DUSTED ICING SUGAR",
          image_url: "/static/image/Breakfast/ORIGINAL PANCAKES.jpg"
        },
        {
          menu_id: 25,
          menu_name: "BIRCHER MUESLI",
          price: "10.00",
          category: {
            category_id: 1,
            category_name: "Breakfast"
          },
          description: "HOME STYLE, APPLE & PINEAPPLE JUICE, NATURAL GREEK YOGHURT, HONEY & FRUIT COMPOTE",
          image_url: "/static/image/Breakfast/BIRCHER MUESLI.jpg"
        }
        ]
      };
      categories.forEach(function(data, index){
        console.log(data.category_id);
        $('.menu-category .nav').append('<li><a data-toggle="tab" class="menu-name" href="' + 'category_' + data.category_id + '">' + data.category_name + '</a></li>');
        $('.menu-category .tab-content').append('<div id="' + 'category_' + data.category_id + '"' + 'class="tab-pane fade"></div>');
        //var url = 'http://192.168.100.2:8080/Restaurent_backend/api/category/' + data.category_id + '?api_key=09171036-7446-4064-8c87-c14656191078';
        var currentCategory = data.category_id;
        //$.get( url, function( response ) {
          console.log(response.data.length);
          if(response.data.length > 4) {
            var perpage = Math.round(response.data.length / 4);
            $('#'+'category_'+currentCategory+'').append('<div id="' + 'myCarousel_cat_' + currentCategory + '"' + 'class="carousel slide"><ol class="carousel-indicators" id="'+ 'carousel_indicator_cat_'+ currentCategory + '"'+'></ol><div class="carousel-inner" id="' +'carousel_inner_' + (index+1) + '"'+'></div></div>');
            for(var i = 1; i <= perpage; i++) {
              if( i == 1){
                $('#carousel_indicator_cat_'+ (index+1) + '').append('<li data-target="'+'#myCarousel_cat_'+ currentCategory+ '"'+ 'data-slide-to="'+(i-1)+'"' +'class="item1 active"></li>');
                $('#carousel_inner_' + (index+1) + '').append('<div class="item active" id="' + 'item_'+currentCategory+ '_'+ i + '"' +'></div>');
              }else{
                $('#carousel_inner_' + (index+1) + '').append('<div class="item" id="' + 'item_'+currentCategory + '_'+ i + '"' +'></div>');
                $('#carousel_indicator_cat_'+ (index+1) + '').append('<li data-target="'+'#myCarousel_cat_'+ currentCategory+ '"'+ 'data-slide-to="'+(i-1)+'"' +'class="item1"></li>');
              }
              
              for( var j = 1; j <= 4; j++){
                var floatClass = j % 2 != 0 ? 'floatL' : 'floatR';
                var currentItem = 4*(i-1) + j;
                if(currentItem <= response.data.length) {
                  $('#'+'item_'+currentCategory+ '_'+i+'').append('<div class="menu-item-blk ' + floatClass + '"><div class="item-left"><div class="item-left-details"><span class="item-name">'+ response.data[currentItem-1].menu_name +'</span><div class="item-desc">'+ response.data[currentItem-1].description + '</div></div></div><div class="item-right"><span class="price">' + response.data[currentItem-1].price + '</span></div></div>');
                }
                
              }
            }
          }
        });
  $("#myCarousel1").carousel({interval:false}); 
  $(document).on("click", "#myMenus li a", function(e){
    var currentCategory = $(this).attr('href').slice(9);
    $('.tab-pane').each(function(i, val){
      $(this).removeClass('in');
      $(this).removeClass('active');
    });
    $('#'+'category_'+currentCategory+'').addClass('in').addClass('active');
    $('#'+'myCarousel_cat_'+currentCategory+'').carousel({interval: false});
  })

}());
