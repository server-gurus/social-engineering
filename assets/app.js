
document.addEventListener('DOMContentLoaded', function () {
  try {
    document.querySelectorAll('[data-lang-pref]').forEach(function (link) {
      link.addEventListener('click', function () {
        try { localStorage.setItem('sh_lang', this.getAttribute('data-lang-pref')); } catch (e) {}
      });
    });
  } catch (e) {}

  const links = Array.from(document.querySelectorAll('.toc-list a'));
  const targets = links
    .map(link => ({link, el: document.querySelector(link.getAttribute('href'))}))
    .filter(item => item.el);

  if ('IntersectionObserver' in window && targets.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const match = targets.find(item => item.el === entry.target);
        if (!match) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          match.link.classList.add('active');
        }
      });
    }, {rootMargin: '-25% 0px -60% 0px', threshold: 0.01});

    targets.forEach(item => observer.observe(item.el));
  }
});
