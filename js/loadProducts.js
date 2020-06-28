
    var urlJSON = 'https://midulceperfecto.github.io/test/json/tortas.json';
    var urlWhatsApp = 'https://wa.me/51956235897?text='

    $(document).ready(function () {
      
      loadData('inicio');

      $("#txtBuscar").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $('#products').empty();
        $('#modalProducts').empty();
        loadData(value);
      });
      $(".linkTags").click(function() {
        var value = $(this).data('valor');
        $("#txtBuscar").val(value);
        console.log(value);
        $('#products').empty();
        $('#modalProducts').empty();
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
          drawImage(index, product);
          drawModal(index, product);
        });
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
      });
    });

    var drawImage = (function (index, product){

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

    var drawModal = (function (index, product){

      var portfolioModal = $("<div></div>"); 
      portfolioModal.attr("class", "portfolio-modal modal fade");
      portfolioModal.attr("id", "portfolioModal"+index);
      portfolioModal.attr("tabindex", "-1");
      portfolioModal.attr("role", "dialog");
      portfolioModal.attr("aria-labelledby", "portfolioModal"+ index + "Label");
      portfolioModal.attr("aria-hidden", "true");

      var modalDialog = $("<div></div>"); 
      modalDialog.attr("class", "modal-dialog modal-xl");
      modalDialog.attr("role", "document");
      var modalContent = $("<div></div>"); 
      modalContent.attr("class", "modal-content");
      var modalButtonClose = $("<button></button>"); 
      modalButtonClose.attr("class", "close");
      modalButtonClose.attr("type", "button");
      modalButtonClose.attr("data-dismiss", "modal");
      modalButtonClose.attr("aria-label", "Close");
      var modalButtonCloseSpan = $("<span></span>"); 
      modalButtonCloseSpan.attr("aria-hidden", "true");
      var modalButtonCloseI = $("<i></i>");
      modalButtonCloseI.attr("class", "fas fa-times");

      var modalBody = $("<div></div>");
      modalBody.attr("class", "modal-body text-center");
      var modalBodyContainer = $("<div></div>");
      modalBodyContainer.attr("class", "container");
      var modalBodyContainerRow = $("<div></div>");
      modalBodyContainerRow.attr("class", "row justify-content-center");
      var modalBodyContainerCell = $("<div></div>");
      modalBodyContainerCell.attr("class", "col-lg-8");
      var modalBodyContainerCellTitle = $("<h2></h2>");
      modalBodyContainerCellTitle.attr("class", "portfolio-modal-title text-secondary text-uppercase mb-0");
      modalBodyContainerCellTitle.attr("id", "portfolioModal"+ index + "Label");
      modalBodyContainerCellTitle.html(product.nom);
      var modalBodyContainerCellImg = $("<img></img>");
        modalBodyContainerCellImg.attr("src", "img/"+ product.img);
        modalBodyContainerCellImg.attr("class", "img-fluid rounded mb-5");
        modalBodyContainerCellImg.attr("alt", product.nom);
        modalBodyContainerCellImg.attr("title", product.nom);
      var modalBodyContainerCellText = $("<p></p>");
        modalBodyContainerCellText.attr("class", "mb-5");
        modalBodyContainerCellText.html(product.des);

      var modalBodyContainerCellButton = $("<button></button>"); 
      modalBodyContainerCellButton.attr("class", "btn btn-primary");
      modalBodyContainerCellButton.attr("data-dismiss", "modal");
      modalBodyContainerCellButton.attr("data-index", index);
      modalBodyContainerCellButton.attr("data-nombre", product.nom);
      modalBodyContainerCellButton.attr("data-img", product.img);
      modalBodyContainerCellButton.html("Consultar");
      var modalBodyContainerCellButtonI = $("<i></i>");
      modalBodyContainerCellButtonI.attr("class", "fas fa-envelope fa-fw");
      
      modalBodyContainerCellButton.click(function (){
        var index = $(this).data('index');
        var nombre = $(this).data('nombre');
        var img = $(this).data('img');
        window.open(urlWhatsApp + 'Deseo el producto ' + nombre + ' [ ' + window.location.origin + '/public/img/' + img + ' ]');
      });

      portfolioModal.append(modalDialog);
      modalDialog.append(modalContent);
      modalContent.append(modalButtonClose, modalBody);
      modalButtonClose.append(modalButtonCloseSpan);
      modalButtonCloseSpan.append(modalButtonCloseI);

      modalBody.append(modalBodyContainer);
      modalBodyContainer.append(modalBodyContainerRow);
      modalBodyContainerRow.append(modalBodyContainerCell);
      modalBodyContainerCell.append(modalBodyContainerCellTitle, modalBodyContainerCellImg, modalBodyContainerCellText, modalBodyContainerCellButton);
      modalBodyContainerCellButton.append(modalBodyContainerCellButtonI);

      portfolioModal.appendTo('#modalProducts'); 

    });
