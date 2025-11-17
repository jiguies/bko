// Simple carousel logic
(function(){
  const slidesWrap = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const dotsContainer = document.getElementById('dots');
  let current = 0;
  let autoplay = true;
  let interval = null;

  function goTo(index){
    if(index < 0) index = slides.length -1;
    if(index >= slides.length) index = 0;
    current = index;
    slidesWrap.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function updateDots(){
    const btns = dotsContainer.querySelectorAll('button');
    btns.forEach((b,i)=> b.classList.toggle('active', i===current));
  }

  // build dots
  slides.forEach((_,i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=>{ goTo(i); resetAutoplay(); });
    dotsContainer.appendChild(b);
  });
  updateDots();

  prev.addEventListener('click', ()=>{ goTo(current-1); resetAutoplay(); });
  next.addEventListener('click', ()=>{ goTo(current+1); resetAutoplay(); });

  function startAutoplay(){
    if(interval) clearInterval(interval);
    interval = setInterval(()=>{ goTo(current+1); }, 5000);
  }
  function stopAutoplay(){ if(interval){ clearInterval(interval); interval=null } }
  function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

  // pause on hover
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', ()=> stopAutoplay());
  carousel.addEventListener('mouseleave', ()=> startAutoplay());

  // start
  goTo(0);
  startAutoplay();

  // Accessibility: keyboard
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') goTo(current-1);
    if(e.key === 'ArrowRight') goTo(current+1);
  });
})();


/* ===================================================== */
/*              MEGA MENU : délai avant fermeture        */
/* ===================================================== */

(function(){
  const trigger = document.querySelector('.has-mega');
  const mega = document.querySelector('.mega');
  let closeTimeout = null;

  // Ouvrir immédiatement
  function openMega(){
    clearTimeout(closeTimeout);
    mega.style.display = 'grid';
    mega.style.opacity = '1';
    mega.style.visibility = 'visible';
  }

  // Fermer après 2 secondes
  function closeMegaDelayed(){
    closeTimeout = setTimeout(()=>{
      mega.style.display = 'none';
      mega.style.opacity = '0';
      mega.style.visibility = 'hidden';
    }, 800);
  }

  if(trigger && mega){
    trigger.addEventListener('mouseenter', openMega);
    trigger.addEventListener('mouseleave', closeMegaDelayed);
    mega.addEventListener('mouseenter', openMega);
    mega.addEventListener('mouseleave', closeMegaDelayed);
  }
})();
