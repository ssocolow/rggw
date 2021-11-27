let group = [];
let num = 0;

function addToGroup() {
  group.push(document.getElementById("name").value);
  document.getElementById("name").value = "";
  addToTable(group[group.length - 1], num);
  num++;
}

function rememberNames() {
  group = JSON.parse(localStorage.names);
  num = 0;
  for(let n in group){
    addToTable(group[n],num);
    num++;
  }
}

function forget() {
  localStorage.clear();

}
function addToTable(name, num) {
  let table = document.getElementById("listnametable");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);

  cell1.innerHTML = num;
  cell2.innerHTML = name;
  cell3.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(' + num + ')"/>';
  //change border color to random rgb
  changeColor();
  localStorage.setItem("names",JSON.stringify(group));
}

function changeColor() {
  let myElements = document.querySelectorAll(".center");
  myElements.forEach(element => {
    element.style.border = "3px solid rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
  });
  //for (let i = 0; i < myElements.length; i++) {
    //myElements[i].style.border = "100px " + "solid " + "rgb(" + Math.random()*255 + "," + Math.random()*255 + "," + Math.random()*255 + ");";
    //console.log(myElements[i].style);
  //}

}

function deleteRow(num1) {
  let table = document.getElementById("listnametable");
  table.rows[num1 + 1].cells[0].innerHTML = "Not Included";
  let nm = table.rows[num1 + 1].cells[1].innerHTML;
  table.rows[num1 + 1].cells[1].innerHTML = "Not Included";
  table.rows[num1 + 1].cells[2].innerHTML = "Removed";
  if(num1 == num){
    group.pop();
  }
  else{
  //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
  const index = group.indexOf(nm);
  if (index > -1) {
    group.splice(index, 1);
    }
  }
}

let lastmingsize = 0;

function r(n) {
  lastmingsize = n;
  let cgroup = Array.from(group);
  shuffle(cgroup);
  
  let gnames = [];
  let numofgroups = Math.floor(cgroup.length / n);
  //console.log(numofgroups);
  for(let i = 0; i < numofgroups; i++){
    gnames.push([]);
    for(let j = 0; j < n; j++) {
      gnames[i].push(cgroup.pop());
    }
  }
  if(cgroup.length != 0){
    let count = cgroup.length;
    for(let i = 0; i < count; i++){
      gnames[numofgroups - 1].push(cgroup.pop());
    }
  }
  showGroups(gnames);
  //console.log(gnames);
}

function showGroups(gnames) {
  let d = document.getElementById("rgroups");
  d.innerHTML = "<h3>Groups:</h3>";
  for(let i = 0; i < gnames.length; i++) {
    d.innerHTML += "<h4>" + gnames[i] + "</h4>";
  }

}

function reRandomize() {
  r(lastmingsize);
}


//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
