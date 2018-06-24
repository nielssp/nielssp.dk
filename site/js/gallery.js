(function () {
  var galleries = document.getElementsByClassName('gallery');
  while (galleries.length > 0) {
    (function () {
      var gallery = galleries[0];
      gallery.className = 'gallery-js';
      var size = gallery.children.length;
      var buttons = document.createElement('nav');
      var activeButton;
      var activeImage;
      for (var j = 0; j < size; j++) {
        (function () {
          var image = gallery.children[j];
          var button = document.createElement('a');
          button.href = '#';
          button.title = 'Switch to image ' + (j + 1);
          button.textContent = j + 1;
          button.onclick = function () {
            activeButton.className = '';
            activeImage.style.display = 'none';
            button.className = 'active';
            image.style.display = 'inline';
            activeButton = button;
            activeImage = image;
            return false;
          };
          buttons.appendChild(button);
          if (j == 0) {
            button.className = 'active';
            activeButton = button;
            activeImage = image;
          } else {
            image.style.display = 'none';
          }
        })();
      }
      gallery.insertBefore(buttons, activeImage);
    })();
  }
})();