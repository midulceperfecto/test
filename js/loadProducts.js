
    var urlJSON = 'https://midulceperfecto.github.io/test/json/tortas.json';
    var urlWhatsApp = 'https://wa.me/51956235897?text='

    $(document).ready(function () {
      
      loadData('inicio');

      $("#txtBuscar").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $('#products').empty();
        loadData(value);
      });
      $(".linkTags").click(function() {
        var value = $(this).data('valor');
        $("#txtBuscar").val(value);
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
          response = response.filter(function(item) {
            return item.tags.toLowerCase().includes(filter);
          });
          //response = $.grep(response, function (element, index) {
          //    return element.tags.toLowerCase().includes(filter);
          //});
        }
        response = response.sort(function (a, b) {
            if (eval(a.fav) < eval(b.fav)){
                return 1;
              }
            if (eval(a.fav)> eval(b.fav)){
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

      var portfolioItem = $("<div></div>"); 
        portfolioItem.attr("class", "portfolio-item mx-auto");
        portfolioItem.attr("data-toggle", "modal");
        portfolioItem.attr("data-target", "#portfolioModal"+index);

      var portfolioItemCaption = $("<div></div>");
      portfolioItemCaption.attr("class", "portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100"); 
   
      var portfolioItemCaptionContent = $("<div></div>");
      portfolioItemCaptionContent.attr("class", "portfolio-item-caption-content text-center text-white"); 

      var fas = $("<i></i>");
      fas.attr("class", "fas fa-plus fa-3x"); 

      var img = $("<img></img>");
        img.attr("src", "img/"+ product.img);
        img.attr("class", "img-fluid");
        img.attr("alt", product.nom);
        img.attr("title", product.des);

      item.append(portfolioItem);
      portfolioItem.append(portfolioItemCaption, img);
      portfolioItemCaption.append(portfolioItemCaptionContent);
      portfolioItemCaptionContent.append(fas);

      item.appendTo('#products'); 

    });
