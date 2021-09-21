var confirmar = (() => {
  var init = function (data, funcionOk,funcionCancel) {
    $("#preguntamodal").modal("show");
    if (data !== undefined && data !== null) {
      if (data.aceptarModal !== undefined)
        document.getElementById("aceptarModal").innerHTML = data.aceptarModal;
      if (data.tituloModal !== undefined)
        document.getElementById("tituloModal").innerHTML = data.tituloModal;
      if (data.mensajeModal !== undefined)
        document.getElementById("mensajeModal").innerHTML = data.mensajeModal;
      if (data.cancelarModal !== undefined)
        document.getElementById("cancelarModal").innerHTML = data.cancelarModal;
    }

    document
      .getElementById("aceptarModal")
      .addEventListener("click", function (e) {
        funcionOk();
        $("#preguntamodal").modal("hide");
        e.preventDefault();
        e.stopImmediatePropagation();
      });

    document
      .getElementById("cancelarModal")
      .addEventListener("click", function (e) {
        funcionCancel();
        $("#preguntamodal").modal("hide");
        e.stopImmediatePropagation();
        e.preventDefault();
      });
  };
  
  return {
    init: init    
  };
})();

var confirmar2 = (() => {
 
  var crearPromesa = function (resolver, rechazar) {
    var promesa = new Promise(function (resolve, reject) {
      try {
        resolve(resolver);
      } catch (error) {
        //reject(new Error(error));
        reject(rechazar);
      } finally {
        console.log("finalizando...");
      }
    });
    return promesa;
  };

  var init = function (data) {  
    if (data !== undefined && data !== null) {
      if (data.aceptarModal !== undefined)
        document.getElementById("aceptarModal").innerHTML = data.aceptarModal;
      if (data.tituloModal !== undefined)
        document.getElementById("tituloModal").innerHTML = data.tituloModal;
      if (data.mensajeModal !== undefined)
        document.getElementById("mensajeModal").innerHTML = data.mensajeModal;
      if (data.cancelarModal !== undefined)
        document.getElementById("cancelarModal").innerHTML = data.cancelarModal;

      if (data.botones != undefined && data.botones !== null) 
      {
      }
    }

    let resolver = function () {
      document
        .getElementById("aceptarModal")
        .addEventListener("click", function (e) {
          $("#preguntamodal").modal("hide");
          e.stopImmediatePropagation();
          e.preventDefault();
        });
    };

    let rechazar = function () {
      document
        .getElementById("cancelarModal")
        .addEventListener("click", function (e) {
          e.stopImmediatePropagation();
          e.preventDefault();
        });
    };

    mostrar();
    return crearPromesa(resolver, rechazar);    
  };

  var cerrar = function (funcionCancel) {
    document
      .getElementById("cancelarModal")
      .addEventListener("click", function (e) {
        funcionCancel();
        e.preventDefault();
        e.stopImmediatePropagation();
      });
  };

  var mostrar = function(){
    $("#preguntamodal").modal("show");
  }
  
  return {
    init: init,
    mostrar: mostrar,
    cerrar: cerrar   
  };
})();

