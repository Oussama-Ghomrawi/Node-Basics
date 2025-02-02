
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n') {
    quit();
  }
  else if (text === 'exit\n') {
    quit();
  }

  else if (text === 'help\n') {
    help();
  }
  else if (text === 'list\n') {
    list();
  }
  

  else if (text.trim().split(" ")[0] === "add") {
    add(text.trim().substring(4));
  }
  else if (text.trim().split(" ")[0] === "edit") {
    edit(text);
  }
  else if (text.trim().split(" ")[0] === "check") {
    check(text);
  }
  else if (text.trim().split(" ")[0] === "uncheck") {
    uncheck(text);
  }
  else if (text.trim().split(" ")[0] === "remove") {
    remove(text.trim().substring(6));
  }
  else if (text.startsWith("hello")) {
    text = text.trim();
    if (text.substring(0, 5) == "hello") {
      hello(text.substring(5));
    }
    else {
      unknownCommand(text);
    }

  }
  else {
    unknownCommand(text);
  }

}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello() {
  console.log('hello!')
}
function hello(x) {
  x.trim();
  console.log("hello" + x + "!");
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}


/** List all the possible commands 
 * @returns {void}
*/
function help() {
  console.log('\nThe possible commands are:\n-hello\n-hello user\n-quit\n-exit\n-list\n-add\n-remove\n-check\n\-uncheck\n-help\n')
}

var listx = [
  {done: 'false', task:'Chicken'},
  {done: 'true', task:'Beef'},
  {done: 'false',  task:'Potato'},
  {done: 'false', task:'Soup'},
];

function list(){
  listx.map((item,index) => {
    if(item.done === true){
      console.log(`${index+1} - [✔] ${item.task}`);
    }else{
      console.log(`${index+1} - [ ] ${item.task}`);
    }
  })
}

//function add(text) {
  //if (text.length === 0) {
    //console.log("you forgot to enter the task");
    //return;
  //}
  //listx.push(text)
//}

function add(x){
  let newtask = {
    done: false,
    task: x
  }
  listx.push(newtask)
  console.log(`The task was added`)
}

function remove(index) {
  if (Number(index) >= 1 && Number(index) <= listx.length) {
    listx.splice(index - 1, 1);
    return;
  }
  if (index.length == 0) {
    listx.pop(); return
  }
  console.log("The number you entered doesn't exist");

}




function edit(edits) {
  var Y = Number(edits.trim().split(" ")[1]);
  if (edits.trim().split(" ")[1] === undefined) {
    console.log("No task was edited, Please enter some data!")
  }
  else if (Y > listx.length || Y === 0 || Y < 1) {
    console.log("The task number you entered doesnt exist!")
  }
  else if (isNaN(Y)) {
    listx.splice(listx.length - 1, 1, edits.trim().substring(5));
    console.log("You successfully edited the last task")
  }
  else {
    if (edits.trim().split(" ")[2] === undefined) {
      console.log("No task was edited, Please enter some data!")
    }
    else {
      listx.splice(Y - 1, 1, edits.trim().substring(7));
      console.log("You successfully edited the task number " + Y)
    }
  }
}



function check(text) {
  if (text.trim().split(" ")[1] === undefined || text.trim().split(" ")[1] > listx.length) {
    console.log(`Invalid number, try again`)
  }
  else {
    for (let i = 0; i < listx.length; i++) {
      if (i == text.trim().split(" ")[1] - 1) {
        listx[i].done = true;
      }
    }
  }
}
function uncheck(text) {
  if (text.trim().split(" ")[1] === undefined || text.trim().split(" ")[1] > listx.length) {
    console.log(`Invalid number, try again`)
  } else {
    for (let i = 0; i < listx.length; i++) {
      if (i == text.trim().split(" ")[1] - 1) {
        listx[i].done = false;
      }
    }
  }
}


// The following line starts the application
startApp("Oussama Ghomrawi")
