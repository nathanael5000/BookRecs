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

      '<ul>' +
      '  <li>Boy/Girl: ' + itemInput.sex + '</li>' +
      '  <li> A.R. Level: ' + itemInput.arlevel + '</li>' +
      '  <li> Difficulty: ' + itemInput.difficulty + '</li>' +
      '  <li>Genre: ' + itemInput.genre + '</li>' +
      '</ul>' +


      /*'<div class="row">' +
      '<div class="col-2">' +
      '<span class="badge badge-primary">Old</span>' +
      '</div>' +
      '<div class="col-2">' +
      '<span class="badge badge-secondary">New</span>' +
      */
      '</div>' +
      '</div>' +

      '</div>' +
      '</br>';


    // '<h2>' + itemInput.bookTitle + '</h2> <p>' + itemInput.authorName + '</p>' +
    //   itemInput.comments + '</h2> <p>' + itemInput.submitterName + '</p>';
    //console.log("single item = " + singleItem);
    mainContentDiv.innerHTML += singleItem;
  }

}

loadCurrentData();

const button = document.getElementById('submitButton');

button.addEventListener('click', event => {
  event.preventDefault();
  button.textContent = `Click count: ${event.detail}`;
});

const allDropdowns = document.getElementsByTagName('select');
for (var i = 0; i < allDropdowns.length; i++) {
  allDropdowns[i].addEventListener('change', event => {
    //event.preventDefault();
    var output = document.getElementById('output');
    output.innerText = event.target.value;
  });
}

/*Add code to reset one Genre menu if User selects a Genre from the OTHER menu.
 if(user makes genre menu selection){
    reset the other genre menu;
  }
*/