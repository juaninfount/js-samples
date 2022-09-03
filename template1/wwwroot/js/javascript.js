window.onload = function(e){
  js.init();
};


(function(){
  console.log("Soy una autofuncion?");
})();

var f_arrow = (() => {
  console.log("soy una funcion flecha");
});

var js = (() => {

  f_arrow();
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

  let arrays  = function()
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

  let nanFunctions = function(){
      console.log( isNaN(NaN) ); // true
      console.log(isNaN(Infinity));
      console.log(isNaN(null));
      console.log(isNaN(13.22));
      console.log(isNaN("13.22"));
      console.log(isNaN(undefined));
      console.log(isNaN({}));

      //
      console.log(Number.isNaN(true));
      console.log(Number.isNaN(new Date));
      console.log(Number.isNaN([]));
      console.log(Number.isNaN({}));

      console.log(Number.MAX_VALUE);
      console.log(Number.MAX_SAFE_INTEGER);
      console.log(Number.MIN_VALUE);
      console.log(Number.MIN_SAFE_INTEGER);
      console.log(Number.EPSILON);
      console.log(Number.POSITIVE_INFINITY);
      console.log(Number.NEGATIVE_INFINITY);
  };

  let consoleFunctions = function(){
    console.time('response in');

    console.log('Click to continue');
    console.timeEnd('response in');


    console.log('One more time');
    console.time('response out')
    console.timeEnd('response out');

    console.time('loop-time');
    let elems = document.getElementsByTagName('*');
    for(var i = 0;i<5000;i++){
      for(var j=0;j<elems.length;j++){
          // repeat
      }
    }
    console.timeEnd('loop-time');

  };

  let changescale = function (val) {
    factorvalue = val / 100;
    dologo();
  };

  let objects = function(){
      let o1 = Object.create({x: 10, y: 21 });
      console.log("{o1.x, o1.y} = " + JSON.stringify(o1));

      let o2 = {x: 10, y: 21 };
      console.log("{o2.x, o2.y} = " + JSON.stringify(o2));

      let o3 = Object.create(Object.prototype);
      console.log(o3); // objeto vacio o {}
  };

  var init = function(){
    arrays();
    nanFunctions();
    consoleFunctions();
    objects();


    initLogo();
    changescale();
  };

  return {
    init: init
  };
})();
