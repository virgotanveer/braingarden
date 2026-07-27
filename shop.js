/* ===================================================================
   Ziggy's Shop — spend stars on cosmetic mascot customization.
   Purely cosmetic (no gameplay advantage), which keeps it safe as a
   reward loop rather than pay-to-win pressure.
   =================================================================== */

const Shop = (() => {
  function getOwned(){
    try{ return JSON.parse(Storage.get("bg_shop_owned")) || ["color_gold", "acc_none"]; }
    catch(e){ return ["color_gold", "acc_none"]; }
  }
  function saveOwned(list){ Storage.set("bg_shop_owned", JSON.stringify(list)); }

  function getEquipped(){
    try{ return { color: "color_gold", accessory: "acc_none", ...JSON.parse(Storage.get("bg_shop_equipped")) }; }
    catch(e){ return { color: "color_gold", accessory: "acc_none" }; }
  }
  function saveEquipped(eq){ Storage.set("bg_shop_equipped", JSON.stringify(eq)); }

  function buy(itemId){
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    const owned = getOwned();
    if (owned.includes(itemId)) return equip(itemId);
    if (App.getTotalStars() < item.cost) return;
    App.addStars(-item.cost);
    owned.push(itemId);
    saveOwned(owned);
    App.sfxWin();
    equip(itemId);
  }

  function equip(itemId){
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    const eq = getEquipped();
    eq[item.type] = itemId;
    saveEquipped(eq);
    applyToMascot();
    renderShop();
  }

  function applyToMascot(){
    const eq = getEquipped();
    const color = SHOP_ITEMS.find(i => i.id === eq.color) || SHOP_ITEMS[0];
    const accessory = SHOP_ITEMS.find(i => i.id === eq.accessory);
    const star = document.getElementById("mascotStar");
    if (star) star.style.background = color.value;
    const acc = document.getElementById("mascotAccessory");
    if (acc) acc.textContent = accessory ? accessory.emoji : "";
  }

  function renderShop(){
    const owned = getOwned();
    const equipped = getEquipped();
    const wrap = document.getElementById("shopGrid");
    wrap.innerHTML = "";

    SHOP_ITEMS.forEach(item => {
      const isOwned = owned.includes(item.id);
      const isEquipped = equipped[item.type] === item.id;
      const card = document.createElement("div");
      card.className = "shop-card" + (isEquipped ? " equipped" : "");

      const preview = item.type === "color"
        ? `<div class="shop-preview" style="background:${item.value}"></div>`
        : `<div class="shop-preview shop-preview-emoji">${item.emoji || "🚫"}</div>`;

      const actionLabel = isEquipped ? "Equipped ✓" : isOwned ? "Equip" : `Buy · ⭐${item.cost}`;
      const disabled = !isOwned && App.getTotalStars() < item.cost;

      card.innerHTML = `
        ${preview}
        <div class="shop-name">${item.name}</div>
        <button class="shop-action ${isEquipped ? "is-equipped" : ""}" ${disabled ? "disabled" : ""}>${actionLabel}</button>`;
      card.querySelector(".shop-action").addEventListener("click", () => buy(item.id));
      wrap.appendChild(card);
    });

    document.getElementById("shopStarCount").textContent = App.getTotalStars();
  }

  function init(){
    applyToMascot();
    const trigger = document.getElementById("shopTopbarBtn");
    if (trigger) trigger.addEventListener("click", () => { renderShop(); App.goTo("screen-shop"); });
  }

  return { init, renderShop, applyToMascot };
})();

document.addEventListener("bg:statsUpdated", () => {
  if (document.getElementById("screen-shop").classList.contains("active")) Shop.renderShop();
});
document.addEventListener("DOMContentLoaded", Shop.init);
