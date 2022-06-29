window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  console.log(form);
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 10000;
  document.getElementById("loan-years").value = 10;
  document.getElementById("loan-rate").value = 5;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues();
  const monthlyValues = calculateMonthlyPayment(values);
  updateMonthly(monthlyValues);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {

  const valuesObj = values;
  let loanAmount = valuesObj.amount;
  let interest = valuesObj.rate/100/12;
  let numOfPay =valuesObj.years*12;
  
  let num =(loanAmount * interest)/(1-(1/(1+interest)**(numOfPay)));
  return num.toFixed(2).toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  if(document.querySelector('h2')){
    document.querySelector('h2').innerText = "$" + monthly;
    return;
  }
  let monthlyStr = document.createElement('h2');
  monthlyStr.innerText = monthly;
  document.getElementById("monthly-payment").append(monthlyStr);
}
