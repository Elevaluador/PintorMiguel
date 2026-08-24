// ---------- Galería de proyectos ----------
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryFilters = document.querySelectorAll('.project-tag');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox-close');

  function openLightbox(card){
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.dataset.title || 'Trabajo realizado por MYM Painting Services';
    lightboxCaption.textContent = card.dataset.title + ' · ' + card.dataset.category;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => card.addEventListener('click', () => openLightbox(card)));
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if(e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeLightbox();
  });

  galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      galleryFilters.forEach(item => item.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.textContent.trim();

      galleryCards.forEach(card => {
        const show = category === 'Todos' || card.dataset.category === category;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });


// Funciones para el banner de cookies
            function aplicarConsentimiento(estadistica, comportamental) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
            'analytics_storage': estadistica ? 'granted' : 'denied',
            'ad_storage': comportamental ? 'granted' : 'denied'
            });
        }
        guardarConsentimiento(estadistica, comportamental);
        }

        function guardarConsentimiento(estadistica, comportamental) {
        localStorage.setItem("consentConfig", JSON.stringify({
            analytics_storage: estadistica,
            ad_storage: comportamental
        }));
        }

        function obtenerConsentimientoGuardado() {
        var consent = localStorage.getItem("consentConfig");
        return consent ? JSON.parse(consent) : null;
        }

        function ocultarBanner() {
        document.getElementById("consent-banner").style.display = 'none';
        document.getElementById("consent-config").style.display = 'none';
        }

        function gestionarConsentimiento(estadistica, comportamental) {
        aplicarConsentimiento(estadistica, comportamental);
        ocultarBanner();
        }

        window.aceptarTodo = () => gestionarConsentimiento(true, true);
        window.rechazarTodo = () => gestionarConsentimiento(false, false);
        window.actualizarConsentimiento = gestionarConsentimiento;

        window.guardarConfiguracion = function() {
        var estadistica = document.getElementById("consent-estadistica").checked;
        var comportamental = document.getElementById("consent-comportamental").checked;
        gestionarConsentimiento(estadistica, comportamental);
        };

        document.addEventListener("DOMContentLoaded", function() {
        var saved = obtenerConsentimientoGuardado();
        if (saved) {
            aplicarConsentimiento(saved.analytics_storage, saved.ad_storage);
            ocultarBanner();
        } else {
            document.getElementById("consent-banner").style.display = "block";
        }
        });