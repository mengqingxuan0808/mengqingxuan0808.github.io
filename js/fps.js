'use strict';
/* 右下角/左下角的小 FPS 指示器（纯装饰） */
(function () {
  var box = document.createElement('div');
  box.id = 'fps-meter';
  box.textContent = 'FPS --';
  document.body.appendChild(box);

  var frames = 0, last = performance.now();
  function tick(now) {
    frames++;
    if (now - last >= 1000) {
      box.textContent = 'FPS ' + Math.round((frames * 1000) / (now - last));
      frames = 0;
      last = now;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();