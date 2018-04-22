"use strict";

var inputValues = {
  "mortg1" : {
    "frequency" : "monthly"
  },
  "mortg2" : {},
  "mortg3" : {}
};

function getInputValues() {
  inputValues.mortg1.amount = parseInt($('#loan_input_1 input').val());
  inputValues.mortg1.rate = parseInt($('#interest_rate_input_1 input').val());
  inputValues.mortg1.term = parseInt($('#term_input_1 input').val());
  inputValues.mortg1.repayment = parseInt($('#repayment_input_1 input').val());
  inputValues.mortg1.extra = parseInt($('#extrarepayment_input_1 input').val()) || 0;
	console.log(`input values:`);
	console.log(inputValues["mortg1"]);
}

//writes all outputs
function writeOutputs() {
  $("#mortgage_total_span span").text(`${inputValues.mortg1.amount}`);
  $("#mortgage_w_r_1_span span").text(`${repayment.toFixed(2)}`);
  $("#mortgage_t_p_1_span").text(`${(repayment * numberOfPayments).toFixed(2)}`);
}

var periodRate, numberOfPayments, repayment;
function calculate() {
  // if all are inputted except Repayment
  if (  !isNaN(inputValues["mortg1"].amount) && !isNaN(inputValues["mortg1"].rate) && !isNaN(inputValues["mortg1"].term) && isNaN(inputValues["mortg1"].repayment) && !isNaN(inputValues["mortg1"].extra)  ) {
    console.log ("Repayment");
    // case 1 monthly
    if ( inputValues.mortg1.frequency == "monthly" ) {      
      periodRate = inputValues["mortg1"].rate / 12 / 100;
      numberOfPayments = inputValues["mortg1"].term * 12;
    }
    if ( inputValues.mortg1.frequency == "weekly" ) {      
      periodRate = inputValues["mortg1"].rate / 52 / 100;
      numberOfPayments = inputValues["mortg1"].term * 52;
    }
    if ( inputValues.mortg1.frequency == "fort" ) {      
      periodRate = inputValues["mortg1"].rate / 26 / 100;
      numberOfPayments = inputValues["mortg1"].term * 26;
    }
    repayment = periodRate * inputValues["mortg1"].amount / ( 1 - 1 / Math.pow( (1+periodRate), numberOfPayments) );
    console.log(repayment);
    writeOutputs();
  }
}






// ***** key input limitations *****

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


// ***** key input limitations ENDS *****

// *****   Click handlers   ******

// chooses payment frequency and removes/adds active class
$('#frequency_weekly_1').on("click", function(){
  $('#frequency_subb_1 > div').removeClass('active');
  $(this).addClass('active');
  inputValues.mortg1.frequency = "weekly";
  calculate();
});
$('#frequency_fortnightly_1').on("click", function(){
  $('#frequency_subb_1 > div').removeClass('active');
  $(this).addClass('active');
  inputValues.mortg1.frequency = "fort";
  calculate();
});
$('#frequency_monthly_1').on("click", function(){
  $('#frequency_subb_1 > div').removeClass('active');
  $(this).addClass('active');
  inputValues.mortg1.frequency = "monthly";
  calculate();
});

//shrinks height of mort1/2/3   NEEDS WORK
$("#arrow_up_2").on("click", function(){
  $("#mortgage_inputs_main_2").css("display","block");
})
$("#arrow_up_3").on("click", function(){
  $("#mortgage_inputs_main_3").css("display","block");
})




// *****   Click handlers ENDS ******

 $(function(){
 	getInputValues();
 	calculate();
 })

 $('input').on("change",function() {
 	getInputValues();
 	calculate();

 });