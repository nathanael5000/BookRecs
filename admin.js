function loadCurrentData() {

  var sourceDataUrl = 'https://sheet.best/api/sheets/193d999b-b8dd-4480-95c2-2d1488c5c6ec';

  //console.log("Test"); //PASSS


  fetch(sourceDataUrl)
    .then((response) => response.json())
    .then((data) => {
      //console.log(JSON.stringify(data)); //OK PASS
      data.forEach(item => showData(item));
    })
    .catch((error) => {
      console.error(error);
    });

  function showData(itemInput) {
    var mainContentDiv = document.getElementById('mainContent');

    //TODO: Add placeholder text "No comments on this book" if there are no Comments.
    if (!itemInput.comments) {
      itemInput.comments = "No comments on this book";
    }
    var dateSubmittedObject = new Date(itemInput.dateSubmitted);
    var dateSubmittedFriendlyView = dateSubmittedObject.toDateString();

    var singleItem = '<div class="card">' +
      //'<img class="card-img-top" src="..." alt="Card image cap">'+
      '<div class="card-body">' +
      '<h5 class="card-title">' + itemInput.bookTitle + '</h5>' +
      '<h6 class="card-subtitle"> by ' + itemInput.authorName + '</h6>' +
      '<span class="card-text">' + itemInput.comments + '</span>' + '</div>' +
      //'<a href="#" class="btn btn-primary">Go somewhere</a>' +
      '<div class="card-footer text-muted"> Recommended by ' + itemInput.submitterName +
      ' on ' + dateSubmittedFriendlyView +
      '</div>' +
      //'</div>' +
      '</div>' +
      '</br>';


    // '<h2>' + itemInput.bookTitle + '</h2> <p>' + itemInput.authorName + '</p>' +
    //   itemInput.comments + '</h2> <p>' + itemInput.submitterName + '</p>';
    //console.log("single item = " + singleItem);
    mainContentDiv.innerHTML += singleItem;
  }

}
loadCurrentData();

/*
Write a function to create a new record.

1. Take form data.
2. Send data to Backend.
3. Display new data

UI -> JS -> Sheet.Best -> Google Sheets
UI -> JS -> Server Processing -> Database

*/

function sendData(dataToSend) {
  var postDataUrl = 'https://sheet.best/api/sheets/193d999b-b8dd-4480-95c2-2d1488c5c6ec';

  fetch(postDataUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
    .then((response) => {
      //if (response.status = 200) {
      if (response.ok) { //same as the line above
        console.log("Server fetch response: OK");
      }
      return response.json();
    })
    .then((data) => {
      // The response comes here
      console.log("61: " + JSON.stringify(data));
    })
    .catch((error) => {
      // Errors are reported there
      console.log(error);
    });
}

function formSubmit(event) {
  event.preventDefault();
  //Save data to the Backend
  //Get the Form Data
  const recForm = document.getElementById('newRecForm');
  const recFormData = new FormData(recForm);
  console.log("recFormData = " + recFormData.keys());

  //recFormData.get("nameOfBook") //Returns value for that key
  //recFormData.get("bookTitle") //Returns value for that key

  /*for (var entry of recFormData.entries()) {
    console.log(entry[0] + ": " + entry[1]); 
  }
  Returns:
    [0] nameOfBook: Test Book Title
    [1] authorName: Gandalf Farnam
  */

  var newDate = new Date();
  var newDateString = newDate.toISOString();

  var selectedGenre = null;
  var fictionDropdownValue = recFormData.get('fiction');
  var nonfictionDropdownValue = recFormData.get('nonfiction');

  if (fictionDropdownValue !== "None" && nonfictionDropdownValue !== "None") {
    alert("Please select a genre from either the Fiction or Nonfiction menu. You cannot select from both.");
  } else if (fictionDropdownValue !== "None") {
    //If User selected a Fiction Genre, then the Dropdown value is not "None"
    selectedGenre = fictionDropdownValue;
    console.log("User selected a Fiction genre: '" + fictionDropdownValue + "'.");
  } else if (nonfictionDropdownValue !== "None") {
    //If User selected a Non-Fiction Genre, then the Dropdown value is not "None"
    selectedGenre = nonfictionDropdownValue;
    console.log("User selected a Nonfiction genre: '" + nonfictionDropdownValue + "'.");
  }


  var dataPackage = {
    'bookTitle': recFormData.get('bookTitle'),
    'authorName': recFormData.get('authorName'),
    'comments': recFormData.get('comments'),
    'submitterName': recFormData.get('submitterName'),
    'dateSubmitted': newDateString,
    'sex': recFormData.get('sex'),
    'arlevel': recFormData.get('arlevel'),
    'difficulty': recFormData.get('difficulty'),
    'genre': selectedGenre
  }

  //Don't send the data package if it's incomplete

  if (selectedGenre !== null) {
    sendData(dataPackage);
  }
}

const recForm = document.getElementById('newRecForm');
recForm.addEventListener('submit', formSubmit);