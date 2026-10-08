const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

// Replace the initialization of currentView
const initHashRegex = /const \[currentView, setCurrentView\] = useState<ScreenView>\('home'\);/;
const initHashReplacement = `const getInitialView = (): ScreenView => {
    const hash = window.location.hash.replace('#', '');
    const validViews: ScreenView[] = ['home', 'perfumes', 'collections', 'films', 'story', 'contact', 'care'];
    return validViews.includes(hash as ScreenView) ? (hash as ScreenView) : 'home';
  };
  const [currentView, setCurrentView] = useState<ScreenView>(getInitialView);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews: ScreenView[] = ['home', 'perfumes', 'collections', 'films', 'story', 'contact', 'care'];
      if (validViews.includes(hash as ScreenView)) {
        setCurrentView(hash as ScreenView);
      } else if (hash === '') {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
`;

content = content.replace(initHashRegex, initHashReplacement);

// Also need to update the hash when handleNavigate is called
const handleNavigateRegex = /const handleNavigate = \(view: ScreenView\) => \{\s*setCurrentView\(view\);\s*resetScrollLock\(\);\s*window\.scrollTo\(0, 0\);\s*\};/;
const handleNavigateReplacement = `const handleNavigate = (view: ScreenView) => {
    setCurrentView(view);
    resetScrollLock();
    window.scrollTo(0, 0);
    if (view === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = view;
    }
  };`;

content = content.replace(handleNavigateRegex, handleNavigateReplacement);

fs.writeFileSync(appPath, content, 'utf8');
console.log('App.tsx patched for hash routing.');
