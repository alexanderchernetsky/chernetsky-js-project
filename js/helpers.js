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