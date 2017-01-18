/*
value - span
checked - button t/f
edit - doubleclick t/f
*/
var dataListAll  = [];
var dataListActive = [];
var dataListCompleted = [];
//var currentFilter = "";

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

var addButton = document.getElementById("add_button");
addButton.onclick = function() {
	dataListAll.push({ value: inputItemText.value, checked: false, edit: false});
	inputItemText.focus();
	inputItemText.select();
	render(dataListAll);
	//renderFooter();
}





function render(dl) {
	var container = document.getElementById("toDos");
	container.innerHTML = '';


	dl.forEach(function(dataItem) {
		var itemLi = document.createElement("li");
		itemLi.className = "view";


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
//-------------------------------------------------------

function renderFooter(currentFilter){
	var buttonContainer = document.getElementById("footLi");
	buttonContainer.innerHTML = "";
//-------------------------------------------------------
	var button1 = document.createElement("li");
	var showAllButton = document.createElement("button");
	showAllButton.id = "show_all";
	showAllButton.innerText = "All";
	showAllButton.className = currentFilter === "All" ? "filtered_button" : "";
	showAllButton.onclick = function () {
		render(dataListAll);
		renderFooter("All");
	};
	button1.appendChild(showAllButton);
	buttonContainer.appendChild(button1);
//-------------------------------------------------------
	var button2 = document.createElement("li");
	var showActiveButton = document.createElement("button");
	showActiveButton.id = "show_active";
	showActiveButton.innerText = "Active";
	showActiveButton.className = currentFilter === "Active" ? "filtered_button" : "";
	showActiveButton.onclick = function() {
		currentFilter = "Active";
		for(var i = 0; i < dataListAll.length; i++) {
			if(!dataListAll[i].checked){
				dataListActive.push(dataListAll[i]);
			}
		}
		render(dataListActive);
		dataListActive = [];
		renderFooter("Active");
	};
	button2.appendChild(showActiveButton);
	buttonContainer.appendChild(button2);
//-------------------------------------------------------
	var button3 = document.createElement("li");
	var showCompletedButton = document.createElement("button");
	showCompletedButton.id = "show_comleted";
	showCompletedButton.innerText = "Completed";
	showCompletedButton.className = currentFilter === "Completed" ? "filtered_button" : "";
	showCompletedButton.onclick = function() {
		currentFilter = "Completed";
		for(var i = 0; i < dataListAll.length; i++) {
			if(dataListAll[i].checked){
				dataListCompleted.push(dataListAll[i]);
			}
		}
		render(dataListCompleted);
		dataListCompleted = [];
		renderFooter("Completed");
	};
	button3.appendChild(showCompletedButton);
	buttonContainer.appendChild(button3);
//-------------------------------------------------------
	var button4 = document.createElement("li");
	var deleteCompletedButton = document.createElement("button");
	deleteCompletedButton.id = "clear_completed";
	deleteCompletedButton.innerText = "Clear completed";
	deleteCompletedButton.onclick = function() {
		var filteredDtaListAll = dataListAll.filter(function (item){
			var filteredItem;
			if(item.checked) filteredItem = item;
			return filteredItem;
		});
		for(var i = 0; i < dataListAll.length; i++){
			for(var j = 0; j < filteredDtaListAll.length; j++){
				if(dataListAll[i] === filteredDtaListAll[j]) dataListAll.splice(i, 1);
			}
		}
	
		render(dataListAll);
	};
	button4.appendChild(deleteCompletedButton);
	buttonContainer.appendChild(button4);
}

renderFooter("");

/*
в листе в твоем добавь вот что
1 - при добавлении туду очищать поле
2 - кнопку добавления (шо б была)
3 - фильтры внизу - надо текущий выделять, чтобы понятно было на каком ты
4 - clear completed удаляет только один, а надо чтобы все завершенные
*/