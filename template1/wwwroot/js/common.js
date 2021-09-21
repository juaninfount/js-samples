"use strict";

/*********************************************************************************/
// Common
var common = (() => {
  /*********************************************************************************/
  // Numerical
  var numerical = {
    getRandomNumberDefault: function () {
      return Math.floor(Math.random() * 100000 + 1);
    },
    getRandomNumber: function (i, j) {
      if (!checkValidValue(i)) i = 1;
      if (!checkValidValue(j)) j = 100000;
      return Math.floor(Math.random() * j + i);
    },
    getRandomString: function (len) {
      var arr = new Uint8Array((len || 40) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, this.dec2hex).join("");
    },
    roundNDec: function (number, d) {
      if (!checkValidValue(d)) {
        d = 0;
      }
      return Math.round(number * Math.pow(10, d)) / Math.pow(10, d);
    },
    roundNDecCtrl: function (sender, d) {
      let number = document.getElementById(sender).value;
      number = Math.round(number * Math.pow(10, d)) / Math.pow(10, d);
      document.getElementById(sender).value = number;
    },
    numberFormat: function (number, decimals) {
      if (
        (typeof number === "number" || typeof number === "string") &&
        (typeof decimals === "number" || typeof decimals === "string")
      ) {
        let result = parseFloat(number);
        decimals = parseFloat(decimals);
        return result.toFixed(decimals);
      }
      return "0.00";
    },
    dec2hex: function (dec) {
      return ("0" + dec.toString(16)).substr(-2);
    },
  };
  /*********************************************************************************/
  // Eventos
  var events = {
    pressInteger: function (sender, evt) {
      let answer = true;
      let theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      let regex = /[0-9]/;
      answer = regex.test(key);
      return answer;
    },
    pressFloat: function (sender, e) {
      if ([e.keyCode || e.which] == 8)
        //this is to allow backspace
        return true;

      if ([e.keyCode || e.which] == 46) {
        //this is to allow decimal point
        let val = document.getElementById(sender);
        if (val.indexOf(".") > -1) {
          e.returnValue = false;
          return false;
        }
        return true;
      }

      if ([e.keyCode || e.which] < 48 || [e.keyCode || e.which] > 57)
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    },
  };
  /*********************************************************************************/
  // Table
  var table = {
    /* Functions that can be used with jquery + datatable js */

    setDataTableSelectedRows: function (tableID) {
      let table = $(tableID).DataTable();
      if ($(this).hasClass(util.selectedRowClass)) {
        $(this).removeClass(util.selectedRowClass);
      } else {
        table.$("tr.selected").removeClass(util.selectedRowClass);
        $(this).addClass(util.selectedRowClass);
      }
    },
    setDataManually: function (tableID, data) {
      $(tableID).clear();
      $(tableID).rows.add(data).draw();
    },
  };
  // string
  var string = {};

  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };

  var dateTime = {
    /**
     * @date1ID {string} text-typed input ID 1 in dd/MM/yyyy format
     * @date2ID {string} text-typed input ID 2 in dd/MM/yyyy format
     * @returns Result: -1 (date1 < date2), 0 (date1 == date2), 1  (date1 > date2)
     */
    compareControlDate: function (date1ID, date2ID) {
      let result = -1;
      var date1 = document.getElementById(date1ID).value;
      var date2 = document.getElementById(date2ID).value;
      if (checkValidValue(date1) && checkValidValue(date2)) {
        result = this.compareDate(date1, date2);
      }
      return result;
    },
    /**
     * @date1ID {string} date value in string format date1 dd/MM/yyyy
     * @date2ID {string} date value in string format date2 dd/MM/yyyy
     * @returns Result: -1 (date1 < date2), 0 (date1 == date2), 1  (date1 > date2)
     */
    compareDate: function (date1, date2) {
      let result = -1;
      if (checkValidValue(date1) && checkValidValue(date2)) {
        let validDate1 = this.getValidDate(date1);
        let validDate2 = this.getValidDate(date2);
        if (checkValidValue(validDate1) && checkValidValue(validDate2)) {
          let yyyy1 = parseInt(date1.substr(6, 4));
          let mm1 = parseInt(date1.substr(3, 2));
          let dd1 = parseInt(date1.substr(0, 2));

          let yyyy2 = parseInt(date2.substr(6, 4));
          let mm2 = parseInt(date2.substr(3, 2));
          let dd2 = parseInt(date2.substr(0, 2));

          let number_date1 = parseInt(yyyy1 + "" + mm1 + "" + dd1);
          let number_date2 = parseInt(yyyy2 + "" + mm2 + "" + dd2);

          if (number_date1 < number_date2) {
            result = -1;
          } else if (number_date1 === number_date2) {
            result = 0;
          } else if (number_date1 > number_date2) {
            result = 1;
          }
        }
      }
      return result;
    },
    /**
     *
     * @fecha {DD/MM/YYYY} Fecha en formato string
     * @returns Fecha valida tipo javascript
     */
    getValidDate: function (fecha) {
      if (!checkValidValue(fecha) || fecha.length !== 10) {
        return null;
      }

      let yyyy = parseInt(fecha.substr(6, 4));
      let mm = parseInt(fecha.substr(3, 2));
      let dd = parseInt(fecha.substr(0, 2));
      let newdate = new Date(yyyy, mm - 1, dd);
      if (!checkValidValue(newdate)) newdate = null;
      return newdate;
    },
    /**
     *
     * @param {DD/MM/YYYY HH:mm:ss} fechaHora
     * @returns
     */
    getValidDatetime: function (fechaHora) {
      if (!checkValidValue(fechaHora) || fechaHora.length !== 19) {
        return null;
      }

      let yyyy = parseInt(fechaHora.substr(6, 4));
      let mm = parseInt(fechaHora.substr(3, 2));
      let dd = parseInt(fechaHora.substr(0, 2));
      let HH = parseInt(fechaHora.substr(11, 2));
      let MM = parseInt(fechaHora.substr(14, 2));
      let SS = parseInt(fechaHora.substr(17, 2));
      fechaHora = new Date(yyyy, mm - 1, dd, HH, MM, SS);
      if (!checkValidValue(fechaHora)) fechaHora = null;
      return fechaHora;
    },
    /**
     *
     * @returns Return date in yyyy-mm-dd format
     */
    getToday: function () {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      let strToday = yyyy + "-" + mm + "-" + dd + "";
      return strToday;
    },
    /**
     *
     * @returns Return date in dd/mm/yyyy format
     */
    getToday2: function () {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      let strToday = dd + "/" + mm + "/" + yyyy + "";
      return strToday;
    },
  };
  /*********************************************************************************/
  var collections = {
      range: function(start, stop, step = 1) 
      {
        let array = Array(Math.ceil( (stop + 1 - start) / step) ).fill(start).map((x, y) => x + y * step);
        return array;
      }    
  };
  /*********************************************************************************/
  // Constantes
  var botonesFA = {
    ejecutar: "btnErrores_#btn",
    buscar: "btnBuscar_#btn",
    editar: "btnEditar_#btn",
    examinar: "btnExaminar_#btn",
    conforme: "btnConforme_#btn",
    errores: "btnErroresOdt_#btn",
    importar: "btnImportarOdt_#btn",
    validar: "btnValidarOdt_#btn",
    historial: "btnHistorialOdt_#btn",
    excel: "btnExcel_#btn",
    consultar: "btnConsultar_#btn",
    mailCerrado: "btnMailCerrado_#btn",
    recorrido: "btnRecorrido_#btn",
    alerta: "btnAlerta_#btn",
  };

  var util = {
    selectedRowClass: "active-row",
    constantes: {
      fecha_min: "01/01/1970",
      fecha_max: dateTime.getToday(),
    },
    formatosFecha: {
      _00_00_0000: "00/00/0000",
      dd_MM_yyyy2: "dd/mm/yyyy",
      ISO: "YYYY-MM-DD HH:mm:ss",
      dd_MM_yyyy_HH_mm_ss: "DD/MM/YYYY HH:mm:ss",
      YYYY_MM_DD: "YYYY-MM-DD",
    },
    pattern: {
      decimaltwoplaces: "d*(.d{0,2})?",
      dd_MM_yyyy: "d{1,2}/d{1,2}/{1,4}",
      formatoPlaca: /[A-Za-z0-9]/, // validador de digitacion en textbox para PLACA
    },
    // datatables: mensajes y etiquetas
    lenguajeESDt: {
      sProcessing: "Procesando...",
      sLengthMenu: "Mostrar _MENU_ registros",
      sZeroRecords: "No se encontraron resultados",
      sEmptyTable: "Ningún dato disponible en esta tabla",
      sInfo:
        "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
      sInfoPostFix: "",
      sSearch: "", // cambiar por icono
      sUrl: "",
      sInfoThousands: ",",
      sLoadingRecords: "Cargando...",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      oAria: {
        sSortAscending:
          ": Activar para ordenar la columna de manera ascendente",
        sSortDescending:
          ": Activar para ordenar la columna de manera descendente",
      },
    },
    iconos: [
      {
        iconEjecutar:
          "<a class='btn' id='" +
          botonesFA.ejecutar +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-play' style='color:green;' aria-hidden='true'></i> " +
          "</a>",
        iconBuscar:
          "<a class='btn' id='" +
          botonesFA.buscar +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-search'  aria-hidden='true'></i> " +
          "</a>",
        iconEditar:
          "<a class='btn' id='" +
          botonesFA.editar +
          "' href='#href' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-edit' style='color:green;'  aria-hidden='true'></i>" +
          "</a>",
        iconEditarBlank:
          "<a class='btn' id='" +
          botonesFA.editar +
          "' href='#href' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title' target='_blank'>" +
          "<i class='fas fa-lg fa-edit' style='color:green;'  aria-hidden='true'></i>" +
          "</a>",
        iconExaminar:
          "<a class='btn' id='" +
          botonesFA.examinar +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-folder' style='color:#d5bd29' aria-hidden='true'></i>" +
          "</a>",
        iconConforme:
          "<a class='btn' id='" +
          botonesFA.conforme +
          "' href='#' aria-label='#title' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-check-circle' aria-hidden='true' style='color: #3b88c2'></i>" +
          "</a>",
        iconErrores:
          "<a class='btn' id='" +
          botonesFA.errores +
          "' href='#' aria-label=#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-exclamation-triangle' style='color:#ff2e2e;' aria-hidden='true'></i> " +
          "</a>",
        iconImportar:
          "<a class='btn' id='" +
          botonesFA.importar +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-upload' style='color:#dc6109' aria-hidden='true'></i>" +
          "</a>",
        iconValidar:
          "<a class='btn' id='" +
          botonesFA.validar +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-tasks' style='color:green' aria-hidden='true'></i>" +
          "</a>",
        iconHistorial:
          "<a class='btn' id='" +
          botonesFA.historial +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-clock' style='color:#c0c4c1' aria-hidden='true'></i>" +
          "</a>",
        iconHistorialObs:
          "<a class='btn' id='" +
          botonesFA.historial +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-clock' style='color:#1437e3' aria-hidden='true'></i>" +
          "</a>",
        iconExcelFile:
          "<a class='btn' id='" +
          botonesFA.excel +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='far fa-lg fa-file-excel' style='color: green' aria-hidden='true'></i>" +
          "</a>",
        iconConsultar:
          "<a class='btn' id='" +
          botonesFA.consultar +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-eye #class' style='color:#678bc9' aria-hidden='true'></i>" +
          "</a>",
        iconMailCerrado:
          "<a class='btn' id='" +
          botonesFA.mailCerrado +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-envelope' style='color: green' aria-hidden='true'></i>" +
          "</a>",
        iconRecorrido:
          "<a class='btn' id='" +
          botonesFA.recorrido +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-directions' style='color: #3383FF' aria-hidden='true'></i>" +
          "</a>",
        iconAlerta:
          "<a class='btn' id='" +
          botonesFA.alerta +
          "' href='#' aria-label='#title' onclick='javascript:#js;' " +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg fa-exclamation-triangle' style='color: #E26310' aria-hidden='true'></i>" +
          "</a>",
        iconNull:
          "<a class='btn' href='#' aria-label='#title'" +
          "data-toggle='tooltip' data-placement='top' title='#title'>" +
          "<i class='fas fa-lg hidden'  aria-hidden='true'></i>" +
          "</a>",
      },
    ],
  };
  /*********************************************************************************/
  return {
    numerical: numerical,
    events: events,
    util: util,
    table: table,
    dateTime: dateTime,
    string: string,    
    collections:collections
  };
})();

function checkValidValue(input) {
  return !(
    input === null ||
    input === "" ||
    input === undefined ||
    input === "0" ||
    input === "-1" ||
    typeof input === "undefined"
  );
}
