window.onload = function(e){
  js.init();
};

var js = (() => {
  var ctx;
  var factorvalue = 1; // valor de escalado
  var fontfamily = "65px 'Gill Sans Ultra Bold', sans-serif";
  /**
   * States:
   * fulfilled
   * rejected
   * pending
   *
   */

  document.getElementById("abrirCuestionario").addEventListener(
    "click",
    function (e) {
      let data = {
        mensajeModal: "¿Desea iniciar cuestionario?",
        tituloModal: "Inicio de cuestionario",
      };
      confirmar.init(
        data,
        function () {
          console.log("aceptar");
        },
        function () {
          console.log("cerrar");
        }
      );
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    false
  );

  var initLogo = function () {
    ctx = document.getElementById("canvas").getContext("2d");
    ctx.font = fontfamily;
    ctx.save();
    ctx.fill();
    dologo();
  };

  let dologo = function () {
    var offsety = 80;

    ctx.restore();
    ctx.save();
    ctx.clearRect(0, 0, 600, 400);
    ctx.scale(factorvalue, factorvalue);

    ctx.fillText("HTML", 31, 60);
    ctx.translate(0, offsety);

    ctx.fillStyle = "#E34C26"; // orange
    ctx.beginPath();
    ctx.moveTo(39, 250);
    ctx.lineTo(17, 0);
    ctx.lineTo(262, 0);
    ctx.lineTo(239, 250);
    ctx.lineTo(139, 278);
    ctx.closePath();

    ctx.fill();
    ctx.fillStyle = "#F06529"; //darker orange
    ctx.beginPath();
    ctx.moveTo(139, 257);
    ctx.lineTo(220, 234);
    ctx.lineTo(239, 20);
    ctx.lineTo(139, 20);
    ctx.closePath();

    ctx.fill();
    ctx.fillStyle = "#EBEBEB";
    ctx.beginPath();
    ctx.moveTo(139, 113);
    ctx.lineTo(98, 113);
    ctx.lineTo(96, 82);
    ctx.lineTo(139, 82);
    ctx.lineTo(139, 51);
    ctx.lineTo(62, 51);
    ctx.lineTo(70, 144);
    ctx.lineTo(139, 144);
    ctx.closePath();

    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(139, 193);
    ctx.lineTo(105, 184);
    ctx.lineTo(103, 159);
    ctx.lineTo(72, 159);
    ctx.lineTo(76, 207);
    ctx.lineTo(139, 225);
    ctx.closePath();

    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(139, 113);
    ctx.lineTo(139, 144);
    ctx.lineTo(177, 144);
    ctx.lineTo(173, 184);
    ctx.lineTo(139, 193);
    ctx.lineTo(139, 225);
    ctx.lineTo(202, 207);
    ctx.lineTo(210, 113);
    ctx.closePath();

    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(139, 51);
    ctx.lineTo(139, 82);
    ctx.lineTo(213, 82);
    ctx.lineTo(216, 51);
    ctx.closePath();
    ctx.fill();
  };
8
  let init  = function()
  {
    // arrays
    var a = Array.from('foo');
    console.log(a);

    a = Array.from([1,2,3], x => x + 2)
    console.log(a);

    a = new Set(['foo', 'bar', 'baz', 'foo']);
    console.log(a);

    a = new Map([[1,2],[2,4],[4,8]]);
    console.log(a);

    a = new Map([[1,'a'],[2,'b'],[4,'c']]);
    let keys = Array.from(a.keys());
    console.log(keys);
    let values = Array.from(a.values());
    console.log(values);
    
    // range 
    a = common.collections.range(10,22,2);
    console.log(a);    

    a = [].map.call('123456',function(c){
      return c.charCodeAt(0);
    });
    console.log(a);
  };
  

  var changescale = function (val) {
    factorvalue = val / 100;
    dologo();
  };

  initLogo();

  return {
    changescale: changescale,
    init: init
  };
})();
