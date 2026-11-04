/* LUMIÈRE — fictional product stories; works with existing bag.js */
(() => {
  const modal = document.getElementById('product-story');
  const overlay = document.getElementById('product-story-overlay');
  if (!modal || !overlay) return;
  const catalog = {
    'Éclat Radiance Serum': {
      tone:'lilac',short:'éclat',type:'RADIANCE SERUM',price:42,eyebrow:'01 / THE GLOW',tagline:'A little light, just for you.',
      description:'A weightless, glow-inspired serum imagined for the moments when you want to feel bright, refreshed, and entirely yourself.',
      benefits:['A lightweight, silky-feeling ritual','An easy step between cleansing and moisturizing','A luminous finish in the LUMIÈRE story'],
      ingredients:'An imagined blend inspired by botanical waters, glycerin, and a touch of pearlescent radiance.',
      how:'After cleansing, imagine smoothing a few drops onto your skin. Follow with Nuage Cloud Cream.'
    },
    'Nuage Cloud Cream': {
      tone:'peach',short:'nuage',type:'CLOUD CREAM',price:38,eyebrow:'02 / THE COMFORT',tagline:'Softness is a beautiful thing.',
      description:'A cushiony cream concept that celebrates quiet evenings, gentle mornings, and the luxury of taking your time.',
      benefits:['A plush, cloud-like texture concept','A comforting final step to your ritual','A soft, dewy-feeling finish in the brand story'],
      ingredients:'An imagined composition inspired by oat extracts, squalane, and soft floral notes.',
      how:'As the final step of your fictional ritual, imagine massaging a small amount over the face and neck.'
    },
    'Calme Gentle Cleanser': {
      tone:'sage',short:'calme',type:'GENTLE CLEANSER',price:28,eyebrow:'03 / THE RESET',tagline:'Every good ritual begins again.',
      description:'A refreshing cleanser concept inspired by simple beginnings, a clear mind, and an unhurried moment to reset.',
      benefits:['A gentle, fresh-feeling cleansing concept','A simple start to a three-step routine','A soft, clean finish in the LUMIÈRE story'],
      ingredients:'An imagined formula story inspired by aloe, cucumber water, and mild cleansing ingredients.',
      how:'Imagine gently massaging onto damp skin, rinsing, and continuing with Éclat Radiance Serum.'
    }
  };
  let active = null;
  let previousFocus = null;
  const set = (id, value) => { document.getElementById(id).textContent = value; };
  function open(name) {
    const p = catalog[name]; if (!p) return;
    active = name; previousFocus = document.activeElement;
    set('product-story-title',name);set('product-story-short',p.short);set('product-story-type',p.type);
    set('product-story-eyebrow',p.eyebrow);set('product-story-tagline',p.tagline);
    set('product-story-description',p.description);set('product-story-ingredients',p.ingredients);
    set('product-story-how',p.how);set('product-story-price',`$${p.price}`);
    document.getElementById('product-story-art').dataset.tone=p.tone;
    const list=document.getElementById('product-story-benefits');list.replaceChildren();
    p.benefits.forEach(t=>{const li=document.createElement('li');li.textContent=t;list.append(li)});
    overlay.hidden=false;modal.hidden=false;document.body.style.overflow='hidden';
    document.getElementById('product-story-close').focus();
  }
  function close() {
    modal.hidden=true;overlay.hidden=true;document.body.style.overflow='';
    if(previousFocus && previousFocus.isConnected) previousFocus.focus();
  }
  document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.detail)));
  document.getElementById('product-story-close').addEventListener('click',close);
  overlay.addEventListener('click',close);
  document.getElementById('product-story-add').addEventListener('click',()=>{
    const name=active;close();
    const original=[...document.querySelectorAll('.add-button[data-product]')].find(b=>b.dataset.product===name);
    if(original) original.click();
  });
  document.addEventListener('keydown',e=>{
    if(modal.hidden)return;
    if(e.key==='Escape'){e.preventDefault();close();return}
    if(e.key!=='Tab')return;
    const buttons=[...modal.querySelectorAll('button:not([disabled])')];
    const first=buttons[0],last=buttons[buttons.length-1];
    if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus()}
  });
})();
