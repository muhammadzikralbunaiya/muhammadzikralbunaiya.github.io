/* =====================================================
   PORTFOLIO JAVASCRIPT
   Muhammad Zikral Bunaiya
===================================================== */


/* =====================================================
   SMOOTH SCROLL
===================================================== */

const navLinks = document.querySelectorAll(
    '.nav-link, .footer-links a, .brand'
);

navLinks.forEach(link => {

    link.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');

        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });

});


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll('.reveal');


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('show');

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll('section[id]');


const navigationLinks =
    document.querySelectorAll('.nav-link');


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentSection =
                    entry.target.getAttribute('id');


                navigationLinks.forEach(link => {

                    link.classList.remove('active');


                    const linkTarget =
                        link.getAttribute('href');


                    if (
                        linkTarget ===
                        `#${currentSection}`
                    ) {

                        link.classList.add('active');

                    }

                });

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById('contactForm');


if (contactForm) {

    contactForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById('name')
                    .value
                    .trim();


            const email =
                document
                    .getElementById('email')
                    .value
                    .trim();


            const message =
                document
                    .getElementById('message')
                    .value
                    .trim();


            if (!name || !email || !message) {

                alert(
                    'Silakan isi semua kolom terlebih dahulu.'
                );

                return;

            }


            const recipient =
                'muhammadzikralbunaiya@gmail.com';


            const subject =
                encodeURIComponent(
                    `Pesan Portfolio dari ${name}`
                );


            const body =
                encodeURIComponent(
                    `Nama: ${name}\n\n` +
                    `Email: ${email}\n\n` +
                    `Pesan:\n${message}`
                );


            const mailtoLink =
                `mailto:${recipient}` +
                `?subject=${subject}` +
                `&body=${body}`;


            window.location.href =
                mailtoLink;

        }
    );

}


/* =====================================================
   FOOTER YEAR
===================================================== */

const currentYear =
    document.getElementById('currentYear');


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById('backToTop');


if (backToTop) {

    window.addEventListener(
        'scroll',
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add('show');

            } else {

                backToTop.classList.remove('show');

            }

        }
    );


    backToTop.addEventListener(
        'click',
        () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }
    );

}


/* =====================================================
   PAGE LOADED
===================================================== */

window.addEventListener(
    'load',
    () => {

        document.body.classList.add('loaded');

    }
);

/* =====================================================
   LUXURY THEME + INTERACTION
===================================================== */

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle
    ? themeToggle.querySelector('.theme-icon')
    : null;

function applyTheme(theme) {

    document.body.classList.toggle(
        'light',
        theme === 'light'
    );

    if (themeIcon) {
        themeIcon.textContent =
            theme === 'light'
                ? '🌙'
                : '☀️';
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            'aria-label',
            theme === 'light'
                ? 'Aktifkan mode gelap'
                : 'Aktifkan mode terang'
        );

        themeToggle.setAttribute(
            'title',
            theme === 'light'
                ? 'Ganti ke mode gelap'
                : 'Ganti ke mode terang'
        );
    }
}

const savedTheme =
    localStorage.getItem('portfolio-theme');

applyTheme(
    savedTheme === 'light'
        ? 'light'
        : 'dark'
);

if (themeToggle) {

    themeToggle.addEventListener(
        'click',
        () => {

            const nextTheme =
                document.body.classList.contains('light')
                    ? 'dark'
                    : 'light';

            localStorage.setItem(
                'portfolio-theme',
                nextTheme
            );

            applyTheme(nextTheme);
        }
    );
}


/* =====================================================
   MOUSE SPOTLIGHT
===================================================== */

window.addEventListener(
    'pointermove',
    (event) => {

        document.documentElement.style.setProperty(
            '--mouse-x',
            `${event.clientX}px`
        );

        document.documentElement.style.setProperty(
            '--mouse-y',
            `${event.clientY}px`
        );

    },
    { passive: true }
);


/* =====================================================
   PREMIUM CARD TILT
===================================================== */

const tiltCards = document.querySelectorAll(
    '.project-card, .skill-card, .hobby-card'
);

tiltCards.forEach(card => {

    card.addEventListener(
        'pointermove',
        event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );

    card.addEventListener(
        'pointerleave',
        () => {
            card.style.transform = '';
        }
    );

});