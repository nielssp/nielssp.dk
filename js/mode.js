(function() {
  var mode = localStorage.getItem('mode');
  if (mode) {
    document.body.className = mode;
  }
  window.setMode = function (mode) {
    localStorage.setItem('mode', mode);
    document.body.className = mode;
  };
})();
