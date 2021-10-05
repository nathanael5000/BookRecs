async function clearContent() {
  var mainContentDiv = document.getElementById('mainContent');
  mainContentDiv.innerHTML = null;
}

function showData(itemInput) {
  //console.log("Item = " + JSON.stringify(itemInput));
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
    '  <li> Genre: ' + itemInput.genre + '</li>' +
    '  <li> Boy/Girl: ' + itemInput.sex + '</li>' +
    '  <li> A.R. Level: ' + itemInput.arlevel + '</li>' +
    '  <li> Difficulty: ' + itemInput.difficulty + '</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +

    '</div>' +
    '</br>';


  // '<h2>' + itemInput.bookTitle + '</h2> <p>' + itemInput.authorName + '</p>' +
  //   itemInput.comments + '</h2> <p>' + itemInput.submitterName + '</p>';
  //console.log("single item = " + singleItem);
  mainContentDiv.innerHTML += singleItem;
}

async function loadCurrentData() {
  var sourceDataUrl = 'https://sheet.best/api/sheets/193d999b-b8dd-4480-95c2-2d1488c5c6ec';
  var fetchResponse = await fetch(sourceDataUrl)
    .then((response) => response.json())
    // .then((data) => {
    //   //console.log(JSON.stringify(data)); //OK PASS
    //   return response;
    // })
    .catch((error) => {
      console.error(error);
    });
  //console.log(JSON.stringify(fetchResponse)); //OK
  return fetchResponse;
}

loadCurrentData().then((data) => {
  data.forEach(item => showData(item))
});

//TEST to learn Event Listeners (not part of Book Recs)
// const button = document.getElementById('submitButton');
// button.addEventListener('click', event => {
//   event.preventDefault();
//   button.textContent = `Click count: ${event.detail}`;
// });

function filterResults() {
  var filterCriteria = {};
  const allFormElements = document.querySelectorAll('div.form-group > select, input');
  for (var i = 0; i < allFormElements.length; i++) {
    allFormElements[i].addEventListener('change', event => {

      //Get HTML Element where the change occurred
      var menuElement = event.target;
      var menuName = menuElement.name; //returns the value of the name attribute from the 
      //console.log("Menu Name = " + menuName); //PASS: returns the dropdown element

      //Reset one Genre menu if User selects a Genre from the OTHER menu
      if (menuName === "fiction") {
        console.log("User selected an option from the Fiction menu.");
        var genreDropDown = document.getElementById("nonfictionMenu");
        genreDropDown.selectedIndex = 0;
        menuName = "genre";
      } else if (menuName === "nonfiction") {
        console.log("User selected an option from the Non-Fiction menu.");
        var genreDropDown = document.getElementById("fictionMenu");
        genreDropDown.selectedIndex = 0;
        menuName = "genre";
      }

      var menuValue = event.target.value;
      console.log("menuValue = " + menuValue);
      filterCriteria[menuName] = menuValue;
      alert("filterCriteria = " + JSON.stringify(filterCriteria));
    });
  }

  //TODO: Add code to compile filter criteria when multiple criteria are selected.

  loadCurrentData()
    .then((data) => {
      clearContent();
      //var filteredResults = data.filter(book => book.sex === "Boys"); //TEST
      //TODO: Fix this to use ALL selected filter criteria (Cf. filterCriteria)
      //var filteredResults = data.filter(book => book[menuName] === menuValue); 

      var filteredResults = data; //TODO: this is a temporary crutch until we make it work with multiple filter criteria
      //console.log(filteredResults);
      filteredResults.forEach(item => showData(item));
    });
}
filterResults();

//TEST LAB
var arLeveltestValue = "8.6,9.7";
//Test Value by outputting to innerText
// var output = document.getElementById('output');
// output.innerText = menuValue;