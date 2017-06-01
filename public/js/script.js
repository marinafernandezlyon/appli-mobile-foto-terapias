$("document").ready(function() {   //ne pas oublier cette ligne à mettre tout en haut si je mets les lignes scripts de mon html dans le head (voir exercice stripe)

	$( "#shop_form" ).submit(function( event ) { ////ici, payment-form c'est l'id que l'on retrouve dans le formulaire juste après <form=action, leur nom doit etre identique. et un peu plus bas aussi.

	/*Détecter le chargement complet de la page:
	$("document").ready(function() {
	  // DOM chargé 
	})*/
	// le bloc de code au-dessus, je crois que c'est là qu'on le met mais je n'en suis pas sure

	  	event.preventDefault();
	 	console.log("click OK!");

		Stripe.setPublishableKey('pk_test_a5AuXJ35kTdYh8zoVoBvF3D4');


		Stripe.card.createToken({

	  		number: $('.card-number').val(),
	  		cvc: $('.card-cvc').val(),
	  		exp_month: $('.card-expiry-month').val(),
	  		exp_year: $('.card-expiry-year').val(),
	  		}, stripeResponseHandler);


	});

	function stripeResponseHandler(status, response) {

			// Grab the form:
			var $form = $('#shop_form'); //ici, payment-form c'est l'id que l'on retrouve dans le formulaire juste après <form=action, leur nom doit etre identique.  

			if (response.error) { // Problem!

		 // Show the errors on the form
		$form.find('.payment-errors').text(response.error.message);
		$form.find('button').prop('disabled', false); // Re-enable submission

			} else { // Token was created!

		 // Get the token ID:
		var token = response.id;

		 // Insert the token into the form so it gets submitted to the server:
		$form.append($('<input type="hidden" name="stripeToken" />').val(token));

		 // Submit the form:
		 	
		 $form.get(0).submit();

	   }
	}

});