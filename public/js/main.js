document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const heartsContainer = document.getElementById('heartsContainer');
  const musicBtn = document.getElementById('musicBtn');
  const startBtn = document.getElementById('startBtn');
  const toMessageBtn = document.getElementById('toMessageBtn');
  const toProposalBtn = document.getElementById('toProposalBtn');
  const yesBtn = document.getElementById('yesBtn');
  const maybeBtn = document.getElementById('maybeBtn');
  const backToProposalBtn = document.getElementById('backToProposalBtn');
  const sureYesBtn = document.getElementById('sureYesBtn');
  const sureNoBtn = document.getElementById('sureNoBtn');

  // Sections
  const welcomeSection = document.getElementById('welcome');
  const momentsSection = document.getElementById('moments');
  const messageSection = document.getElementById('message');
  const proposalSection = document.getElementById('proposal');
  const sureSection = document.getElementById('sure');
  const celebrationSection = document.getElementById('celebration');
  const thinkingSection = document.getElementById('thinking');

  // Audio
  let audio = null;
  let isPlaying = false;

  // Collect web data
  function collectWebData() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      screenWidth: screen.width,
      screenHeight: screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      url: window.location.href
    };
  }

  // Send response to server
  async function sendResponse(answer) {
    try {
      await fetch('/api/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer,
          webData: collectWebData()
        })
      });
    } catch (e) {
      console.error('Error sending response:', e);
    }
  }

  // Create floating hearts
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '&#10084;';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    const colors = ['#ff6b9d', '#ffa5c3', '#e84393', '#d4af37', '#87ceeb'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }

  // Create hearts periodically
  setInterval(createHeart, 500);

  // Create initial hearts
  for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 200);
  }

  // Music toggle
  musicBtn.addEventListener('click', () => {
    if (!audio) {
      audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
      audio.loop = true;
    }

    if (isPlaying) {
      audio.pause();
      musicBtn.classList.remove('playing');
    } else {
      audio.play();
      musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
  });

  // Section navigation
  function showSection(hideSection, showSection) {
    hideSection.classList.add('hidden');
    showSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Button handlers
  startBtn.addEventListener('click', () => {
    showSection(welcomeSection, momentsSection);
  });

  toMessageBtn.addEventListener('click', () => {
    showSection(momentsSection, messageSection);
  });

  toProposalBtn.addEventListener('click', () => {
    showSection(messageSection, proposalSection);
  });

  yesBtn.addEventListener('click', () => {
    sendResponse('yes_click');
    showSection(proposalSection, sureSection);
  });

  sureYesBtn.addEventListener('click', async () => {
    await sendResponse('yes');
    showSection(sureSection, celebrationSection);
    createConfetti();
    createHeartsRain();
  });

  sureNoBtn.addEventListener('click', () => {
    sendResponse('no_from_sure');
    showSection(sureSection, proposalSection);
  });

  maybeBtn.addEventListener('click', () => {
    sendResponse('maybe');
    showSection(proposalSection, thinkingSection);
  });

  backToProposalBtn.addEventListener('click', () => {
    showSection(thinkingSection, proposalSection);
  });

  // Create confetti
  function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b9d', '#d4af37', '#87ceeb', '#f4e4bc', '#e84393'];

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 4000);
      }, i * 30);
    }
  }

  // Create hearts rain
  function createHeartsRain() {
    const heartsRain = document.getElementById('heartsRain');
    const colors = ['#ff6b9d', '#ffa5c3', '#e84393', '#d4af37', '#f4e4bc', '#87ceeb'];

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'raining-heart';
        heart.innerHTML = '&#10084;';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        heartsRain.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, i * 50);
    }
  }

  // Add hover effects to gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05) rotate(2deg)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Add click effect to yes button
  yesBtn.addEventListener('mousedown', () => {
    yesBtn.style.transform = 'scale(0.95)';
  });

  yesBtn.addEventListener('mouseup', () => {
    yesBtn.style.transform = 'scale(1.05)';
  });

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heartsContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});
