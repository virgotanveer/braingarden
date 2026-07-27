/* ===================================================================
   Ziggy's Brain Garden — profiles & namespaced storage
   Loaded right after data.js, before every other module. All other
   files should read/write progress through Storage.get/set instead of
   localStorage directly, so that stars/levels/badges/streaks stay
   separate per child. bg_profiles, bg_active_profile, and
   bg_install_dismissed are the only keys that stay un-namespaced —
   everything else gets prefixed with the active profile's id.
   =================================================================== */

const Profiles = (() => {
  function getAll(){
    try{ return JSON.parse(localStorage.getItem("bg_profiles")) || []; }
    catch(e){ return []; }
  }
  function saveAll(list){ localStorage.setItem("bg_profiles", JSON.stringify(list)); }
  function getActiveId(){ return localStorage.getItem("bg_active_profile"); }
  function setActiveId(id){ localStorage.setItem("bg_active_profile", id); }
  function get(id){ return getAll().find(p => p.id === id) || null; }
  function getActive(){ const id = getActiveId(); return id ? get(id) : null; }

  const LEGACY_KEYS = ["bg_stars","bg_settings","bg_stats","bg_streak","bg_time_ms","bg_badges",
    "bg_shop_owned","bg_shop_equipped",
    "bg_level_memory","bg_level_odd","bg_level_sort","bg_level_count","bg_level_math",
    "bg_level_sequence","bg_level_scramble","bg_level_time","bg_level_money","bg_level_shadow"];

  function migrateLegacyDataTo(id){
    let found = false;
    LEGACY_KEYS.forEach(k => {
      const v = localStorage.getItem(k);
      if (v !== null){
        localStorage.setItem(`p_${id}_${k}`, v);
        localStorage.removeItem(k);
        found = true;
      }
    });
    return found;
  }

  function create(name, avatarId){
    const isFirstEver = getAll().length === 0;
    const list = getAll();
    const id = "p" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
    list.push({ id, name: name || "Explorer", avatar: avatarId || AVATAR_OPTIONS[0].id, createdAt: Date.now() });
    saveAll(list);
    if (isFirstEver) migrateLegacyDataTo(id);
    return id;
  }
  function update(id, name, avatarId){
    const list = getAll();
    const p = list.find(x => x.id === id);
    if (p){ p.name = name || p.name; p.avatar = avatarId || p.avatar; saveAll(list); }
  }
  function remove(id){
    saveAll(getAll().filter(p => p.id !== id));
    const prefix = `p_${id}_`;
    Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k));
    if (getActiveId() === id) localStorage.removeItem("bg_active_profile");
  }
  function avatarOf(profile){
    return AVATAR_OPTIONS.find(a => a.id === (profile && profile.avatar)) || AVATAR_OPTIONS[0];
  }

  return { getAll, getActiveId, setActiveId, get, getActive, create, update, remove, avatarOf };
})();

const Storage = (() => {
  function ns(key){
    const id = Profiles.getActiveId();
    return id ? `p_${id}_${key}` : key;
  }
  function get(key){ return localStorage.getItem(ns(key)); }
  function set(key, val){ localStorage.setItem(ns(key), val); }
  function remove(key){ localStorage.removeItem(ns(key)); }
  function keysForActiveProfile(){
    const id = Profiles.getActiveId();
    if (!id) return [];
    const prefix = `p_${id}_`;
    return Object.keys(localStorage).filter(k => k.startsWith(prefix));
  }
  return { get, set, remove, ns, keysForActiveProfile };
})();

/* ---------------- Profile picker / editor UI ---------------- */
const ProfileUI = (() => {
  let editingId = null; // null = creating a new profile
  let selectedAvatar = AVATAR_OPTIONS[0].id;

  function renderPicker(){
    const grid = document.getElementById("profileGrid");
    grid.innerHTML = "";
    Profiles.getAll().forEach(p => {
      const av = Profiles.avatarOf(p);
      const card = document.createElement("button");
      card.className = "profile-card";
      card.style.borderColor = av.color;
      card.innerHTML = `
        <span class="profile-avatar" style="background:${av.color}">${av.emoji}</span>
        <span class="profile-name">${p.name}</span>
        <span class="profile-edit" data-edit="${p.id}">✏️</span>`;
      card.addEventListener("click", (e) => {
        if (e.target.closest(".profile-edit")){ openEditor(p.id); return; }
        selectProfile(p.id);
      });
      grid.appendChild(card);
    });

    const addCard = document.createElement("button");
    addCard.className = "profile-card add-profile";
    addCard.innerHTML = `<span class="profile-avatar add">➕</span><span class="profile-name">Add Profile</span>`;
    addCard.addEventListener("click", () => openEditor(null));
    grid.appendChild(addCard);

    updateTopbarBadge();
  }

  function selectProfile(id){
    Profiles.setActiveId(id);
    window.location.reload();
  }

  function openEditor(id){
    editingId = id;
    const p = id ? Profiles.get(id) : null;
    selectedAvatar = p ? p.avatar : AVATAR_OPTIONS[0].id;
    document.getElementById("profileEditTitle").textContent = id ? "Edit Profile" : "New Profile";
    document.getElementById("profileNameInput").value = p ? p.name : "";
    document.getElementById("profileDeleteBtn").hidden = !id;
    renderAvatarChoices();
    App.goTo("screen-profile-edit");
  }

  function renderAvatarChoices(){
    const wrap = document.getElementById("avatarChoices");
    wrap.innerHTML = "";
    AVATAR_OPTIONS.forEach(a => {
      const btn = document.createElement("button");
      btn.className = "avatar-choice" + (a.id === selectedAvatar ? " selected" : "");
      btn.style.background = a.color;
      btn.textContent = a.emoji;
      btn.addEventListener("click", () => {
        selectedAvatar = a.id;
        renderAvatarChoices();
      });
      wrap.appendChild(btn);
    });
  }

  function saveProfile(){
    const name = document.getElementById("profileNameInput").value.trim().slice(0, 20) || "Explorer";
    if (editingId){
      Profiles.update(editingId, name, selectedAvatar);
      if (Profiles.getActiveId() === editingId){ window.location.reload(); return; }
    } else {
      const id = Profiles.create(name, selectedAvatar);
      selectProfile(id);
      return;
    }
    renderPicker();
    App.goTo("screen-profiles");
  }

  function deleteProfile(){
    if (!editingId) return;
    if (!window.confirm("Delete this profile and all of its progress? This can't be undone.")) return;
    Profiles.remove(editingId);
    renderPicker();
    App.goTo("screen-profiles");
  }

  function updateTopbarBadge(){
    const badge = document.getElementById("profileTopbarBtn");
    if (!badge) return;
    const active = Profiles.getActive();
    if (active){
      const av = Profiles.avatarOf(active);
      badge.textContent = av.emoji;
      badge.style.background = av.color;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }

  function init(){
    renderPicker();
    document.getElementById("profileSaveBtn").addEventListener("click", saveProfile);
    document.getElementById("profileDeleteBtn").addEventListener("click", deleteProfile);
    document.getElementById("profileTopbarBtn").addEventListener("click", () => {
      renderPicker();
      App.goTo("screen-profiles");
    });
  }

  return { init, renderPicker, updateTopbarBadge };
})();

/* Decide the very first screen: profile picker if none active yet. */
function startupRouting(){
  const active = Profiles.getActive();
  if (!active){
    document.getElementById("screen-profiles").classList.add("active");
    document.getElementById("screen-home").classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ProfileUI.init();
  startupRouting();
});
