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