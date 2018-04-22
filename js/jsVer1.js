"use strict";

var inputValues = {};

function getInputValues() {
	// inputValues.age = parseInt($('#age_input input').val());
	console.log(`input values:`);
	console.log(inputValues);
}



// *** key input limitations ***

// $("#age_input input, #interval_input input, #HR_RR_input_1 input, #HR_RR_input_2 input").keydown(function (e) {
//     //Allow: backspace, delete, tab, escape, enter
//     if ($.inArray(e.keyCode, [8, 46, 9, 27, 13 ]) !== -1 ||
//         // Allow: Ctrl+A
//         (e.keyCode == 65 && e.ctrlKey === true) || 
//         // Allow: Ctrl+V
//         (e.keyCode == 86 && e.ctrlKey === true) ||
//          // Allow: home, end, left, right
//         (e.keyCode >= 35 && e.keyCode <= 39)) {
//              // let it happen, don't do anything
//              return;
//     }
//     // Ensure that it is a number and stop the keypress
//     if ( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)  ) {
//         e.preventDefault();
//     }
// });


// *** key input limitations ENDS ***




 $(function(){
 	getInputValues();
 	// calculate();
 })

 $('input').on("change",function() {
 	getInputValues();
 	// calculate();

 });