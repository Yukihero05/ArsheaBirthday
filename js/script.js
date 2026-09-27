/* ==========================================================================
   CHRISTENING DIGITAL INVITATION INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const EVENT_DATE = new Date('September 26, 2026 12:00:00').getTime();

  // Falling Petals Canvas
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const PETAL_COUNT = 25;
    const petals = [];

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.4;
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
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

        ctx.beginPath();
        ctx.fillStyle = '#FFF8DC';
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#F4C430';
        ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(new Petal());
    }

    function animatePetals() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((petal) => {
        petal.update();
        petal.draw();
      });
      requestAnimationFrame(animatePetals);
    }
    animatePetals();
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
      alert(`🌼 Theme Color: ${name}\nDress Code Guidance: We recommend soft pastel yellow shades for a lovely matching photo memory!`);
    });
  });
});
