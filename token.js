ePayco.setPublicKey("485d5b188e7e9796c74cc9d7f64931fb");

$("#customer-form").submit(function (event) {
  //detiene el evento automático del formulario
  event.preventDefault();
  //captura el contenido del formulario
  var $form = $(this);
  //deshabilita el botón para no acumular peticiones
  $form.find("button").prop("disabled", true);
  //hace el llamado al servicio de tokenización
  ePayco.token.create($form, function (error, token) {
    //habilita el botón al obtener una respuesta
    $form.find("button").prop("disabled", false);
    if (!error) {
      //si la petición es correcta agrega un input "hidden" con el token como valor
      $form.append($(`<input type="text" name="epaycoToken">`).val(token));
      //envia el formulario para que sea procesado
      $form.get(0).submit();
    } else {
      //muestra errores que hayan sucedido en la transacción
      $(".customer-errors").text(error.description);
    }
  });
});
