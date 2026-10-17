/* ==========================================================================
   CHRISTENING DIGITAL INVITATION INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Target Event Date: November 14, 2026 Saturday 9:30 AM
  const EVENT_DATE = new Date('November 14, 2026 09:30:00').getTime();

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

  // --------------------------------------------------------------------------
  // Cutie Particle Burst & Modal Opening
  // --------------------------------------------------------------------------
  function createFairyDustBurst() {
    const burstCount = 28;
    const icons = ['✨', '🌸', '💖', '⭐', '🧚', '💫'];
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2;

    for (let i = 0; i < burstCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'fairy-burst-particle';
      particle.textContent = icons[Math.floor(Math.random() * icons.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 260 + 80;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 540;
      const fontSize = Math.random() * 1.2 + 1.1;

      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.fontSize = `${fontSize}rem`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1400);
    }
  }

  const welcomeModal = document.getElementById('welcome-modal');
  const btnOpen = document.getElementById('btn-open-invitation');
  const fairyCardImgBtn = document.getElementById('fairy-card-img-btn');
  const bgMusic = document.getElementById('bg-music');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  let isPlaying = false;

  function handleOpenInvitation() {
    if (!welcomeModal || welcomeModal.classList.contains('hidden')) return;
    createFairyDustBurst();
    welcomeModal.classList.add('fade-out');
    setTimeout(() => {
      welcomeModal.classList.add('hidden');
    }, 450);

    if (bgMusic) {
      bgMusic.play().then(() => {
        isPlaying = true;
        if (musicToggleBtn) musicToggleBtn.classList.remove('paused');
      }).catch(err => console.log('Audio autoplay prevented:', err));
    }
  }

  if (btnOpen) {
    btnOpen.addEventListener('click', handleOpenInvitation);
  }

  if (fairyCardImgBtn) {
    fairyCardImgBtn.addEventListener('click', handleOpenInvitation);
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

  // Countdown Timer (Updates both Intro and Hero countdowns)
  const allCdDays = document.querySelectorAll('.cd-days');
  const allCdHours = document.querySelectorAll('.cd-hours');
  const allCdMinutes = document.querySelectorAll('.cd-minutes');
  const allCdSeconds = document.querySelectorAll('.cd-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = EVENT_DATE - now;

    if (distance < 0) {
      allCdDays.forEach(el => el.textContent = '00');
      allCdHours.forEach(el => el.textContent = '00');
      allCdMinutes.forEach(el => el.textContent = '00');
      allCdSeconds.forEach(el => el.textContent = '00');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const sDays = String(days).padStart(2, '0');
    const sHours = String(hours).padStart(2, '0');
    const sMinutes = String(minutes).padStart(2, '0');
    const sSeconds = String(seconds).padStart(2, '0');

    allCdDays.forEach(el => el.textContent = sDays);
    allCdHours.forEach(el => el.textContent = sHours);
    allCdMinutes.forEach(el => el.textContent = sMinutes);
    allCdSeconds.forEach(el => el.textContent = sSeconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --------------------------------------------------------------------------
  // RSVP Smooth Scroll & Focus Button (from Canva card)
  // --------------------------------------------------------------------------
  const btnScrollRsvp = document.getElementById('btn-scroll-rsvp');
  const rsvpFormContainer = document.getElementById('rsvp-form-container');
  const attendeeNameInput = document.getElementById('attendee-name');

  if (btnScrollRsvp && rsvpFormContainer) {
    btnScrollRsvp.addEventListener('click', (e) => {
      e.preventDefault();
      rsvpFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rsvpFormContainer.classList.add('highlight-focus');
      setTimeout(() => {
        if (attendeeNameInput) attendeeNameInput.focus();
      }, 500);
      setTimeout(() => {
        rsvpFormContainer.classList.remove('highlight-focus');
      }, 2500);
    });
  }

  // --------------------------------------------------------------------------
  // Attendance Toggle (Joyfully Attending vs Regretfully Declining)
  // --------------------------------------------------------------------------
  const attendanceRadios = document.querySelectorAll('input[name="attendance_status"]');
  const labelAttending = document.getElementById('label-attending');
  const labelDeclining = document.getElementById('label-declining');
  const attendingDetailsSection = document.getElementById('attending-details-section');
  const submitBtn = document.getElementById('btn-submit-rsvp');

  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'Joyfully Attending' && radio.checked) {
        if (labelAttending) labelAttending.classList.add('active');
        if (labelDeclining) labelDeclining.classList.remove('active');
        if (attendingDetailsSection) attendingDetailsSection.style.display = 'block';
        if (submitBtn) submitBtn.innerText = 'Confirm Attendance 🌼';
      } else if (radio.value === 'Regretfully Declining' && radio.checked) {
        if (labelDeclining) labelDeclining.classList.add('active');
        if (labelAttending) labelAttending.classList.remove('active');
        if (attendingDetailsSection) attendingDetailsSection.style.display = 'none';
        if (submitBtn) submitBtn.innerText = 'Send Response 💌';
      }
    });
  });

  // --------------------------------------------------------------------------
  // Plus One Request Toggle & Guest Counter
  // --------------------------------------------------------------------------
  const checkPlusOne = document.getElementById('check-plus-one');
  const plusOneNameWrap = document.getElementById('plus-one-name-wrap');
  const plusOneNameInput = document.getElementById('plus-one-name');

  // RSVP Form Counter
  const btnMinus = document.getElementById('btn-guest-minus');
  const btnPlus = document.getElementById('btn-guest-plus');
  const countDisplay = document.getElementById('guest-count-display');
  const countInput = document.getElementById('guest-count-input');
  const rsvpForm = document.getElementById('rsvp-form');

  let guestCount = 1;

  if (checkPlusOne && plusOneNameWrap) {
    checkPlusOne.addEventListener('change', () => {
      if (checkPlusOne.checked) {
        plusOneNameWrap.style.display = 'block';
        if (plusOneNameInput) plusOneNameInput.focus();
        // Automatically bump to 2 if guest count is currently 1
        if (guestCount === 1) {
          guestCount = 2;
          if (countDisplay) countDisplay.textContent = '2';
          if (countInput) countInput.value = '2';
        }
      } else {
        plusOneNameWrap.style.display = 'none';
        if (plusOneNameInput) plusOneNameInput.value = '';
        if (guestCount === 2) {
          guestCount = 1;
          if (countDisplay) countDisplay.textContent = '1';
          if (countInput) countInput.value = '1';
        }
      }
    });
  }

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
      const currentSubmitBtn = document.getElementById('btn-submit-rsvp');
      const originalText = currentSubmitBtn ? currentSubmitBtn.innerText : 'Confirm Attendance 🌼';

      const selectedAttendance = document.querySelector('input[name="attendance_status"]:checked');
      const attendanceStatus = selectedAttendance ? selectedAttendance.value : 'Joyfully Attending';
      const isAttending = attendanceStatus === 'Joyfully Attending';

      const rawName = document.getElementById('attendee-name').value.trim();
      const count = isAttending ? (countInput ? countInput.value : '1') : '0';
      const church = isAttending ? (document.getElementById('check-church') && document.getElementById('check-church').checked ? 'Yes' : 'No') : 'No';
      const reception = isAttending ? (document.getElementById('check-reception') && document.getElementById('check-reception').checked ? 'Yes' : 'No') : 'No';
      const isPlusOne = isAttending && checkPlusOne && checkPlusOne.checked;
      const plusOneName = isPlusOne && plusOneNameInput ? plusOneNameInput.value.trim() : '';
      const rawMessage = document.getElementById('attendee-message') ? document.getElementById('attendee-message').value.trim() : '';

      // Format Name and Message so Plus One & Decline status appear in existing Google Sheet columns
      let finalName = rawName;
      if (!isAttending) {
        finalName = `${rawName} [DECLINED]`;
      } else if (isPlusOne) {
        finalName = plusOneName ? `${rawName} (+1: ${plusOneName})` : `${rawName} (+1 Requested)`;
      }

      let finalMessage = rawMessage;
      if (isPlusOne) {
        const plusOneTag = plusOneName ? `[PLUS ONE REQUEST: ${plusOneName}]` : `[PLUS ONE REQUESTED: Yes]`;
        finalMessage = finalMessage ? `${finalMessage}\n\n${plusOneTag}` : plusOneTag;
      }
      if (!isAttending) {
        const declineTag = `[STATUS: Unable to attend / Regretfully Declining]`;
        finalMessage = finalMessage ? `${finalMessage}\n\n${declineTag}` : declineTag;
      }

      if (currentSubmitBtn) {
        currentSubmitBtn.disabled = true;
        currentSubmitBtn.innerText = 'Recording RSVP... ⏳';
      }

      const formData = new FormData();
      // Primary fields mapped in Google Apps Script:
      formData.append('name', finalName);
      formData.append('attendee_name', rawName);
      formData.append('guests', count);
      formData.append('church', church);
      formData.append('reception', reception);
      formData.append('message', finalMessage);

      // Dedicated fields in case Google Script has specific columns:
      formData.append('status', attendanceStatus);
      formData.append('plus_one', isPlusOne ? (plusOneName ? `Yes (${plusOneName})` : 'Yes') : 'No');
      formData.append('plusOne', isPlusOne ? (plusOneName ? `Yes (${plusOneName})` : 'Yes') : 'No');
      formData.append('plus_one_name', plusOneName);
      formData.append('companion', plusOneName);

      try {
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
          });
        }

        if (isAttending) {
          const plusOneMsg = isPlusOne ? `\nPlus One Requested: ${plusOneName || 'Yes'}` : '';
          alert(`🎉 Thank you, ${rawName}!\n\nYour RSVP for ${count} guest(s) has been recorded!\nChurch Ceremony: ${church}\nReception: ${reception}${plusOneMsg}\n\nWe look forward to celebrating with you! 🌼`);
        } else {
          alert(`🌸 Thank you, ${rawName}, for letting us know!\n\nWe will miss you at Arshea Faye's fairy celebration, but we are so grateful for your warm blessing and thoughts! 💗`);
        }

        rsvpForm.reset();
        guestCount = 1;
        if (countDisplay) countDisplay.textContent = 1;
        if (plusOneNameWrap) plusOneNameWrap.style.display = 'none';
        if (attendingDetailsSection) attendingDetailsSection.style.display = 'block';
        if (labelAttending) labelAttending.classList.add('active');
        if (labelDeclining) labelDeclining.classList.remove('active');
        const defaultRadio = document.querySelector('input[name="attendance_status"][value="Joyfully Attending"]');
        if (defaultRadio) defaultRadio.checked = true;
      } catch (err) {
        console.error('Error submitting RSVP:', err);
        alert(`🎉 Thank you, ${rawName}! Your RSVP has been received!`);
        rsvpForm.reset();
      } finally {
        if (currentSubmitBtn) {
          currentSubmitBtn.disabled = false;
          currentSubmitBtn.innerText = originalText;
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
  // 1. PINNED HORIZONTAL SCROLL: MONTHLY MILESTONES (NEWBORN TO 11 MONTHS)
  // --------------------------------------------------------------------------
  const milestonesSection = document.getElementById('milestones-section');
  const milestonesTrack = document.getElementById('milestones-track');
  const milestonesViewport = document.getElementById('milestones-viewport');
  const milestonesProgressBar = document.getElementById('milestones-progress-bar');
  const milestonesCounter = document.getElementById('milestones-counter');
  const milestonesPrev = document.getElementById('milestones-prev');
  const milestonesNext = document.getElementById('milestones-next');
  const milestonesStickyWrapper = document.querySelector('.milestones-sticky-wrapper');

  let isTicking = false;

  function updateMilestonesScroll() {
    if (!milestonesSection || !milestonesTrack || !milestonesViewport) return;

    const cards = milestonesTrack.querySelectorAll('.milestone-reel-card');
    if (!cards || cards.length === 0) return;

    const sectionRect = milestonesSection.getBoundingClientRect();
    const wrapperHeight = milestonesStickyWrapper ? milestonesStickyWrapper.offsetHeight : 520;
    const stickyTop = milestonesStickyWrapper ? milestonesStickyWrapper.offsetTop : 15;

    // Total distance the section stays pinned while scrolling down
    const totalDist = milestonesSection.offsetHeight - wrapperHeight - stickyTop;

    if (totalDist <= 0) {
      milestonesTrack.style.transform = 'translateX(0px)';
      return;
    }

    // How far user has scrolled into the pinned section
    const scrolled = -sectionRect.top + stickyTop;
    let progress = scrolled / totalDist;
    progress = Math.max(0, Math.min(1, progress));

    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];
    const totalTravel = Math.max(0, lastCard.offsetLeft - firstCard.offsetLeft);

    const currentTranslate = progress * totalTravel;
    milestonesTrack.style.transform = `translateX(-${currentTranslate}px)`;

    if (milestonesProgressBar) {
      milestonesProgressBar.style.width = `${Math.max(8, progress * 100)}%`;
    }

    if (milestonesCounter) {
      const cardCount = cards.length;
      const index = Math.min(cardCount - 1, Math.round(progress * (cardCount - 1)));
      const cardNames = [
        'Newborn', '1 Month', '2 Months', '3 Months', '4 Months', '5 Months',
        '6 Months', '7 Months', '8 Months', '9 Months', '10 Months', '11 Months'
      ];
      milestonesCounter.textContent = `${cardNames[index] || ('Month ' + (index + 1))} (${index + 1} of ${cardCount})`;
    }
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateMilestonesScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateMilestonesScroll, { passive: true });
  setTimeout(updateMilestonesScroll, 120);

  // Manual Arrow Navigation Steps Through Milestones
  if (milestonesNext && milestonesSection) {
    milestonesNext.addEventListener('click', () => {
      const wrapperHeight = milestonesStickyWrapper ? milestonesStickyWrapper.offsetHeight : 520;
      const stickyTop = milestonesStickyWrapper ? milestonesStickyWrapper.offsetTop : 15;
      const totalDist = milestonesSection.offsetHeight - wrapperHeight - stickyTop;
      const step = totalDist / 11;
      window.scrollBy({ top: step, behavior: 'smooth' });
    });
  }

  if (milestonesPrev && milestonesSection) {
    milestonesPrev.addEventListener('click', () => {
      const wrapperHeight = milestonesStickyWrapper ? milestonesStickyWrapper.offsetHeight : 520;
      const stickyTop = milestonesStickyWrapper ? milestonesStickyWrapper.offsetTop : 15;
      const totalDist = milestonesSection.offsetHeight - wrapperHeight - stickyTop;
      const step = totalDist / 11;
      window.scrollBy({ top: -step, behavior: 'smooth' });
    });
  }

  // Touch Swipe on Milestones Viewport translates smoothly to page scroll
  let reelTouchStartX = 0;
  if (milestonesViewport) {
    milestonesViewport.addEventListener('touchstart', (e) => {
      reelTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    milestonesViewport.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].clientX;
      const diffX = reelTouchStartX - touchX;
      reelTouchStartX = touchX;
      if (Math.abs(diffX) > 2) {
        window.scrollBy({ top: diffX * 1.4, behavior: 'auto' });
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 2. FAIRY PHOTOSHOOT: AUTOMATIC HORIZONTAL SWIPE TRANSITION SHOWCASE
  // --------------------------------------------------------------------------
  const photoshootTrack = document.getElementById('photoshoot-track');
  const photoshootViewport = document.getElementById('photoshoot-viewport');
  const photoshootDots = document.querySelectorAll('#photoshoot-dots .dot');
  const swipePrevBtn = document.getElementById('swipe-prev-btn');
  const swipeNextBtn = document.getElementById('swipe-next-btn');
  const photoshootSection = document.getElementById('fairy-photoshoot');

  let currentPhotoshootSlide = 0;
  const totalPhotoshootSlides = 5;
  let autoSwipeTimer = null;
  let isAutoSwipePaused = false;

  function goToPhotoshootSlide(index) {
    if (!photoshootTrack) return;
    currentPhotoshootSlide = (index + totalPhotoshootSlides) % totalPhotoshootSlides;
    photoshootTrack.style.transform = `translateX(-${currentPhotoshootSlide * 100}%)`;

    photoshootDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentPhotoshootSlide);
      dot.setAttribute('aria-selected', idx === currentPhotoshootSlide ? 'true' : 'false');
    });
  }

  function nextPhotoshootSlide() {
    goToPhotoshootSlide(currentPhotoshootSlide + 1);
  }

  function prevPhotoshootSlide() {
    goToPhotoshootSlide(currentPhotoshootSlide - 1);
  }

  function startAutoSwipe() {
    stopAutoSwipe();
    autoSwipeTimer = setInterval(() => {
      if (!isAutoSwipePaused) {
        nextPhotoshootSlide();
      }
    }, 3500); // Auto-advance every 3.5 seconds
  }

  function stopAutoSwipe() {
    if (autoSwipeTimer) {
      clearInterval(autoSwipeTimer);
      autoSwipeTimer = null;
    }
  }

  if (swipeNextBtn) swipeNextBtn.addEventListener('click', () => { nextPhotoshootSlide(); startAutoSwipe(); });
  if (swipePrevBtn) swipePrevBtn.addEventListener('click', () => { prevPhotoshootSlide(); startAutoSwipe(); });

  photoshootDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToPhotoshootSlide(idx);
      startAutoSwipe();
    });
  });

  // Pause on hover / touch
  if (photoshootViewport) {
    photoshootViewport.addEventListener('mouseenter', () => { isAutoSwipePaused = true; });
    photoshootViewport.addEventListener('mouseleave', () => { isAutoSwipePaused = false; });

    let psTouchStartX = 0;
    let psTouchEndX = 0;
    photoshootViewport.addEventListener('touchstart', (e) => {
      isAutoSwipePaused = true;
      psTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    photoshootViewport.addEventListener('touchend', (e) => {
      isAutoSwipePaused = false;
      psTouchEndX = e.changedTouches[0].screenX;
      const diffX = psTouchEndX - psTouchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          prevPhotoshootSlide();
        } else {
          nextPhotoshootSlide();
        }
        startAutoSwipe();
      }
    }, { passive: true });

    // Vertical wheel scroll over fairy photoshoots triggers horizontal swipe transitions
    let lastWheelTime = 0;
    photoshootViewport.addEventListener('wheel', (e) => {
      const now = Date.now();
      if (now - lastWheelTime < 450) return;
      if (Math.abs(e.deltaY) > 25) {
        if (e.deltaY > 0 && currentPhotoshootSlide < totalPhotoshootSlides - 1) {
          e.preventDefault();
          nextPhotoshootSlide();
          lastWheelTime = now;
          startAutoSwipe();
        } else if (e.deltaY < 0 && currentPhotoshootSlide > 0) {
          e.preventDefault();
          prevPhotoshootSlide();
          lastWheelTime = now;
          startAutoSwipe();
        }
      }
    }, { passive: false });
  }

  // Automatic activation when user scrolls down to Fairy Photoshoot section
  if (photoshootSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAutoSwipe();
        } else {
          stopAutoSwipe();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(photoshootSection);
  } else {
    startAutoSwipe();
  }

  // --------------------------------------------------------------------------
  // HD Photo Lightbox Modal with Next / Prev Navigation & Touch Swipe
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let activeGalleryItems = [];
  let currentPhotoIndex = 0;

  function updateLightboxPhoto() {
    if (!activeGalleryItems.length || !lightboxImg) return;
    const current = activeGalleryItems[currentPhotoIndex];
    lightboxImg.src = current.src;
    if (lightboxCaption) lightboxCaption.textContent = current.caption || 'Baby Arshea • Special Moments';
    if (lightboxCounter) {
      if (activeGalleryItems.length > 1) {
        lightboxCounter.style.display = 'inline-block';
        lightboxCounter.textContent = `Photo ${currentPhotoIndex + 1} of ${activeGalleryItems.length}`;
      } else {
        lightboxCounter.style.display = 'none';
      }
    }

    if (lightboxPrev && lightboxNext) {
      const showNav = activeGalleryItems.length > 1;
      lightboxPrev.style.display = showNav ? 'flex' : 'none';
      lightboxNext.style.display = showNav ? 'flex' : 'none';
    }
  }

  function openLightboxWithItems(items, startIndex = 0) {
    if (!lightboxModal || !lightboxImg || !items || !items.length) return;
    activeGalleryItems = items;
    currentPhotoIndex = startIndex;
    updateLightboxPhoto();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openSingleLightbox(src, caption) {
    openLightboxWithItems([{ src, caption }], 0);
  }

  function prevPhoto() {
    if (activeGalleryItems.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    updateLightboxPhoto();
  }

  function nextPhoto() {
    if (activeGalleryItems.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % activeGalleryItems.length;
    updateLightboxPhoto();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevPhoto(); });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextPhoto(); });

  // Keyboard navigation (Escape, Left Arrow, Right Arrow)
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevPhoto();
    } else if (e.key === 'ArrowRight') {
      nextPhoto();
    }
  });

  // Mobile Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 45) {
        if (diffX > 0) {
          prevPhoto();
        } else {
          nextPhoto();
        }
      }
    }, { passive: true });
  }

  // Connect all polaroid cards (both milestones and photoshoot) to Lightbox
  const allCards = document.querySelectorAll('.polaroid-card');
  const allCardItems = Array.from(allCards).map(c => ({
    src: c.getAttribute('data-hd-src') || (c.querySelector('img') ? c.querySelector('img').src : ''),
    caption: c.getAttribute('data-hd-caption') || (c.querySelector('.polaroid-title') ? c.querySelector('.polaroid-title').innerText : 'Baby Arshea')
  }));

  allCards.forEach((card) => {
    card.addEventListener('click', () => {
      const clickedSrc = card.getAttribute('data-hd-src') || (card.querySelector('img') ? card.querySelector('img').src : '');
      const clickedIdx = allCardItems.findIndex(item => item.src === clickedSrc);
      openLightboxWithItems(allCardItems, clickedIdx >= 0 ? clickedIdx : 0);
    });
  });

  // Hero photo click
  const heroCard = document.getElementById('hero-photo-card') || document.getElementById('hero-portrait-card');
  if (heroCard) {
    heroCard.addEventListener('click', () => {
      const img = heroCard.querySelector('img') || document.getElementById('hero-photo');
      const src = img ? (img.getAttribute('data-hd-src') || img.src) : 'assets/images/hero.jpg';
      const caption = img ? (img.getAttribute('data-hd-caption') || 'Baby Arshea • Our Little Fairy Princess 🌸') : 'Baby Arshea';
      openSingleLightbox(src, caption);
    });
  }



  // GCash QR card view click
  const gcashCardBox = document.getElementById('gcash-card-box');
  if (gcashCardBox) {
    gcashCardBox.addEventListener('click', () => {
      const src = gcashCardBox.getAttribute('data-hd-src') || 'assets/images/gcash-qr.jpg';
      const caption = gcashCardBox.getAttribute('data-hd-caption') || 'GCash QR Code • Baby Arshea Faye 💗';
      openSingleLightbox(src, caption);
    });
  }
});


