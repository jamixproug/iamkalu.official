(function(){
  // Equalizer bars
  var box=document.getElementById('bars');
  for(var i=0;i<28;i++){
    var s=document.createElement('span');
    s.style.setProperty('--h',(25+Math.random()*75)+'%');
    s.style.animationDelay=(-Math.random()*1.4)+'s';
    s.style.animationDuration=(0.9+Math.random()*1.1)+'s';
    box.appendChild(s);
  }
  document.getElementById('yr').textContent=new Date().getFullYear();

  // Light/dark theme toggle (remembered when storage is available)
  var root=document.documentElement,tb=document.getElementById('theme');
  try{var saved=localStorage.getItem('kalu-theme');if(saved)root.setAttribute('data-theme',saved);}catch(x){}
  tb.addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')?root.getAttribute('data-theme')==='dark':!matchMedia('(prefers-color-scheme: light)').matches;
    var next=dark?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('kalu-theme',next);}catch(x){}
  });

  // Scroll reveal
  var rv=document.querySelectorAll('section:not(.hero) .wrap');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  rv.forEach(function(el){el.classList.add('rv');io.observe(el);});

  // Count-up for total views
  var vEl=document.getElementById('views'),done=false;
  new IntersectionObserver(function(es,o){
    if(es[0].isIntersecting&&!done){
      done=true;o.disconnect();
      var t0=performance.now(),end=785;
      (function step(t){
        var p=Math.min((t-t0)/1200,1);
        vEl.textContent=Math.round(end*(1-Math.pow(1-p,3)));
        if(p<1)requestAnimationFrame(step);
      })(t0);
    }
  }).observe(vEl);

  // Highlight the nav link of the section in view
  var links=document.querySelectorAll('nav a');
  var so=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id);});}
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('section[id]').forEach(function(s){so.observe(s);});

  // Back-to-top button
  var up=document.createElement('button');
  up.id='top-btn';up.type='button';up.setAttribute('aria-label','Back to top');up.textContent='↑';
  document.body.appendChild(up);
  up.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'});});
  addEventListener('scroll',function(){up.classList.toggle('show',scrollY>600);},{passive:true});

  // Contact form: opens the visitor's email app. Replace the address below with your own.
  var TO='Kalulejamir33@gmail.com';
  var f=document.getElementById('form'),out=document.getElementById('out');
  f.addEventListener('submit',function(ev){
    ev.preventDefault();
    var n=f.n.value.trim(),e=f.e.value.trim(),m=f.m.value.trim();
    if(!n||!/^\S+@\S+\.\S+$/.test(e)||!m){out.textContent='Enter your name, a valid email and a message.';return;}
    var body=encodeURIComponent(m+'\n\n— '+n+' ('+e+')');
    location.href='mailto:'+TO+'?subject='+encodeURIComponent('Message for KALU OFFICIAL')+'&body='+body;
    out.textContent='Your email app is opening. Press send to finish.';
  });
})();
