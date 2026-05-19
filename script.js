(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var navLinks = document.querySelectorAll('.site-nav__link');
        var sections = document.querySelectorAll('.section');

        function navigateTo(target) {
            if (!target) return;

            // Update nav active state
            navLinks.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('data-target') === target);
            });

            // Swap visible section
            sections.forEach(function (section) {
                section.classList.remove('active');
            });

            var targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Scroll to top of the page (left panel is fixed, body scrolls)
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Persist current section in URL hash for bookmarking
            history.replaceState(null, '', '#' + target);
        }

        // Wire up nav clicks
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                navigateTo(this.getAttribute('data-target'));
            });
        });

        // Restore from URL hash on load (e.g. direct link to #about)
        var hash = window.location.hash.replace('#', '');
        var validTargets = Array.from(sections).map(function (s) { return s.id; });
        if (hash && validTargets.indexOf(hash) !== -1) {
            navigateTo(hash);
        }
    });

}());
