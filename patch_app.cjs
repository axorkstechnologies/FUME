const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace(/const handleNavigate = \(view: ScreenView\) => \{\s*resetScrollLock\(\);\s*setCurrentView\(view\);\s*window\.scrollTo\(\{ top: 0, behavior: 'auto' \}\);\s*\};/,
`const handleNavigate = (view: ScreenView) => {
    resetScrollLock();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
    if(view === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = view;
    }
  };`);
fs.writeFileSync('src/App.tsx', c);
console.log('App.tsx patched handleNavigate.');
