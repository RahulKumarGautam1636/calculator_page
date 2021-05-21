// -----------------------------JS code for theme changes---------------------
var toggleButton = $(".roundButton");
var toggle = $(".toggleBar");
var body = $("body");
var bg = 1;
var i = true;
function toggleTheme() {        // fucntion to change the themes.
  $(".outer_container").css("transform", "translateY(-"+(108-bg*54)+"rem)");
  toggleButton.css("margin-left", (1.275*bg)+"rem");
  body.addClass("theme"+bg);
  body.removeClass("theme"+(bg+1));
  if ( bg === 2 && i === true ) {
    i = false;
    body.removeClass("theme"+(bg+2));
    bg--;
  } else if ( bg === 1 && i === false ) {
    i = true;
    bg--;
  } else {
    bg++;
  }
}
// -----------------------JS Code to respond against keypress---------------------
result = "0";
timeline = ""
document.addEventListener("keydown", function(event) {  // listen the keypress.
  event.preventDefault();
var k = event.key;
  if (k==="0") {
    zero();                      // call different fucntions by detecting the pressed keys.
  } else if (k===".") {
    addDecimal();
  } else if (k==="Enter") {
    getResult();
  } else if (k==="Backspace") {
    deleteOne();
  } else if (Number.isInteger(parseInt(k)) ||
      k === "+" || k === "-" || k === "*" || k === "/") {
    addNumbers(k);
  }
  output(k, "Enter");  // keeps screen updated on every keypress.
});
// -------------------------------------JS Code for calculation-------------------------------------------

var display = $("#display");
var total = $(".total");
function addNumbers(n) {    // fucntion to insert numbers and operators except "0" and "." to the evaluable string
  if (Number.isInteger(parseInt(n)))  {
    if (!Number.isInteger(parseInt(result[result.length-2])) && result[result.length-2]!=="." && result[result.length-1]==="0") {
      result = result.slice(0, -1);
      result += n;
      return;
    }
    result += n;
  } else if (checkValidity(result) && result.length!==0 && result[result.length-1]!==".") {
    result += n;
  } else if (result.length!==0) {
    result = result.slice(0, -1);
    result += n;
  } else {
    return;
  }
  t = true;
}
$(".num").click(function() {   // call addNumbers() on user clicks
   addNumbers($(this).text());
});
function zero() {      // fucntion to insert "0" with some special rules to avoid Errors.
if ((result[result.length-1]==="0" && !Number.isInteger(parseInt(result[result.length-2])))) {
  if (result[result.length-2]===".") {
     result += "0";
  }
  console.log("Cannot insert 0, it can lead to Syntax error..");
} else if (result.length===0) {
  display.html("0");
  return;
} else  {
  result += "0";
}
display.html(result);
}
function addDecimal() {    // fucntion to insert "." with some special rules to avoid Errors.
  if (checkValidity(result+".")) {
    result += ".";
  }
  if (result.length===0) {
    result += "0.";
  }
}
t = true;
previousResult = "";
function getResult() {   // fucntion to calculate Result with error handling.
  try {
    if (Number.isInteger(parseInt(result.slice(-1)))) {
      total.html(result+" = ");
      currentResult = Number.parseFloat(eval(result)).toFixed(4)-0.0000;
      if (t) {
        previousResult = currentResult;
        display.html(currentResult);
        result = "0";
      } else {
        result = previousResult;
        display.html(previousResult);
      }
    timeline = "";
  } else {
    total.html("Syntax error please check..🤔");
  }
} catch (e) {
    total.html("Syntax Error..");
    console.log(e);
  }
  total.addClass("moveTotal");
  t = !t;
}
function clearScreen() {  // clears screen.
  result = "0";
  timeline = "";
}
function checkValidity(str) {   // checks the validity of entered data to avoid Errors with error handling.
  try {
    console.log(eval(str));
    return true;
  } catch (e) {
    return false;
  }
}
function deleteOne() {          // deletes one number.
  result = result.slice(0, -1);
}
function output(x,y) {         // keeps the screen updated with every click and keypress.
  if (x !== y && x !== "0") {
    display.html(result);
    total.html(timeline);
  }
  if (x !== y || t) {
    total.removeClass("moveTotal");
  }
}
$("button").click(function() {
  output($(this).text(), "=");  // call output by listening to clicks.
});
