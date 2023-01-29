MKaufPrRch();
Laden();
setInterval (Speichern, 10000);
setInterval(function(){
  var thisUpdate = new Date().getTime();
  var diff = (thisUpdate - Sp.lastUpdate);
  diff = Math.round(diff / (1000/FPS));
  ProFrame(diff);
  Sp.lastUpdate = thisUpdate;
}, 1000/FPS);
setInterval (AutoAktu, 10000/FPS);
kongregate.stats.submit('loaded', 1);
