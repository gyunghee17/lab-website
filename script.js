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
