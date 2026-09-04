/**
 * Cleanly reset body and documentElement styles and classes
 * to ensure wheel, trackpad, touch, and keyboard scrolling are never trapped.
 */
export const resetScrollLock = (): void => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.documentElement.style.overflow = '';
  document.body.classList.remove('overlay-open');
};
