document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            menuButton.textContent =
                navLinks.classList.contains("open")
                    ? "✕"
                    : "☰";

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuButton.textContent = "☰";

            });

        });

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* ================= NAVBAR EFFECT ================= */

    const navbar =
        document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(8, 9, 10, 0.82)";

            navbar.style.borderBottomColor =
                "rgba(255,255,255,0.14)";

        } else {

            navbar.style.background =
                "transparent";

            navbar.style.borderBottomColor =
                "rgba(255,255,255,0.10)";

        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".section-header, " +
            ".about-main, " +
            ".stat-card, " +
            ".skill-card, " +
            ".project-card, " +
            ".timeline-item, " +
            ".credential-highlight, " +
            ".credential-row, " +
            ".education-card, " +
            ".contact-grid"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.8s ease, " +
            "transform 0.8s cubic-bezier(0.22,1,0.36,1)";

    });


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ================= STAGGER ANIMATION ================= */

    [
        ".skill-card",
        ".project-card",
        ".credential-row"
    ].forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach((card, index) => {

                card.style.transitionDelay =
                    `${Math.min(index * 70, 420)}ms`;

            });

    });


    /* ================= HERO PARALLAX ================= */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollPosition =
                    window.scrollY;

                if (
                    scrollPosition <
                    window.innerHeight
                ) {

                    heroVisual.style.transform =
                        `translateY(${scrollPosition * 0.12}px)`;

                    heroVisual.style.opacity =
                        `${Math.max(
                            0,
                            1 -
                            scrollPosition /
                            (window.innerHeight * 1.4)
                        )}`;

                }

            },
            { passive: true }
        );

    }


    /* ================= HERO 3D MOVEMENT ================= */

    const technicalFrame =
        document.querySelector(".technical-frame");

    if (
        technicalFrame &&
        window.innerWidth > 760
    ) {

        technicalFrame.addEventListener(
            "mousemove",
            event => {

                const rect =
                    technicalFrame.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -4;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                technicalFrame.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        technicalFrame.addEventListener(
            "mouseleave",
            () => {

                technicalFrame.style.transform =
                    "perspective(900px)
                     rotateX(0deg)
                     rotateY(0deg)";

            }
        );

    }


    /* ================= SMOOTH ANCHORS ================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) return;

                    const target =
                        document.querySelector(targetId);

                    if (!target) return;

                    event.preventDefault();

                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight -
                        20;

                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* ================= PROJECT HOVER ================= */

    document
        .querySelectorAll(".project-card")
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.setProperty(
                        "--card-glow",
                        "1"
                    );

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.setProperty(
                        "--card-glow",
                        "0"
                    );

                }
            );

        });


    /* ================= YEAR ================= */

    const footerYear =
        document.querySelector("footer p:last-child");

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()}`;

    }


    /* ================= CONSOLE ================= */

    console.log(
        "%cHARI PRASATH P",
        "font-size:22px;font-weight:bold;"
    );

    console.log(
        "%cMechanical Engineering Portfolio",
        "font-size:13px;"
    );

});