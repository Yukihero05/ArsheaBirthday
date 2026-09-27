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

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('attendee-name').value;
      const count = countInput.value;

      alert(`🎉 Thank you, ${name}! Your RSVP for ${count} guest(s) has been received! We can't wait to celebrate with you! 🌼`);
      rsvpForm.reset();
      guestCount = 1;
      if (countDisplay) countDisplay.textContent = 1;
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
