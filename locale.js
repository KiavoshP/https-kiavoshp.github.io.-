//tabs
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}



//calculator
var calculator = {history : [], current:"" ,result : ""};
var theActivityContainer = []

var add = function add(num1, num2){return num1 + num2;}
var neg = function neg(num1, num2){return num1 - num2;}
var multi = function multi(num1, num2){return num1 * num2;}
var divide = function divide(num1, num2){return (num2 == 0)? alert("Can not devide by 0") : num1 / num2;}
var percent = function percent(num) { return num / 100;}

function logicalBrain(num1, num2, signature) {
   switch(signature) {
        case "+":
           return add(num1, num2);
        case "-":
           return neg(num1, num2);
        case "×":
           return multi(num1, num2);
        case "÷":
           return divide(num1, num2);
        case "%":
           return percent(num1);
        
   }
}

function arrLoader(id) {
    var element = document.getElementById(id).innerText;
    var operation = "";
    var firstNum = "";
    var secondNum = "";
    var ListOfOps = ["+", "-", "×", "÷", "%"];
    
    if (element === "C") {
        document.getElementById("history-display").value = "";
        document.getElementById("result-pan").value = "0";
        theActivityContainer = [];
    } 
    else if (element === "Del") {
        document.getElementById("result-pan").value = document.getElementById("result-pan").value.substring(0, document.getElementById("result-pan").value.length - 1);
        theActivityContainer.pop();
    }
    else if (element === "-/+") {
        if (theActivityContainer.length !== 0) {
            var holder = logicalBrain(theActivityContainer.join(""), -1 , "×");
            theActivityContainer = [];
            theActivityContainer.push(holder);
            document.getElementById("result-pan").value = holder;
        } if (theActivityContainer.length === 0 && calculator.result !== ""){
            calculator.result = logicalBrain(calculator.result, -1, "×");
            document.getElementById("result-pan").value = calculator.result;
        }
    }
    else if (element === "%") {
        if (theActivityContainer.length !== 0) {
            var holder = logicalBrain(theActivityContainer.join(""), 0 , "%");
            theActivityContainer = [];
            theActivityContainer.push(holder);
            document.getElementById("result-pan").value = holder;
        } if (theActivityContainer.length === 0 && calculator.result !== ""){
            calculator.result = logicalBrain(calculator.result, 0, "%");
            document.getElementById("result-pan").value = calculator.result;
        }
    }
    else if (element === "=") {
        for (var digit in theActivityContainer){
            if (ListOfOps.includes(theActivityContainer[digit])){
                operation = theActivityContainer[digit];
                continue;
            }
            if (operation !== "") {
                secondNum+= theActivityContainer[digit];
            } else {
                firstNum+= theActivityContainer[digit];
            }
        }
        if(firstNum === "" ){
            firstNum = calculator.result;
        }
        if(operation === "") {
             document.getElementById("history-display").value = firstNum + " = ";
             document.getElementById("result-pan").value = firstNum;
             return;
        }
        calculator.result = logicalBrain(parseFloat(firstNum), parseFloat(secondNum), operation);
        if (calculator.history.length === 0) 
        {
            calculator.history[calculator.history.length] = firstNum+ " " + operation + " " + secondNum + " = ";
            calculator.current = calculator.history[calculator.history.length - 1];
            calculator.history[calculator.history.length] = calculator.result;
        }
        else 
        {
            calculator.history[calculator.history.length - 1] = firstNum+ "" + operation + "" + secondNum + "=";
            calculator.current = calculator.history[calculator.history.length - 1];
            calculator.history[calculator.history.length] = calculator.result;
        }
        document.getElementById("history-display").value = calculator.current;
        document.getElementById("result-pan").value = calculator.result;
        theActivityContainer = [];
    }
    else {
        if(document.getElementById("result-pan").value === "0" || theActivityContainer.length === 0){
            if(!ListOfOps.includes(element)) {
                document.getElementById("result-pan").value = element;
                theActivityContainer.push(element);
            } else {
                document.getElementById("result-pan").value += element;
                theActivityContainer.push(element);
            }
        } else {
            document.getElementById("result-pan").value += element;
            theActivityContainer.push(element);
        }
        
    }
    
    
}

