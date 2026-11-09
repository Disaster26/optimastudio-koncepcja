(function(){
  var d=document;

  // menu mobilne
  var burger=d.getElementById('burger'), menu=d.getElementById('menu');
  function zamknij(){menu.classList.remove('otw');burger.setAttribute('aria-expanded','false');d.body.style.overflow=''}
  burger.addEventListener('click',function(){
    var otw=!menu.classList.contains('otw');
    menu.classList.toggle('otw',otw);burger.setAttribute('aria-expanded',String(otw));d.body.style.overflow=otw?'hidden':'';
  });
  menu.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});

  // aktywna pozycja menu = dokładnie bieżąca sekcja
  var linki=[].slice.call(menu.querySelectorAll('a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(wp){
      wp.forEach(function(w){
        if(w.isIntersecting){linki.forEach(function(a){if(a.getAttribute('href')==='#'+w.target.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    linki.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s)io.observe(s)});
    var hero=d.querySelector('.hero');
    new IntersectionObserver(function(wp){if(wp[0].isIntersecting)linki.forEach(function(a){a.removeAttribute('aria-current')})},{rootMargin:'-45% 0px -50% 0px'}).observe(hero);
  }

  // karty i galeria: palec natywnie, mysz przeciąganiem, strzałki i klawiatura
  d.querySelectorAll('.przewijane').forEach(function(el){
    var x0=0,s0=0,ciag=false,ruch=false;
    el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;ciag=true;ruch=false;x0=e.clientX;s0=el.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;if(Math.abs(dx)>4){ruch=true;el.classList.add('ciag')}if(ruch){el.scrollLeft=s0-dx;e.preventDefault()}});
    window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;el.classList.remove('ciag')});
    el.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false}},true);
    el.addEventListener('dragstart',function(e){e.preventDefault()});
    el.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();krok(el,1)}if(e.key==='ArrowLeft'){e.preventDefault();krok(el,-1)}});
  });
  function krok(el,k){var f=el.firstElementChild;el.scrollBy({left:k*(f?f.getBoundingClientRect().width+18:320),behavior:'smooth'})}
  d.querySelectorAll('[data-sc]').forEach(function(b){b.addEventListener('click',function(){krok(d.getElementById(b.dataset.sc),+b.dataset.k)})});

  // formularz pokazowy, bez wysyłki
  var f=d.getElementById('form');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('formInfo').hidden=false});

  var rok=d.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
})();
