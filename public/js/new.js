
    $(window).on('resize', function() {
    
    if ($(this).width() < 100000000000) {
       $('tr td:first-child').click(function(){

          $(this).siblings().css({'display': 'inline-block'});

          var $this = $(this);
          setTimeout(function(){
          $this.siblings().css('transform', 'translateY(0)'); 
         },0);

          $('tr td:first-child').not($(this)).siblings().css({'display': 'none', 'transform': 'translateY(-9999px)'});
      });  
    } else if ($(this).width() > 1000000) {
        //unbind click : name is not clickable when screen is > 700px
        $( "tr td:first-child").unbind( "click" );
        //remove with jquery added styles
        $('tr td:first-child').siblings().css({'display': '', 'transform': ''});
    }

}).resize();
    