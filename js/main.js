/*
value - span
checked - button t/f
edit - doubleclick t/f
*/
var dataListAll  = [];
var dataListActive = [];
var dataListCompleted = [];

var inputItemText = document.getElementById("text2");
inputItemText.focus();

inputItemText.onkeyup = function (event) {
	if(event.which === 13)
	{
		if(!inputItemText.value || inputItemText.value == "" || inputItemText.value == " ") return false;
		dataListAll.push({ value: inputItemText.value, checked: false, edit: false});
		inputItemText.focus();
		inputItemText.select();
	}
	render(dataListAll);
}

var deleteCompletedButton = document.getElementById("clear_completed");
deleteCompletedButton.onclick = function() {
	for(var i = 0; i < dataListAll.length; i++) {
		if(dataListAll[i].checked){
			dataListAll.splice(i,1);
		}
	}
	render(dataListAll);
}

var showCompletedButton = document.getElementById("show_comleted");
showCompletedButton.onclick = function() {
	for(var i = 0; i < dataListAll.length; i++) {
		if(dataListAll[i].checked){
			dataListCompleted.push(dataListAll[i]);
		}
	}
	render(dataListCompleted);
	dataListCompleted = [];
}

var showActiveButton = document.getElementById("show_active");
showActiveButton.onclick = function() {
	for(var i = 0; i < dataListAll.length; i++) {
		if(!dataListAll[i].checked){
			dataListActive.push(dataListAll[i]);
		}
	}
	render(dataListActive);
	dataListActive = [];
}

var showAllButton = document.getElementById("show_all");
showAllButton.onclick = function () {
	render(dataListAll);
}



function render(dl) {
	var container = document.getElementById("toDos");
	container.innerHTML = '';



	dl.forEach(function(dataItem) {
		var itemLi = document.createElement("li");
		itemLi.className = "view";
		/*
		var itemCount = document.getElementById("rem_count");
		var totalItems = dl.length;
		itemCount.innerHTML = "Items left: " + totalItems;
		*/
    	if (dataItem.edit) {
      		var internalElement = document.createElement('input');
     		internalElement.type = 'text';
     		internalElement.value = dataItem.value;
     		internalElement.className = "int_el";
    	} else {
      		var internalElement = document.createElement('span');
      		internalElement.className = dataItem.checked ? 'checked' : '';
      		internalElement.innerHTML = dataItem.value; 
    	}

			
		var fontAweTest = document.createElement("i");
		fontAweTest.className = "fa fa-hand-o-right";


		var tBar = document.createElement("div");
		tBar.className = "tBar";


		var doneButton = document.createElement("button");
		doneButton.setAttribute("title", "Click to check todo");
		var iconCh = document.createElement("i");
		iconCh.className = "fa fa-check";
		doneButton.className = "check";
		doneButton.appendChild(iconCh);
		doneButton.onclick = function () {
      		dataItem.checked = !dataItem.checked;
      		render(dl);
      		return false;	
   		};

		var editButton = document.createElement("button");
		editButton.setAttribute("title", "Click to edit todo");
   		var iconEdit = document.createElement("i");
   		var iconEdit1 = document.createElement("i");
   		iconEdit.className = "fa fa-pencil-square-o";
   		iconEdit1.className = "fa fa-check-circle-o";
   		editButton.className = "edit";
   		if(dataItem.edit){ editButton.appendChild(iconEdit1); }
   		else { editButton.appendChild(iconEdit); }
		editButton.onclick = function(){
			internalElement.focus();
			//internalElement.select();
   			if (dataItem.edit) dataItem.value = internalElement.value;
 			dataItem.edit = !dataItem.edit;
 			render(dl);
 			return false;
 		};
 		internalElement.onkeyup = function(event1) {
 			if(event1.which == 13) {
 				if (dataItem.edit) dataItem.value = internalElement.value;
 				dataItem.edit = !dataItem.edit;
 				render(dl);
 				return false;
 			}
 		};	


   		var deleteButton = document.createElement("button");
   		deleteButton.setAttribute("title", "Click to delete todo");
   		var iconDel = document.createElement("i");
		iconDel.className = "fa fa-times";
		deleteButton.className = "del";
		deleteButton.appendChild(iconDel);
		deleteButton.onclick = function () {
		 	for(var i = 0; i < dl.length; i++){
				if(dl[i] == dataItem) dl.splice(i,1);
		 	}
			render(dl);
		};


		tBar.appendChild(doneButton);
		tBar.appendChild(editButton);
		tBar.appendChild(deleteButton);
		itemLi.appendChild(fontAweTest);
   		itemLi.appendChild(internalElement);
   		itemLi.appendChild(tBar);
		container.appendChild(itemLi);
		
	});
}