jQuery(document).ready(function($){

  // Mobile navigation animation
  $('.nav-mobile').ready(function() {

      var label = $('label.nav-toggle'),
          navHeight = label.height();

      $('.nav-toggle').click(function () {
        if(!label.hasClass('opened')) {
          label.addClass('opened');

          if ($(window).width() > 400) {
            $('.label-left').css('font-size', '1.2em');
          }

          $('.spinner').addClass('spin');
        } else {
          label.removeClass('opened');
          $('.spinner').removeClass('spin');

          if ($(window).width() > 400) {
            $('.label-left').css('font-size', '1em');
          }
        }
      }); // end $(.nav-toggle)


      $(window).resize(function () {
        // Compensates extra height on
        // #primary content section for mobile navbar
        if ($(window).width() > 768) {
          $('#primary').css('top', '0');
        } else {
          $('#primary').css('top', navHeight.toString() + 'px');
        }
      });

      $('.nav-mobile a').click(function(e) {
        e.preventDefault();

        $('#nav-toggle').prop('checked' , false);
        label.removeClass('opened');
        $('.spinner').removeClass('spin');
        $('.label-left').css('font-size', '1em');

        var id = $(this).attr('href'),
            target = this.hash,
            // Grabs # of pixels = mobile navbar height
            scrollPosition = $(id).offset().top - navHeight;

        if ($(window).width() <= 768 ) {
          $('html, body').animate({ scrollTop: scrollPosition }, 500, 'swing', function() {
            // Adds hash IDs (e.g. - #about) to page URL
            // window.location.hash = target;
          });
        }
      });
  }); // end $(.nav-mobile) animations

  var sections = $('article'),
      nav = $('nav');
  // Scroll tracking for active link in nav
  $(window).on('scroll', function() {
    var curPos = $(this).scrollTop();

    sections.each(function() {
      var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();

      // The (top/btm - 100) offsets the active class
      // to execute 100px above the section from the top of the window
      if (  (curPos >= top - 100)
      &&    (curPos <= bottom - 100)  ) {
        nav.find('li').removeClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
      } else if (curPos <= 100) {
        nav.find('li').removeClass('active');
      }
    });
  });

  // Scroll to section when clicking hash links
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        target = this.hash;

    if ($(window).width() > 768 ) {
      $('html, body').animate({
        scrollTop: $(id).offset().top + 10
      }, 500, 'swing', function() {
          // This line adds hash IDs (e.g. - #about) to the page URL
          // window.location.hash = target;
      });
    }
    return false;
  });

  // get all input fields except for type='submit'
  var requiredFields = $("input[name='name'], input[name='email'], textarea[name='message']");


  validate(requiredFields);
  requiredFields.on('keyup', function() {
    validate(requiredFields);
  });
  $('input[type=reset]').click(function() {
    validate(requiredFields);
  });

  function validate(fields) {

    var fieldsWithValues = 0;

    fields.each(function(e) {
      // if it has a value, increment the counter
      if ($(this).val()) {
        fieldsWithValues += 1;
      }
    });

    if (fieldsWithValues == requiredFields.length) {
      $("input[type=submit]").prop("disabled", false);
      return true;
    } else {
      $("input[type=submit]").prop("disabled", true);
      return false;
    }
  }

  $('form.contact-me').on('submit', function(e) {
    e.preventDefault();

    var url = $(this).attr('action'),
        method = $(this).attr('method'),
        data = {};

    $(this).find('[name]').each(function() {
      var name = $(this).attr('name'),
          value = $(this).val();
          data[name] = value;
    });

    var mailRex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var contactEmail = $('input[name=email]').val();

    if( !validate(requiredFields) ) {
      $('#feedback').css('color', 'red');
      $('#feedback').html("Please complete all required fields.");
    } else if ( !contactEmail.match(mailRex) ) {
      $('#feedback').css('color', 'red');
      $('#feedback').html("Please enter a valid email address.");
    } else {
      // AJAX Code To Submit Form.
      $.ajax({
        url: url,
        type: method,
        data: { json: JSON.stringify(data) },
        success: function(response) {
          if(response == 'Your message was sent!') {
            $('#feedback').css('color', 'black');
            $('form.contact-me *[name]').each(function() {
              $(this).attr("disabled", true);
            });
          }
          $('#feedback').html(response);
        }
      });
    }
    return false;
  }); // end form.on.submit

}); // end $(document).ready()
