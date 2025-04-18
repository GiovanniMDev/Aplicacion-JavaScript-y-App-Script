function doGet() {
  return HtmlService.createHtmlOutputFromFile('formulario');
}

function guardarNotas(data) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const fila = hoja.getLastRow() + 1;

  for (var n = 1; n <= fila; n++) {
  var correoExistente = hoja.getRange(n, 3).getValue();
  if (correoExistente === data.correo) {
    return "Error, el correo ya fue registrado";
  }
}

  const promedio = ((data.nota1 + data.nota2 + data.nota3) / 3).toFixed(2);
  const estado = promedio >= 11 ? "Aprobado" : "Desaprobado";

  hoja.getRange(fila, 1).setValue(new Date()); // Fecha
  hoja.getRange(fila, 2).setValue(data.nombre);
  hoja.getRange(fila, 3).setValue(data.correo);
  hoja.getRange(fila, 4).setValue(data.nota1);
  hoja.getRange(fila, 5).setValue(data.nota2);
  hoja.getRange(fila, 6).setValue(data.nota3);
  hoja.getRange(fila, 7).setValue(promedio);
  hoja.getRange(fila, 8).setValue(estado);
  hoja.getRange(fila, 9).setValue(new Date());

  return `Notas de  ${data.nombre} guardadas con éxito. Promedio: ${promedio} (${estado})`;
}
