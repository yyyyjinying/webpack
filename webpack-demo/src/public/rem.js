(function() {
  // 判断移动端时转换rem
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    var initFontSize = 16;
    var iPhone6Width = 375;
    var clientWidth =
      window.document.documentElement.clientWidth || iPhone6Width;
    var newFontSize = initFontSize * (clientWidth / iPhone6Width);
    document.documentElement.style.fontSize = newFontSize + "px";
  }
})();
