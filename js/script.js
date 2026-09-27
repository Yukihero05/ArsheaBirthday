/* ==========================================================================
   CHRISTENING DIGITAL INVITATION INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Target Event Date: November 14, 2026 Saturday 10:00 AM
  const EVENT_DATE = new Date('November 14, 2026 10:00:00').getTime();

  // --------------------------------------------------------------------------
  // Magical Pink Fairy Dust & Petals Canvas Animation
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const PARTICLE_COUNT = 30;
    const particles = [];
    const colors = ['#ffd1dc', '#f8bbd0', '#f48fb1', '#fff0f5', '#fffdf0'];

    class FairyParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.isSparkle = Math.random() > 0.45;
        this.size = this.isSparkle ? Math.random() * 3 + 1.5 : Math.random() * 9 + 6;
        this.speedY = Math.random() * 1.0 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.6 + 0.35;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.015) * 1.2 + this.speedX;
        this.rotation += this.spin;

        if (this.y > height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.isSparkle) {
          // Draw 4-point twinkle fairy star
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();

          // Soft glowing halo
          ctx.fillStyle = 'rgba(255, 230, 240, 0.4)';
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft Fairy Rose Petal
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.ellipse(0, 0, this.size, this.size * 0.65, 0, 0, Math.PI * 2);
          ctx.fill();

          // Soft highlight
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.ellipse(0, 0, this.size * 0.5, this.size * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new FairyParticle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // Audio & Modal
  const welcomeModal = document.getElementById('welcome-modal');
  const btnOpen = document.getElementById('btn-open-invitation');
  const bgMusic = document.getElementById('bg-music');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  let isPlaying = false;

  if (btnOpen && welcomeModal) {
    btnOpen.addEventListener('click', () => {
      welcomeModal.classList.add('hidden');
      if (bgMusic) {
        bgMusic.play().then(() => {
          isPlaying = true;
          if (musicToggleBtn) musicToggleBtn.classList.remove('paused');
        }).catch(err => console.log('Audio autoplay prevented:', err));
      }
    });
  }

  if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        musicToggleBtn.classList.add('paused');
      } else {
        bgMusic.play();
        isPlaying = true;
        musicToggleBtn.classList.remove('paused');
      }
    });
  }

  // Countdown
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = EVENT_DATE - now;

    if (distance < 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMinutes) cdMinutes.textContent = '00';
      if (cdSeconds) cdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
    if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // RSVP Form Counter
  const btnMinus = document.getElementById('btn-guest-minus');
  const btnPlus = document.getElementById('btn-guest-plus');
  const countDisplay = document.getElementById('guest-count-display');
  const countInput = document.getElementById('guest-count-input');
  const rsvpForm = document.getElementById('rsvp-form');

  let guestCount = 1;

  if (btnMinus && btnPlus && countDisplay && countInput) {
    btnMinus.addEventListener('click', () => {
      if (guestCount > 1) {
        guestCount--;
        countDisplay.textContent = guestCount;
        countInput.value = guestCount;
      }
    });

    btnPlus.addEventListener('click', () => {
      if (guestCount < 10) {
        guestCount++;
        countDisplay.textContent = guestCount;
        countInput.value = guestCount;
      }
    });
  }

  // --------------------------------------------------------------------------
  // RSVP Form Submission to Google Sheet
  // --------------------------------------------------------------------------
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvlaEMTHVzTz06zmHV6ZcdHxu9OEpwp0PhmHAIOoc8Tf8tbW94teZM2ixHpU4U2mh3/exec';

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-submit-rsvp');
      const originalText = submitBtn ? submitBtn.innerText : 'Confirm Attendance 🌼';

      const name = document.getElementById('attendee-name').value;
      const count = countInput.value;
      const church = document.getElementById('check-church') ? (document.getElementById('check-church').checked ? 'Yes' : 'No') : 'Yes';
      const reception = document.getElementById('check-reception') ? (document.getElementById('check-reception').checked ? 'Yes' : 'No') : 'Yes';
      const message = document.getElementById('attendee-message') ? document.getElementById('attendee-message').value : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Recording RSVP... ⏳';
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('guests', count);
      formData.append('church', church);
      formData.append('reception', reception);
      formData.append('message', message);

      try {
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
          });
        }
        alert(`🎉 Thank you, ${name}!\n\nYour RSVP for ${count} guest(s) has been recorded!\nChurch Ceremony: ${church}\nReception: ${reception}\n\nWe look forward to celebrating with you! 🌼`);
        rsvpForm.reset();
        guestCount = 1;
        if (countDisplay) countDisplay.textContent = 1;
      } catch (err) {
        console.error('Error submitting RSVP:', err);
        alert(`🎉 Thank you, ${name}! Your RSVP has been received!`);
        rsvpForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }
    });
  }

  // Swatches
  const swatches = document.querySelectorAll('.swatch-item');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const name = swatch.getAttribute('data-name');
      alert(`🌸 Theme Color: ${name}\nDress Code: Any pastel color is welcome! Ninongs & Ninangs, please wear WHITE.`);
    });
  });

  // --------------------------------------------------------------------------
  // HD Photo Lightbox Modal
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || 'Baby Arshea • Special Moments';
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Hero photo click
  const heroCard = document.getElementById('hero-photo-card') || document.getElementById('hero-portrait-card');
  if (heroCard) {
    heroCard.addEventListener('click', () => {
      const img = heroCard.querySelector('img') || document.getElementById('hero-photo');
      const src = img ? (img.getAttribute('data-hd-src') || img.src) : 'assets/images/hero.jpg';
      const caption = img ? (img.getAttribute('data-hd-caption') || 'Baby Arshea • Our Little Fairy Princess 🌸') : 'Baby Arshea';
      openLightbox(src, caption);
    });
  }

  // Gallery cards click
  const polaroids = document.querySelectorAll('.polaroid-card');
  polaroids.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-hd-src') || (card.querySelector('img') ? card.querySelector('img').src : '');
      const caption = card.getAttribute('data-hd-caption') || (card.querySelector('.polaroid-caption') ? card.querySelector('.polaroid-caption').innerText : '');
      if (src) openLightbox(src, caption);
    });
  });
});

