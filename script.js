const inputbox = document.getElementById('input');
const listContainer = document.getElementById('list-container');

function saveData() {
    localStorage.setItem('groceryList', listContainer.innerHTML);
}

function loadData() {
    const data = localStorage.getItem('groceryList');
    if (data) {
        listContainer.innerHTML = data;
    }
}


function addTask(){
    if(inputbox.value ==""){
        alert("enter value")
    }
    else{
        const li = document.createElement("li");

        const textSpan = document.createElement('span');
        textSpan.className = 'item-text';
        textSpan.textContent = inputbox.value;
        li.appendChild(textSpan);

        const editSpan = document.createElement('span');
        editSpan.className = 'edit';
        editSpan.title = 'Edit';
        editSpan.innerHTML = '✎';
        li.appendChild(editSpan);

        const removeSpan = document.createElement('span');
        removeSpan.className = 'remove';
        removeSpan.innerHTML = '\u00d7';
        li.appendChild(removeSpan);

        listContainer.append(li);

        saveData();
    }
    inputbox.value=""


}

listContainer.addEventListener('click',function(e){
    const target = e.target;

    if(target.classList && target.classList.contains('remove')){
        // Remove the item
        target.parentElement.remove();
         saveData();
    } else if (target.classList && target.classList.contains('edit')){
        // Edit the item text
        const textSpan = target.parentElement.querySelector('.item-text');
        const current = textSpan ? textSpan.textContent : '';
        const newText = prompt('Edit item:', current);
        if(newText !== null){
            const trimmed = newText.trim();
            if(trimmed !== ''){
                textSpan.textContent = trimmed;
                saveData();
            } else {
                alert('Item cannot be empty');
            }
        }
    } else if (target.tagName === 'LI' || (target.classList && target.classList.contains('item-text'))){
        // Toggle checked state
        const li = (target.tagName === 'LI') ? target : target.parentElement;
        li.classList.toggle('checked');
         saveData();
    }

}, false);

loadData();