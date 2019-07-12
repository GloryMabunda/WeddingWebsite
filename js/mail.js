$(document).ready(function() {
  var script_url = 'https://script.google.com/macros/s/AKfycbza9x0GKuuZskxx930JsaW8AhlcpbUWqxzMmiOYFy3z4xr3oM8/exec';
  var request;

  if (request) {
     request.abort();
  }

  $('#rsvp-form').submit(function(event){
    // setup some local variables
    var $form = $(this);
		// let's select and cache all the fields
		var $inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var serializedData = $form.serialize();
    // let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);
    //Can fire off the request to /form.php
    request =
    $.ajax({
			url: script_url,
			type: "POST",
			data: serializedData
    });

    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
      // log a message to the console
      //$('#success').show();
      swal({
    		title: "Sweet!",
    		text: "Your response has been captured. We look forward to seeing you.",
    		imageUrl: 'images/flaticon/svg/003-luxury.svg'
    	});
      console.log("Contact form submission handler loaded successfully.");
    });
    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
      // log the error to the console
      //$('#failed').show();
      swal({
        title: "Oops!",
        text: "Something happened, try submitting your response again.",
        imageUrl: 'images/flaticon/svg/crying.svg'
      });
      console.log("The following error occured: "+ textStatus, errorThrown);
    });
    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
      // reenable the inputs
      $inputs.prop("disabled", false);
    });

    // prevent default posting of form
    event.preventDefault();

  });
});
