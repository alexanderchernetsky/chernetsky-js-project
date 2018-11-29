/** This function is a template for jQuery ajax HTTP request and helps us to shorten code in spa.js file
 * @param {function} successFunc - If the request was successful this function would be executed
 * @param {object} data - It's the object with properties that are necessary for the request.
 * @param {string} dataType - type of transferring data.
 * @param {string} url - web address of backend script.
 * */
function ajaxRequest(successFunc, data, dataType = 'json', url = 'http://fe.it-academy.by/AjaxStringStorage2.php') {
  $.ajax(
    {
      url,
      type: 'POST',
      data,
      cache: false,
      dataType,
      success: successFunc,
      error: errorHandler,
    },
  );
}

/**
 * Show error message if ajax request was failed
 */
function errorHandler(jqXHR, StatusStr, ErrorStr) {
  alert(`${StatusStr} ${ErrorStr}`);
}

/**
 * Ask user if he really want to close the whole browser tab. This function is used
 * with the beforeunload event listener and only while user is playing the game.
 * @param {Object} EO - the event object
 */
function askUser(EO) {
  EO = EO || window.event;
  const dialogText = 'Do you want to exit the game?';
  EO.returnValue = dialogText;
  return dialogText;
}
