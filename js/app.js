console.log('hello ashwin');
showNotes();

// if user adds a item, store it in local Storage
addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let noteTitle = document.getElementById("noteTitle");
    if (noteTitle.value === ""){
        noteTitle.value = "No Title"
    }
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push([noteTitle.value,addTxt.value]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    noteTitle.value = "";
    addTxt.value = "";
    showNotes();
})

// function to add notes from localStorage

function showNotes() {
    let notes = localStorage.getItem("notes");
    
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body" style="text-transform:Capitalize;">
                    <h5 class="card-title"  >${element[0]}</h5>
                    <p class="card-text">${element[1]}</p>
                    <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                </div>
            </div>`;
        });
        if(notesObj.length !=0){
            document.getElementById("notes").innerHTML = html;
        }    
        else {
            document.getElementById("notes").innerHTML = `<b>No Notes to Show! Add a Note</b>`;
        }
}


// function to delete a note
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    let notesObj = JSON.parse(notes);
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

// search query
search = document.getElementById('searchTxt');
search.addEventListener("input", function(e){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let noteTitleTxt = element.getElementsByTagName("h5")[0].innerText.toLocaleLowerCase();
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal) || noteTitleTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})