const playBtn = document.getElementById('playBtn');
    const videoContainer = document.getElementById('videoContainer');
    const startScreen = document.getElementById('startScreen');
    const overlay = document.getElementById('overlayContent');
    const video = document.getElementById('videoPlayer');
    const statusText = document.getElementById('statusText');

    function getVideoId() {
      const query = new URLSearchParams(window.location.search);
      const raw = query.get('q');
      if (!raw) return null;
      try {
        const url = new URL(raw);
        if (url.pathname.includes('/s/')) {
          return url.pathname.split('/s/').pop().replace(/^1/, '');
        }
      } catch {
        return raw.replace(/^1/, '');
      }
      return null;
    }

    function playVideo() {
      const id = getVideoId();
      if (!id) return;

      // Hide start screen
      startScreen.style.display = 'none';

      // Show video section + status text
      videoContainer.style.display = 'block';
      statusText.style.display = 'block';

      // Wait 5 seconds, then try to play
      setTimeout(() => {
        video.src = 'https://video.mdiskplay.com/' + id + '.m3u8';
        video.load();
        video.play().catch(() => {
          // fail silently
        });
      }, 5000);
    }

    // Hide overlays and status once video plays
    video.addEventListener('playing', () => {
      overlay.style.display = 'none';
      statusText.style.display = 'none';
    });

    playBtn.addEventListener('click', playVideo);
