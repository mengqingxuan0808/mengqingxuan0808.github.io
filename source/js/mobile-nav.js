'use strict';
/* 移动端浮动菜单按钮：小屏下主题隐藏了顶部导航，这里补一个入口，直接触发主题的 #toggle-menu */
(function () {
  function build() {
    if (document.getElementById('mobile-nav-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'mobile-nav-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', '打开菜单');
    btn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    document.body.appendChild(btn);
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var toggle = document.getElementById('toggle-menu');
      if (toggle) {
        toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();