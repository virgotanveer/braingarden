/* ===================================================================
   Ziggy's Brain Garden — Video Library
   Renders the hand-curated VIDEO_LIBRARY from data.js. Nothing here
   ever calls the YouTube search or Data API — every video shown is a
   specific ID chosen in advance. Embeds use youtube-nocookie.com with
   related-video suggestions limited to the uploading channel, and
   playback is torn down (iframe removed) the moment the user leaves
   the player screen so nothing keeps playing in the background.
   =================================================================== */

const VideoLibrary = (() => {
  let currentCategoryKey = null;

  function renderCategories(){
    const grid = document.getElementById("videoCategoryGrid");
    grid.innerHTML = "";
    Object.entries(VIDEO_LIBRARY).forEach(([key, cat]) => {
      const card = document.createElement("button");
      card.className = "picker-card";
      card.style.borderTop = `6px solid ${cat.color}`;
      card.innerHTML = `<span class="emoji">${cat.icon}</span><span class="deck-title">${cat.title}</span>`;
      card.addEventListener("click", () => openCategory(key));
      grid.appendChild(card);
    });
  }

  function openCategory(key){
    currentCategoryKey = key;
    const cat = VIDEO_LIBRARY[key];
    document.getElementById("videoCategoryTitle").textContent = `${cat.icon} ${cat.title}`;

    const grid = document.getElementById("videoGrid");
    grid.innerHTML = "";
    cat.videos.forEach(v => {
      const card = document.createElement("button");
      card.className = "video-card";
      card.innerHTML = `
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy">
        <div class="video-card-body">
          <div class="video-card-title">${v.title}</div>
          <div class="video-card-channel">${v.channel}</div>
        </div>`;
      card.addEventListener("click", () => openPlayer(v));
      grid.appendChild(card);
    });

    App.goTo("screen-video-list");
  }

  function openPlayer(video){
    document.getElementById("videoPlayerTitle").textContent = video.title;
    document.getElementById("videoPlayerChannel").textContent = video.channel;

    const wrap = document.getElementById("videoPlayerWrap");
    wrap.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&fs=1`;
    iframe.title = video.title;
    iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    wrap.appendChild(iframe);

    App.goTo("screen-video-player");
  }

  function stopAndGoBack(){
    // Remove the iframe entirely so playback (and audio) actually stops.
    document.getElementById("videoPlayerWrap").innerHTML = "";
    App.goTo(currentCategoryKey ? "screen-video-list" : "screen-picker-videos");
  }

  function init(){
    renderCategories();
    document.getElementById("videoBackBtn").addEventListener("click", stopAndGoBack);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", VideoLibrary.init);
