//Configuracion del editor
var editor = ace.edit(document.getElementById("editor"));
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

//Refresco del contador de lineas
setInterval(loop, 2);

function loop() {
  var lines = editor.session.getLength();

  document.getElementById('lines').innerHTML = "Líneas: " + lines;
}

loop();

//Modo lectura
var lectura = false;

function modoLectura() {
  if (lectura) {
    lectura = false;

    editor.setReadOnly(false);

    document.getElementById("btLectura").value = "Activar";

    alert("Modo lectura desactivado.");
  } else {
    lectura = true;

    editor.setReadOnly(true);

    document.getElementById("btLectura").value = "Desactivar";

    alert("Modo lectura activado.");

    insertaFuncion();
  }
}

//Insertar funcion ejemplo

function insertaFuncion(operacion) {
  if (lectura) {
    return;
  }

  switch (operacion) {
    case "sumar":
      editor.insert("function sumar(a, b) {\n\tvar suma = a + b;\n\treturn suma;\n}console.log(sumar(2,2));");
      break;

    case "restar":
    editor.insert("function restar(a, b) {\n\tvar resta = a - b;\n\treturn resta;\n}console.log(restar(2,2));");
      break;
  }
}

//POST a API JDOODLE mediante libreria AXIOS

function comprobarCodigo() {
  var codigo = editor.getValue();

  console.log(codigo);


  var programa = {
    "script": codigo,
    "language": "nodejs",
    "versionIndex": "2",
    "clientId": "afd8fd858fc5a7f6248b68a95d154249",
    "clientSecret": "d7645cb793209a0fb1d11066f341fad4443f392c41ef7cc78bbc01472ea0e053"
  }

  console.log(JSON.stringify(programa));

  axios.post('https://api.jdoodle.com/execute', programa)
  .then(function (response) {

    if(response['status'] == 200){
      console.log("Tu código es correcto!");
    }

    console.log(response);
  })
  .catch(function (error) {
    alert("Error en el código: " + error);
    console.log(error);
    console.log('error:', error);
  });

  
}

  /*
var request = require('request');

  request({
    url: 'https://api.jdoodle.com/execute',
    method: "POST",
    json: program
  },
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  */
