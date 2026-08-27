export const burst = (x, y, glyphs, count = 10) => {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fixed pointer-events-none z-[999] text-2xl';
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    const rot = Math.random() * 80 - 40;
    
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    
    // We'll use Web Animations API for this to avoid adding CSS keyframes manually
    document.body.appendChild(el);
    
    const animation = el.animate([
      { transform: 'translate(0, 0) scale(0.6) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(1.2) rotate(${rot}deg)`, opacity: 0 }
    ], {
      duration: 1400,
      easing: 'ease-out',
      fill: 'forwards'
    });
    
    animation.onfinish = () => el.remove();
  }
};
