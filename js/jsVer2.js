"use strict";

var inputValues = {
  "mortg1" : {
    "frequency" : "monthly"
  },
  "mortg2" : {},
  "mortg3" : {}
};

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function getInputValues() {
  // Calculator 1
  inputValues.mortg1.amount = parseInt($('#loan_input_1 input').val());
  inputValues.mortg1.rate = parseInt($('#interest_rate_input_1 input').val());
  inputValues.mortg1.term = parseInt($('#term_input_1 input').val());
  inputValues.mortg1.repayment = parseInt($('#repayment_input_1 input').val());
  inputValues.mortg1.extra = parseInt($('#extrarepayment_input_1 input').val()) || 0;
  // case 1 monthly
  if ( inputValues.mortg1.frequency == "monthly" ) { periodRate1 = inputValues["mortg1"].rate / 12 / 100; }
  // case 2 weekly
  if ( inputValues.mortg1.frequency == "weekly" ) { periodRate1 = inputValues["mortg1"].rate / 52 / 100; }
  // case 3 fortnightly
  if ( inputValues.mortg1.frequency == "fort" ) { periodRate1 = inputValues["mortg1"].rate / 26 / 100; }
	console.log(`input values:`);
	console.log(inputValues["mortg1"]);
}

//writes all outputs
function writeOutputsRepayment1() {
  $("#mortgage_w_r_1_span span").text(repayment1.toFixed(0));
  $("#mortgage_results_slider_input_1").val(repayment1);
  $("#mortgage_t_p_1_span span").text(`${(repayment1 * numberOfPayments1 + inputValues.mortg1.extra).toFixed(0)}`);
  $("#mortgage_i_i_1_span span").text(`${(repayment1 * numberOfPayments1 + inputValues.mortg1.extra - inputValues.mortg1.amount).toFixed(0)}`);
  $("#mortgage_for_1_span span").text(`${inputValues.mortg1.term.toFixed(0)}`);
  $("#repayment_input_1 input").val( Math.round(repayment1) );
}

function writeOutputsTerm1() {
  if ( isNaN(numberOfYears1) ) {
    $("#mortgage_w_r_1_span span, #mortgage_t_p_1_span span, #mortgage_i_i_1_span span, #mortgage_for_1_span span").text("N/A");
  }else{
    $("#mortgage_w_r_1_span span").text(inputValues["mortg1"].repayment);
    $("#mortgage_t_p_1_span span").text(`${(inputValues["mortg1"].repayment * numberOfPayments1 + inputValues.mortg1.extra).toFixed(0)}`);
    $("#mortgage_i_i_1_span span").text(`${(inputValues["mortg1"].repayment * numberOfPayments1 + inputValues.mortg1.extra - inputValues.mortg1.amount).toFixed(0)}`);
    $("#mortgage_for_1_span span").text(`${numberOfYears1}`);
    $("#term_input_1 input").val( numberOfYears1 );
  }
}

var periodRate1, numberOfPayments1, repayment1, numberOfYears1;
// calculator calculates Repayment, or Term
var calcRepayment1 = true;

function calculate1() {
  // Amount and rate must be inputted
  if ( !isNaN(inputValues["mortg1"].amount) && !isNaN(inputValues["mortg1"].rate) ) {
    // Case 1 - Repayment is being calculated
    if (calcRepayment1) {
      if (  !isNaN(inputValues["mortg1"].term) ) {
        console.log ("Repayment");
        // case 1 monthly
        if ( inputValues.mortg1.frequency == "monthly" ) { numberOfPayments1 = inputValues["mortg1"].term * 12; }
        // case 2 weekly
        if ( inputValues.mortg1.frequency == "weekly" ) { numberOfPayments1 = inputValues["mortg1"].term * 52; }
        // case 3 fortnightly
        if ( inputValues.mortg1.frequency == "fort" ) { numberOfPayments1 = inputValues["mortg1"].term * 26; }
        repayment1 = periodRate1 * (inputValues["mortg1"].amount - inputValues.mortg1.extra) / ( 1 - 1 / Math.pow( (1+periodRate1), numberOfPayments1) );

        // set min and max for slider1 (min is for 30years and max is for 1year);
        let testMinNumberOfPayments1, testMaxNumberOfPayments1;
        // case 1 monthly
        if ( inputValues.mortg1.frequency == "monthly" ) { 
          testMinNumberOfPayments1 = 30 * 12; 
          testMaxNumberOfPayments1 = 12;
        }
        // case 2 weekly
        if ( inputValues.mortg1.frequency == "weekly" ) { 
          testMinNumberOfPayments1 = 30 * 52; 
          testMaxNumberOfPayments1 = 52;
        }
        // case 3 fortnightly
        if ( inputValues.mortg1.frequency == "fort" ) { 
          testMinNumberOfPayments1 = 30 * 26; 
          testMaxNumberOfPayments1 = 26;
        }

        let testMinRepayment = Math.round( periodRate1 * (inputValues["mortg1"].amount - inputValues.mortg1.extra) / ( 1 - 1 / Math.pow( (1+periodRate1), testMinNumberOfPayments1) ) + 1);
        $('#mortgage_results_slider_input_1').attr('min', testMinRepayment);
        console.log(testMinRepayment);
        let testMaxRepayment = Math.round( periodRate1 * (inputValues["mortg1"].amount - inputValues.mortg1.extra) / ( 1 - 1 / Math.pow( (1+periodRate1), testMaxNumberOfPayments1) ) + 1);
        $('#mortgage_results_slider_input_1').attr('max', testMaxRepayment);
        console.log(testMaxRepayment);

        writeOutputsRepayment1();
      }
    }else{
      // Case 2 - Term is being calculated
      if (  !isNaN(inputValues["mortg1"].repayment) ) {
        console.log ("Term");
        numberOfPayments1 = -1 * getBaseLog(10, ( 1 - periodRate1 * (inputValues["mortg1"].amount - inputValues.mortg1.extra) / inputValues["mortg1"].repayment ) ) / getBaseLog(10, (1+periodRate1));
        // case 1 monthly
        if ( inputValues.mortg1.frequency == "monthly" ) { numberOfYears1 = Math.ceil(numberOfPayments1 / 12); }
        // case 2 weekly
        if ( inputValues.mortg1.frequency == "weekly" ) { numberOfYears1 = Math.ceil(numberOfPayments1 / 52); }
        // case 3 fortnightly
        if ( inputValues.mortg1.frequency == "fort" ) { numberOfYears1 = Math.ceil(numberOfPayments1 / 26); }
        console.log(numberOfYears1);
        writeOutputsTerm1();

      }
    }  // Term is calculated
  }  //  amount and rate are must
}






