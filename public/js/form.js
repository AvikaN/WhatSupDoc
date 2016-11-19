// var counter = 1;
// var limit = 3;
// function addInput(divName){
//      if (counter == limit)  {
//           alert("You have reached the limit of adding " + counter + " inputs");
//      }
//      else {
//           var newdiv = document.createElement('div');
//           newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
//           document.getElementById(divName).appendChild(newdiv);
//           counter++;
//      }
// }

var counter = 2;
function addInput(divName){
	var newdiv = document.createElement('div');
	newdiv.innerHTML = "Question" + (counter + 1) + " <br><input type='text' name='myInputs'>";
	document.getElementById(divName).appendChild(newdiv);
	counter++;
}
