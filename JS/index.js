// -----------------------------JS code for theme changes---------------------
var toggleButton = $(".roundButton");
var toggle = $(".toggleBar");
var body = $("body");
var bg = 1;
var i = true;

function toggleTheme() {          //  To switch between the themes.
  $(".outer_container").css("transform", "translateY(-" + (162 - bg * 54) + "rem)");
  toggleButton.css("margin-left", (1 * bg) + "rem");
  body.addClass("theme" + bg);
  body.removeClass("theme" + (bg + 1));
  if (bg === 0) {
    switchThemes(components, theme0);
  } else if (bg === 1) {
    switchThemes(components, theme1);
  } else if (bg === 2) {
    switchThemes(components, theme2);
  } else if (bg === 3) {
    coustomTheme();
  }
  if (bg === 3 && i === true) {
    i = false;
    body.removeClass("theme" + (bg + 3));
    bg--;
  } else if (bg === 1 && i === false) {
    i = true;
    bg--;
  } else if (i === true) {
    bg++;
  } else if (i === false) {
    bg--
  }
}

const setColor = document.querySelector(".colors");
const colorTab = document.querySelector(".colorTab");
const clrValue = document.querySelectorAll(".colorTab span");
let root = document.querySelector(":root");
var n = 0;

function setBG() {          // Get background color setting panel.
  n = 0;
  colorTab.style.transform = "translateX(0)";
  $("#BG").addClass("activeTab");
  $("#keys").removeClass("activeTab");
  $("#texts").removeClass("activeTab");
  $("#tab-BG").addClass("active-color-tab");
  $("#tab-keys").removeClass("active-color-tab");
  $("#tab-texts").removeClass("active-color-tab");
}

function setKeys() {           // Get keys color setting panel.
  n = 1;
  colorTab.style.transform = "translateX(-33.33%)";
  $("#texts").removeClass("activeTab");
  $("#keys").addClass("activeTab");
  $("#BG").removeClass("activeTab");
  $("#tab-BG").removeClass("active-color-tab");
  $("#tab-keys").addClass("active-color-tab");
  $("#tab-texts").removeClass("active-color-tab");
}

function setText() {         // Get text color setting panel.
  n = 2;
  colorTab.style.transform = "translateX(-66.66%)";
  $("#texts").addClass("activeTab");
  $("#BG").removeClass("activeTab");
  $("#keys").removeClass("activeTab");
  $("#tab-BG").removeClass("active-color-tab");
  $("#tab-keys").removeClass("active-color-tab");
  $("#tab-texts").addClass("active-color-tab");

}

let theme = getLocalColors();           // Get colors from localStorage if exists otherwise create new color object.

function getLocalColors() {
  colors = localStorage.getItem("myColors");
  if (!colors) {
    colors = {
      mainBG: "#5c040c",
      toggleBG: "#ff0c0073",
      screenBG: "#ff0c00",
      key1: "hsl(197, 100%, 27%)",
      keyShadow1: "hsl(213, 91%, 52%)",
      key2: "hsl(108, 100%, 44%)",
      keyShadow2: "hsl(105, 86%, 32%)",
      key: "#ff008d",
      keyShadow: "hsl(327, 100%, 40%)",
      text1: "cyan",
      text2: "hsl(119, 99%, 49%)"
    };
    return colors;
  } else {
    colors = JSON.parse(colors);
    return colors;
  }
}

function setColors(theme) {            // Get color customising panel.
  setColor.classList.toggle("active");
}

function saveColorsLocally(theme) {    // Save theme colors in localStorage.
  clr = JSON.stringify(theme);
  localStorage.setItem("myColors", clr);
}

function resetColors() {               // Remove colors from local storage and reset colors.
  localStorage.removeItem("myColors");
  theme = getLocalColors();
  fillColorBoxes();
  bg = 3;
  toggleTheme();
}

function switchShadowColor() {            // Switch between backgrounds and shadow color settings for keys.
  $(".keyBG").toggleClass("hide_element");
  $(".shadows").toggleClass("hide_element");
}

function setClrValue(item, value) {       // Update theme colors and save it to localStorage.
  theme[item.id] = value;
  saveColorsLocally(theme);
  bg = 3;
  toggleTheme();
  console.log("running");
}

const components = ["toggleBG", "screenBG", "key1", "keyShadow1", "key2", "keyShadow2", "key", "keyShadow", "text1", "text2"];
const theme0 = ["hsl(223, 31%, 20%)", "hsl(224, 36%, 15%)", "hsl(225, 21%, 49%)", "hsl(224, 28%, 35%)", "hsl(6, 63%, 50%)", "hsl(6, 70%, 34%)", "hsl(30, 25%, 89%)", "hsl(28, 16%, 65%)", "hsl(0, 0%, 100%)", "hsl(221, 14%, 31%)"];
const theme1 = ["hsl(0, 5%, 81%)", "hsl(0, 0%, 93%)", "hsl(185, 42%, 37%)", "hsl(185, 58%, 25%)", "hsl(25, 98%, 40%)", "hsl(25, 99%, 27%)", "hsl(45, 7%, 89%)", "hsl(35, 11%, 61%)", "hsl(60, 10%, 19%)", "hsl(60, 10%, 19%)"];
const theme2 = ["hsl(268, 71%, 12%)", "hsl(268, 71%, 12%)", "hsl(281, 89%, 26%)", "hsl(285, 91%, 52%)", "hsl(176, 100%, 44%)", "hsl(177, 92%, 70%)", "hsl(268, 47%, 21%)", "hsl(290, 70%, 36%)", "hsl(52, 100%, 62%)", "hsl(52, 100%, 62%)"];

