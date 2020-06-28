
    var urlJSON = 'json/tortas.json';
    var urlWhatsApp = 'https://wa.me/51956235897?text='

    $(document).ready(function () {
      
      loadData('inicio');

      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $('#products').empty();
        loadData(value);
      });
      $(".linkTags").click(function() {
        var value = $(this).data('valor');
        $("#myInput").val(value);
        console.log(value);
        $('#products').empty();
        loadData(value);
          event.preventDefault();
      });

    });

    var loadData = (function (filter){
      filter = filter.toLowerCase();
      $.getJSON(urlJSON).done( function(response) {
        if(filter != '')
        {
            response = $.grep(response, function (element, index) {
              return element.tags.toLowerCase().includes(filter);
          });
        }
        response = response.sort(function (a, b) {
            if (a.fav < b.fav) {
                return 1;
              }
            if (a.fav > b.fav) {
               return -1;
            }

            return 0;
         });
        $.each(response, function(index, product) {
          drawSection(index, product);
        });
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
      });
    });

    var drawSection = (function (index, product){

      var id = "product_" + index;
      var item = $("<div></div>"); 
        item.attr("class", "col-md-6 col-lg-4 mb-5");

      var portfolio-item = $("<div></div>"); 
        portfolio-item.attr("class", "portfolio-item mx-auto");
        portfolio-item.attr("data-toggle", "modal");
        portfolio-item.attr("data-target", "#portfolioModal"+index);

      var portfolio-item-caption = $("<div></div>");
      portfolio-item-caption.attr("class", "portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100"); 
   
      var portfolio-item-caption-content = $("<div></div>");
      portfolio-item-caption-content.attr("class", "portfolio-item-caption-content text-center text-white"); 

      var fas = $("<i></i>");
      fas.attr("class", "fas fa-plus fa-3x"); 

      var img = $("<img></img>");
        img.attr("src", "img/"+ product.img);
        img.attr("class", "img-fluid");
        img.attr("alt", product.nom);
        img.attr("title", product.des);

      item.append(portfolio-item);
      portfolio-item.append(portfolio-item-caption, img);
      portfolio-item-caption.append(portfolio-item-caption-content);
      portfolio-item-caption-content.append(fas);

      item.appendTo('#products'); 

    });
