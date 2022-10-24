//global - we want to access console,callstack,api,callbackqueue boxes from most functions
const consoleBox = document.getElementById("console");
const callStack = document.getElementById("call-stack");
const callBackBox = document.getElementById("call-back-queue");
const APIBox = document.getElementById("apis");

//Preparation function
//Params - itemName String, callback Function (Will resolve once item is prepped)
//If/Else for menu items
function preparation(itemName, callback) {
  //How long it takes to prepate itemName
  let preparationTime;
  //Using switch as I'm checking for equality instead of truthy/falsy
  switch (itemName) {
    case "Coffee":
      preparationTime = 4000;
      break;
    case "Chips":
      preparationTime = 10000;
      break;
    case "Burger":
      preparationTime = 10000;
      break;
    case "Juice":
      preparationTime = 500;
      break;
    default:
      console.log("We don't have that");
      return;
  }

  addEventToAPIs("Console.log", preparationTime);
  addEventToAPIs("serveOrder(" + itemName + ")", preparationTime, itemName);

}

//Take Order function
//Params - itemName String
//Call submitOrder function
function takeOrder(itemName) {
  //Waiter is still at table
  addEventToConsole(itemName + ", is that correct?");
  addEventToCallStack("takeOrder("+itemName+")");
  console.log(itemName + ", is that correct?");
  submitOrder(itemName);
}

//submitOrder function
//Params - itemName String, Pass to Prep function
function submitOrder(itemName) {
  addEventToConsole("taking " + itemName + " to Kitchen");
  addEventToCallStack("submitOrder("+itemName+")");

  console.log("taking " + itemName + " to Kitchen");
  //serveOrder is being passed as a callback function, no parenthesis
  //so it doesn't get called in place
  preparation(itemName, serveOrder);
}

//Serve function
//Params - itemName String, take back to table
function serveOrder(itemName) {
  addEventToConsole(itemName);
  console.log(itemName);
}


//These functions handle appearing/disappearing text in each box - timeouts are just there to make it possible to read!!
function addEventToConsole(text){
  let newConsoleLog = document.createElement("p");
  newConsoleLog.innerText = text;
  consoleBox.append(newConsoleLog);
  setTimeout(() => {
    newConsoleLog.innerHTML = "";
  }, 2000);
}

function addEventToCallStack(text){
  let newCallStackLog = document.createElement("p");
  newCallStackLog.innerText = text;
  callStack.append(newCallStackLog);
  setTimeout(() => {
    newCallStackLog.innerHTML = "";
  }, 750);
}

//Writes the text, sets a timeout to delete and recreate in callback queue box
//Sets another timeout to delete, then move to the call stack
//if itemName is true, it knows it's a specific message, so will call serve order - this function is called twice per order, and we only want to serve order once!
function addEventToAPIs(text, timeout, itemName=false){
  let newAPILog = document.createElement("p");
  newAPILog.innerText = text;
  APIBox.append(newAPILog);
  setTimeout(() => {
    newAPILog.innerHTML = "";

    setTimeout(() => {
      let newQueueItem = document.createElement("p");
      newQueueItem.innerText = text;
      callBackBox.append(newQueueItem);
      
      setTimeout(() => {     
        addEventToCallStack(text); 
        newQueueItem.innerText = "";

        if(itemName){
          addEventToConsole("Food prepped - " + itemName);
          console.log("Food prepped - " + itemName);
          serveOrder(itemName);
        }
      }, 750);

    }, 750);

  }, timeout);
}

//Web page set up!
//create menu buttons with callbacks
const menu = document.getElementById("button-box");

const button1 = document.createElement("button");
button1.innerText = "Coffee";
button1.addEventListener("click", () => {takeOrder("Coffee")});

const button2 = document.createElement("button");
button2.innerText = "Juice";
button2.addEventListener("click", () => {takeOrder("Juice")});

const button3 = document.createElement("button");
button3.innerText = "Chips";
button3.addEventListener("click", () => {takeOrder("Chips")});

const button4 = document.createElement("button");
button4.innerText = "Burger";
button4.addEventListener("click", () => {takeOrder("Burger")});

menu.append(button1, button2, button3, button4);


//change console logs to appear in "console" box, etc.