function switchThemes(components, themes) {            // Switch between static themes.
  for (var i = 0; i < components.length; i++) {
    root.style.setProperty("--" + components[i], themes[i]);
  }
}

function coustomTheme() {                   // Enable couston theme.
  components.forEach(item => {
    root.style.setProperty("--mainBG", theme.mainBG);
    root.style.setProperty("--" + item, theme[item]);
  });
}

function fillColorBoxes() {                 // Update colors of color picker boxes.
  clrValue.forEach((items) => {
    var box = document.querySelector('#' + items.id);
    box.style.background = theme["" + items.id + ""];
    box.setAttribute("data", theme[items.id]);
    document.querySelector("#mainBG").setAttribute("data", theme.mainBG);
  });
}
fillColorBoxes();

clrValue.forEach(item => {        // Initialise the Pickers.
  var picker = item.id;
  var data = item.getAttribute("data");
  var parent = document.querySelector('#' + picker);
  var picker = new Picker({
    parent: parent,
    color: data,
    popup: "left"
  });

  item.addEventListener("mouseover", function() {      // Listen for events on Pickers to respond accordingly.
    picker.onChange = function(color) {
      parent.style.background = color.rgbaString;
      setColor.style.visibility = "hidden";
      item.style.visibility = "visible";
      setClrValue(item, color.rgbaString);
    };
    picker.onClose = function() {
      setColor.style.visibility = "visible";
      item.style.visibility = "inherit";
    };

  });
});

// -----------------------JS to respond against keypress---------------------
result = "0";
timeline = "";
document.addEventListener("keydown", function(event) { // listen for the keypress.
  event.preventDefault();
  var k = event.key;
  if (k === "0") {
    zero(); // call different functions by detecting the pressed keys.
  } else if (k === ".") {
    addDecimal();
  } else if (k === "Enter") {
    getResult();
  } else if (k === "Backspace") {
    deleteOne();
  } else if (Number.isInteger(parseInt(k)) ||
    k === "+" || k === "-" || k === "*" || k === "/") {
    addNumbers(k);
  }
  output(k, "Enter"); // keeps screen updated on every keypress.
});
// -------------------------------------JS for calculation-------------------------------------------

var display = $("#display");
var total = $(".total");

function addNumbers(n) { // To insert numbers and operators except "0" and "." to the evaluable string
  if (Number.isInteger(parseInt(n))) {
    if (!Number.isInteger(parseInt(result[result.length - 2])) && result[result.length - 2] !== "." && result[result.length - 1] === "0") {
      result = result.slice(0, -1);
      result += n;
      return;
    }
    result += n;
  } else if (checkValidity(result) && result.length !== 0 && result[result.length - 1] !== ".") {
    result += n;
  } else if (result.length !== 0) {
    result = result.slice(0, -1);
    result += n;
  } else {
    return;
  }
  t = true;
}
$(".num").click(function() { // call addNumbers() on user clicks
  addNumbers($(this).text());
});

function zero() { // To insert "0" with some special rules to avoid Errors.
  if ((result[result.length - 1] === "0" && !Number.isInteger(parseInt(result[result.length - 2])))) {
    if (result[result.length - 2] === ".") {
      result += "0";
    }
    console.log("Cannot insert 0, it can lead to Syntax error..");
  } else if (result.length === 0) {
    display.html("0");
    return;
  } else {
    result += "0";
  }
  display.html(result);
}

function addDecimal() { // To insert "." with some special rules to avoid Errors.
  if (checkValidity(result + ".")) {
    result += ".";
  }
  if (result.length === 0) {
    result += "0.";
  }
}
t = true;
previousResult = "";

function getResult() { // To calculate Result with error handling.
  try {
    if (Number.isInteger(parseInt(result.slice(-1)))) {
      total.html(result + " = ");
      currentResult = Number.parseFloat(eval(result)).toFixed(4) - 0.0000;
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
    // console.log(e);
  }
  total.addClass("moveTotal");
  t = !t;
}

function clearScreen() { // clears screen.
  result = "0";
  timeline = "";
}

function checkValidity(str) { // checks the validity of entered data to avoid Errors with error handling.
  try {
    console.log(eval(str));
    return true;
  } catch (e) {
    return false;
  }
}

function deleteOne() { // deletes one number.
  result = result.slice(0, -1);
}

function output(x, y) { // keeps the screen updated with every click/keypress.
  if (x !== y && x !== "0") {
    display.html(result);
    total.html(timeline);
  }
  if (x !== y || t) {
    total.removeClass("moveTotal");
  }
}
$("button").click(function() {
  output($(this).text(), "="); // call output by listening to clicks.
});
