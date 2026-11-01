'use strict';
/* 一言卡片：首页侧栏最上方，每次刷新随机一句，渐显动画 */
(function () {
  var path = location.pathname;
  if (path !== '/' && path !== '/index.html') return;

  var QUOTES = [
  "慢慢来，比较快。",
  "你不必很厉害才开始，但要开始才会很厉害。",
  "今天也要好好吃饭，好好睡觉。",
  "把复杂的事拆小，把小的事做完。",
  "焦虑的时候，先做五分钟。",
  "读书不是为了比别人强，是为了多一个看世界的角度。",
  "山高路远，看世界，也找自己。",
  "所有的顺其自然，都是竭尽所能之后的不强求。",
  "不驰于空想，不骛于虚声。",
  "少年应有鸿鹄志，当骑骏马踏平川。",
  "与其感慨路难行，不如马上出发。",
  "真正的自由，是有能力说「不」。",
  "别急，花有花期，人有时区。",
  "多读一页书，就少一句求人的话。",
  "生活的理想，就是为了理想的生活。",
  "把每一件小事做好，就是不简单。",
  "你可以慢，但不要停。",
  "今天多学一点，明天就多一个选择。",
  "允许自己笨拙，但不要允许自己放弃。",
  "热爱可抵岁月漫长。",
  "别在能吃苦的年纪选择安逸。",
  "稳住，我们能赢。",
  "睡一觉，明天依旧有光。",
  "记录，是为了不辜负。",
  "所有的努力都不会白费，它只是还没到兑现的时候。",
  "与其临渊羡鱼，不如退而结网。",
  "你看过的书，会变成你走过的路。",
  "先完成，再完美。",
  "世界很大，先把自己变好。",
  "愿你合上笔盖的那一刻，有战士收刀入鞘的骄傲。"
];

  function insert() {
    var host = document.getElementById('aside-content');
    if (!host || document.querySelector('.card-daily-quote')) return;

    var card = document.createElement('div');
    card.className = 'card-widget card-daily-quote';
    card.innerHTML =
      '<div class="item-headline"><i class="fas fa-quote-left" aria-hidden="true"></i><span>一言</span></div>' +
      '<div class="daily-quote-text"></div>';

    host.insertBefore(card, host.firstChild);

    var text = card.querySelector('.daily-quote-text');
    text.textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    text.style.cssText = 'padding:0 .2rem;line-height:1.85;font-size:.93em;opacity:.9';

    card.style.opacity = '0';
    card.style.transform = 'translateY(8px)';
    card.style.transition = 'opacity .9s ease, transform .9s cubic-bezier(.22,.61,.36,1)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insert);
  } else {
    insert();
  }
})();