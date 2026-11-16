(() => {
  const done=()=>{document.body.classList.add('is-ready');document.body.classList.remove('loading');};
  const loader=document.getElementById('intro');
  if(loader){
    const skip=loader.querySelector('.intro-skip');
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let completed=false;
    const finish=()=>{if(completed)return;completed=true;done();};
    if(preference)finish();
    else {window.setTimeout(finish,2200);skip?.addEventListener('click',finish);}
    window.addEventListener('pageshow',e=>{if(e.persisted)finish();});
  }else done();
  const button=document.querySelector('.menu-toggle'), nav=document.querySelector('.header-links');
  button?.addEventListener('click',()=>{
    const opened=nav.classList.toggle('open');
    button.setAttribute('aria-expanded',String(opened));
    button.textContent=opened?'Fermer −':'Menu +';
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');button?.setAttribute('aria-expanded','false');if(button)button.textContent='Menu +';
  }));
  document.querySelectorAll('[data-current-year]').forEach(n=>n.textContent=new Date().getFullYear());
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }),{threshold:.06,rootMargin:'0px 0px -25px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
})();
