let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addText = document.getElementById("note-text");
let adddob = document.getElementById("note-dob");
let addurl = document.getElementById("url");




addBtn.addEventListener("click", (e) => {
    if(addTitle.value == "" || addText.value == ""){
        return alert("Please add title and details");
    }

    let notes = localStorage.getItem("notes");

    if(notes == null) {
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addText.value,
        textdob: adddob.value,
        texturl: addurl.value,

    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addText.value = "";
    adddob.value = "";
    addurl.value = "";



    showNotes();


})

// Show notes on the page

function showNotes() {
    let notes = localStorage.getItem("notes");
    if(notes == null) {
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach(function(element, index) {
        html += `
        <div class="box" id="note">
              <p id="note-counter">Note- ${index + 1}</p>
              <h2 style="font-size:15px;" id="note-title">Title: ${element.title}</h2>
              <p style="font-size:14px;" id="note-text">Description: ${element.text}</p>
              <p style="font-size:14px;" id="note-text">Deadline: ${element.textdob}</p>
              <p style="font-size:14px;" id="note-text">Resource:    <a href="${element.texturl}">Click Here</a></p>
              

                <button id="${index}" onClick="deleteNote(this.id)" class="note-btn">DELETE NOTE</button>   
          </div>
        `;
    });
    

    let noteElm = document.getElementById("note");
    if(notesObj.length !=0){
        noteElm.innerHTML = html;
    }else {
        noteElm.innerHTML = "No Notes Yet!!!";

    }
}

// function to delete notes
function deleteNote(index){
    let confirmDel = confirm("You are deleting this note!!!");

    if(confirmDel == true){
        let notes = localStorage.getItem("notes");
        if(notes == null) {
            notesObj = [];
        }else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();

    }
}

showNotes();