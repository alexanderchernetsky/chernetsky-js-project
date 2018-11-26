function ajaxRequest( successFunc, data, dataType = 'json', url = 'http://fe.it-academy.by/AjaxStringStorage2.php') {
  $.ajax(
    {
      url: url,
      type: 'POST',
      data: data,
      cache: false,
      dataType: dataType,
      success: successFunc,
      error: errorHandler,
    },
  );
}