// ***** key input limitations *****

$("#loan_input_1 input, #interest_rate_input_1 input, #term_input_1 input, #repayment_input_1 input, #extrarepayment_input_1 input, #loan_input_2 input, #interest_rate_input_2 input, #term_input_2 input, #repayment_input_2 input, #extrarepayment_input_2 input, #loan_input_3 input, #interest_rate_input_3 input, #term_input_3 input, #repayment_input_3 input, #extrarepayment_input_3 input").keydown(function (e) {
    //Allow: backspace, delete, tab, escape, enter
    if ($.inArray(e.keyCode, [8, 46, 9, 27, 13 ]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)  ) {
        e.preventDefault();
    }
});
// Amount between 0 and 1,000,000,000
$("#loan_input_1 input, #loan_input_2 input, #loan_input_3 input").on("change", function(){
    if ( ( parseInt( $(this).val() ) > 1000000000) ) {
        $(this).val('1000000000');
    }
    if ( ( parseInt( $(this).val() ) < 0) ) {
        $(this).val('0');
    }
});
// rate between 1 and 99
$("#interest_rate_input_1 input, #interest_rate_input_2 input, #interest_rate_input_3 input").on("change", function(){
    if ( ( parseInt( $(this).val() ) > 99) ) {
        $(this).val('99');
    }
    if ( ( parseInt( $(this).val() ) < 1) ) {
        $(this).val('1');
    }
});
// term between 1 and 30
$("#term_input_1 input, #term_input_2 input, #term_input_3 input").on("change", function(){
    if ( ( parseInt( $(this).val() ) > 30) ) {
        $(this).val('30');
    }
    if ( ( parseInt( $(this).val() ) < 1) ) {
        $(this).val('1');
    }
});


// ***** key input limitations ENDS *****

// *****   Click handlers   ******

// chooses payment frequency and removes/adds active class
$('#frequency_weekly_1').on("click", function(){
  $('#frequency_subb_1 > div').removeClass('active');
  $(this).addClass('active');
  inputValues.mortg1.frequency = "weekly";
  getInputValues();
  calculate1();
});
$('#frequency_fortnightly_1').on("click", function(){
  $('#frequency_subb_1 > div').removeClass('active');
  $(this).addClass('active');
  inputValues.mortg1.frequency = "fort";
  getInputValues();
  calculate1();
});
$('#frequency_monthly_1').on("click", function(){
  $('#frequency_subb_1 > div').removeClass('active');
  $(this).addClass('active');
  inputValues.mortg1.frequency = "monthly";
  getInputValues();
  calculate1();
});




// inputs and Sliders
// if Repayment input is last one changed then Term is being calculates
$('#mortgage_results_slider_input_1').on("input", function(){
  console.log ( $('#mortgage_results_slider_input_1').val() );
  calcRepayment1 = false;
  $('#repayment_input_1 input').val( parseInt( $('#mortgage_results_slider_input_1').val() ) );
})

$('#repayment_input_1 input').on("change", function(){
  console.log ( $('#mortgage_results_slider_input_1').val() );
  calcRepayment1 = false;
  $('#mortgage_results_slider_input_1').val( parseInt( $('#repayment_input_1 input').val() ) );
})






// if Term input is last one changed then Repayment is being calculates
$("#term_input_1 input").on("change", function(){
  calcRepayment1 = true;
})




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
 	calculate1();
 })

 $('input').on("change",function() {
 	getInputValues();
 	calculate1();

 });