const fs = require('fs');

const css = `@import "tailwindcss";

@theme {
  --color-pearl: #FDFBF7;
  --color-oyster: #F5F2EF;
  --color-dusty-rose: #211E1D; /* Deep charcoal/almost black */
  --color-sand: #EAE6DF;
  --color-shadow: #0A0A0A;
  
  --font-serif: "Bodoni Moda", "Didot", "Times New Roman", serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

/* === ARCHITECTURAL MINIMALISM BASELINE === */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background-color: var(--color-pearl);
  color: var(--color-shadow);
  letter-spacing: 0.02em;
}

/* Clean up glass cards to be sharp, architectural, no blur */
.glass-panel {
  background-color: rgba(253, 251, 247, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.glass-card {
  background-color: var(--color-pearl);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card:hover {
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.gold-glow {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.03);
}

/* Elevate headings */
h1, h2, h3, h4, h5, h6 {
  font-feature-settings: "kern" 1, "liga" 1;
  text-rendering: geometricPrecision;
  letter-spacing: 0.08em;
}

*:focus-visible {
  outline: 1px solid var(--color-shadow);
  outline-offset: 2px;
}

::selection {
  background-color: var(--color-shadow);
  color: var(--color-pearl);
}

/* Animations */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

html {
  scroll-behavior: auto;
}

/* Clean Header Structure */
.site-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: 16px;
  position: relative;
}

.brand {
  position: static;
  transform: none;
  justify-self: center;
}

@media (min-width: 768px) {
  .site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    column-gap: 0;
  }
  .brand {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    pointer-events: auto;
    margin: 0;
  }
  .nav-left, .nav-right {
    max-width: calc(50% - 110px);
    flex: 0 1 auto;
    min-width: 0;
    z-index: 20;
  }
  .nav-left nav {
    gap: clamp(6px, 1.5vw, 30px);
    max-width: 100%;
  }
  .nav-left nav button {
    font-size: clamp(9px, 0.75vw, 10.5px);
    letter-spacing: clamp(0.1em, 0.15vw, 0.25em);
    white-space: nowrap;
    flex-shrink: 0;
  }
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: var(--color-pearl); }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.3); }

/* Make buttons feel extremely solid */
button {
  font-family: var(--font-sans);
  letter-spacing: 0.15em;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
`;

fs.writeFileSync('src/index.css', css);
console.log('Done rewriting index.css');
