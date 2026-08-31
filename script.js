// Mobile navigation toggle + Gallery tabs. Nothing here needs to be edited.
document.addEventListener('DOMContentLoaded', function () {

  /* ---- mobile menu ---- */
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  /* ---- back to top ----
     The button is created here, so no page needs its own copy of it.
     It fades in once you have scrolled past 400px. Change that number to
     make it appear sooner or later; the look is set in style.css (.to-top). */
  var btnTop = document.createElement('button');
  btnTop.type = 'button';
  btnTop.className = 'to-top';
  btnTop.setAttribute('aria-label', 'Back to top');
  /* A chevron, drawn as a line rather than a text arrow so its thickness can
     be set. Raise stroke-width for a heavier stroke. */
  btnTop.innerHTML =
    '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" ' +
    'stroke="currentColor" stroke-width="3.2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true"><path d="M5 15.5 12 8.5l7 7"/></svg>';
  document.body.appendChild(btnTop);

  btnTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function showTopButton() {
    btnTop.classList.toggle('is-on', window.scrollY > 400);
  }
  showTopButton();
  window.addEventListener('scroll', showTopButton, { passive: true });

  /* ---- tabs ----
     Each .tab-btn has data-tab="x"; the panel it shows is the element
     with id="x". The address bar keeps #x so the tab survives a reload
     and can be linked to directly (e.g. gallery.html#photos).        */
  var tabs = document.querySelectorAll('.tab-btn');
  if (!tabs.length) return;

  function show(name) {
    var found = false;
    tabs.forEach(function (t) {
      var on = t.dataset.tab === name;
      t.classList.toggle('is-on', on);
      if (on) found = true;
    });
    document.querySelectorAll('.tab-panel').forEach(function (p) {
      p.classList.toggle('is-on', p.id === name);
    });
    return found;
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      show(t.dataset.tab);
      history.replaceState(null, '', '#' + t.dataset.tab);
    });
  });

  var fromUrl = location.hash.replace('#', '');
  if (fromUrl) show(fromUrl);
});
