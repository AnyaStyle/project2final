console.log('DEBUG: connected');

var userInput = {
  'Accomodation Type': '',
  'Check In': '',
  'Check Out': '',
  'Guests': '',
};

var isUserInputValid = {
  'Accomodation Type': false,
  'Check In': false,
  'Check Out': false,
  'Guests': false,
};

function choiceRender() {
  let output = '<div id="user-selection-render">'
    + '<div id="user-selection-header"><font color="#41913C"><h1>Your choice is:</h1></font></div>';
  for (let key in userInput) {
    output += `<p><b>${key}:</b> ${userInput[key]}</p>`;
  }
  output += '</div>';
  document.getElementById("user-selection-render").innerHTML = output;
}

function validateUserInput(
  accomodationTypeSelected,
  checkInSelected,
  checkOutSelected,
  guestsSelected
) {
  if (accomodationTypeSelected !== 'default') {
    isUserInputValid = { ...isUserInputValid, 'Accomodation Type': true };
  }
  if (checkInSelected.length !== 0) {
    isUserInputValid = { ...isUserInputValid, 'Check In': true };
  }
  if (checkOutSelected.length !== 0) {
    isUserInputValid = { ...isUserInputValid, 'Check Out': true };
  }
  if (parseInt(guestsSelected) >= 1 && parseInt(guestsSelected) <= 4) {
    isUserInputValid = { ...isUserInputValid, 'Guests': true };
  }
  else { // to reset to false after a valid input changed to invalid
    isUserInputValid = { ...isUserInputValid, 'Guests': false };
  }
  return isUserInputValid;
}

function onClickSearchHandler() {
  var isInputValidated = false;
  var accomodationTypeSelected = document.getElementById("accommodation-type").value;
  var checkInSelected = document.getElementById("check-in").value;
  var checkOutSelected = document.getElementById("check-out").value;
  var guestsSelected = document.getElementById("guests").value;

  var validation = validateUserInput(
    accomodationTypeSelected,
    checkInSelected,
    checkOutSelected,
    guestsSelected
  );

  var values = Object.values(validation);

  if (!values.includes(false)) {
    isInputValidated = true;
  };


  if (isInputValidated) {
    userInput = {
      'Accomodation Type': accomodationTypeSelected,
      'Check In': checkInSelected,
      'Check Out': checkOutSelected,
      'Guests': guestsSelected,
    };

    choiceRender();
    document.getElementById("alert-message").style.display = "none";

  }
  else {
    var accomodation = document.getElementById("isvalid-accomodation");
    var checkIn = document.getElementById("isvalid-check-in");
    var checkOut = document.getElementById("isvalid-check-out");
    var guests = document.getElementById("isvalid-guests");

    for (let key in validation) {
      if (key === 'Accomodation Type' && validation[key]) {
        accomodation.classList.remove("invalid");
        accomodation.classList.add("valid");
      }
      if (key === 'Check In' && validation[key]) {
        checkIn.classList.remove("invalid");
        checkIn.classList.add("valid");
      }
      if (key === 'Check Out' && validation[key]) {
        checkOut.classList.remove("invalid");
        checkOut.classList.add("valid");
      }
      if (key === 'Guests' && validation[key]) {
        guests.classList.remove("invalid");
        guests.classList.add("valid");
      }
    }

    document.getElementById("alert-message").style.display = "block";
  }
}
