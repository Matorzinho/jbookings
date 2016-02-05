/* home page */
var path = "http://dougbacelar.com";
function initScrollFire(){
	var options = [
		{selector: '#how-works', offset: 150, callback: "$('#how-works .module').first().addClass('come-in-left');" },
		{selector: '#how-works', offset: 225, callback: "$('#how-works .module:nth-child(2)').addClass('come-in-bot')" },
		{selector: '#how-works', offset: 300, callback: "$('#how-works .module').last().addClass('come-in-right')" },
		{selector: '#feedback', offset: 300, callback: "Materialize.showStaggeredList('#feedback')" }
	];
	Materialize.scrollFire(options);
}
function toSignup(){
	$('body').animate({
        scrollTop: $('#signup-div').offset().top - 50
    }, 1000); 
}	

function newUser(){
	$("#submit-new-user").attr("disabled", true);
	var myData ={
		"reg-email":$('#reg-email').val(),
		"reg-password":$("#reg-password").val(),
		"reg-confirm":$("#reg-confirm").val(),
		"register":""
	};
	$.ajax({
        url: path+'/jbookings',
        data: myData,
        type: 'POST',
        timeout: 5000,
        success: function(message) {
        	if(message.indexOf("Registered successfully") > -1){
        		$("#reg-email, #reg-password, #reg-confirm").val("");
        		$("#reg-email, #reg-password, #reg-confirm").parent().children().removeClass('active valid');
        	}
        	Materialize.toast(message, 5000);
        	$("#submit-new-user").attr("disabled", false);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            Materialize.toast('error ' + textStatus + ' ' + errorThrown);
        }
    });
}

/* profile page */
function filterMonth(){
	var urlAddon = $('#month-filter').val() ? "?m="+$('#month-filter').val() : "";
	$.ajax({
        url: 'profile/listbookings'+urlAddon,
        type: 'GET',
        timeout: 5000,
        success: function(result) {
    		$('#bookings-table tbody').html(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            Materialize.toast('error ' + textStatus + ' ' + errorThrown);
        }
    });
}
function prepareDate(){
	var auxDate = $('#booking-date').val().split(' ');
	var year = auxDate[2];
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(auxDate[1].substring(0, auxDate[1].length-1))+1;
	month = month < 10 ? '0'+month : month;
	var day = auxDate[0];
	return [year, month, day].join('-');
}
function prepareTime(){
	var auxDate = new Date();
	var hours = auxDate.getHours() < 10 ? '0' + auxDate.getHours() : auxDate.getHours();
	var minutes = auxDate.getMinutes() < 10 ? '0' + auxDate.getMinutes() : auxDate.getMinutes();
	return hours + ':' + minutes;
}
function submitBooking(){
	var bookingFname = $('#booking-fname').val();
	var bookingLname = $('#booking-lname').val();
	var bookingPhone = $('#booking-phone').val();
	if(validateBooking(bookingFname, bookingLname, $('#booking-date').val(), bookingPhone)){
		var bookingDate = prepareDate();
		var bookingTime = prepareTime();
		var myData = {
			date: bookingDate,
			time: bookingTime,
			fname: bookingFname,
			lname: bookingLname,
			phone: bookingPhone,
			filter: $('#month-filter').val()
		};
		$.ajax({
	        url: path+'/jbookings/profile',
	        data: myData,
	        type: 'POST',
	        timeout: 5000,
	        success: function(result) {
	        	var msg = result!=0 ? "Booking inserted successfuly" : "Something went wrong while trying to insert booking";
	        	Materialize.toast(msg, 4000);
	    		$('#bookings-table tbody').html(result);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	        	console.log("ajax error", textStatus);
	            Materialize.toast('error ' + textStatus + ' ' + errorThrown);
	        }
	    });
	}
}
function validateBooking(fname, lname, date, phone){
	for(i = 0; i < arguments.length; i++){
		if(arguments[i] == ""){
			Materialize.toast("Please insert a " + ["First Name", "Last Name", "Date", "Phone"][i], 4000);
			$('#new-booking').closeModal();
			$('#new-booking').openModal();
			return 0
		}
	}
	return 1
	// $('#new-booking').closeModal();
}
function initProfilePage(){
	$(".button-collapse").sideNav();
	$('select').material_select();
	$('.modal-trigger').leanModal();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: false, // Creates a dropdown of 15 years to control year
		container: "body",
		min: new Date(new Date().setDate(new Date().getDate()-7)),
		max: new Date()
	});
	filterMonth();
}