(function () {
  if (!document.cookie.split(';').filter(function(item) {
    return item.indexOf('cookieconsent=') >= 0
  }).length) {
    var d = document.createElement('div');
    d.id = 'cookie-consent';
    document.getElementsByTagName('body')[0].appendChild(d);
    var t = document.createElement('div');
    t.innerHTML = 'My website uses cookies.';
    d.appendChild(t);
    var link = document.createElement('a');
    link.href = 'https://cookiesandyou.com/';
    link.target = '_blank';
    link.innerHTML = 'Learn more';
    d.appendChild(link);
    var b = document.createElement('button');
    b.innerHTML = 'Dismiss';
    d.appendChild(b);
    b.onclick = function () {
      document.body.removeChild(d);
      var date = new Date();
      date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
      document.cookie ='cookieconsent=1;path=/;expires=' + date.toGMTString();
    };
  }
})();
