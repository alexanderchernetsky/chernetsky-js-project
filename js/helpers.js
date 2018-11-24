function ajaxRequest(type, successFunc, data, dataType = 'json', url = 'http://fe.it-academy.by/AjaxStringStorage2.php', cache = false) {
  $.ajax(
    {
      url: url,
      type: type,
      data: data,
      cache: cache,
      dataType: dataType,
      success: successFunc,
      error: errorHandler,
    },
  );
}
