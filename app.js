(function () {
    const controls = document.querySelectorAll(".control");
    const themeButton = document.querySelector(".theme-btn");
    const body = document.body;

    const skillItems = document.querySelectorAll(".skills-grid .progress-bar-item");
    const skillObserver = "IntersectionObserver" in window
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                skillObserver.unobserve(entry.target);
            });
        }, { threshold: 0.2 })
        : null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    skillItems.forEach(item => {
        const percent = Number(item.dataset.percent);
        const progress = item.querySelector(".progress");
        const fill = item.querySelector(".progress-fill");
        const title = item.querySelector(".skill-title");

        if (!Number.isFinite(percent) || percent < 0 || percent > 100 || !progress || !fill) {
            console.error("Unable to initialize skill progress.", item);
            return;
        }

        fill.style.setProperty("--skill-width", `${percent}%`);
        progress.setAttribute("role", "progressbar");
        progress.setAttribute("aria-label", title ? title.textContent.trim() : "Skill level");
        progress.setAttribute("aria-valuemin", "0");
        progress.setAttribute("aria-valuemax", "100");
        progress.setAttribute("aria-valuenow", String(percent));

        if (!skillObserver || prefersReducedMotion) {
            item.classList.add("is-visible");
        } else {
            skillObserver.observe(item);
        }
    });

    controls.forEach(control => {
        control.addEventListener("click", function () {
            const target = document.getElementById(control.dataset.id);
            const activeSection = document.querySelector(".container.active");

            if (!target || !activeSection) {
                console.error("Unable to switch portfolio section.", control.dataset.id);
                return;
            }

            activeSection.classList.remove("active");
            target.classList.add("active");

            controls.forEach(item => {
                const isActive = item === control;
                item.classList.toggle("active-btn", isActive);
                item.setAttribute("aria-current", isActive ? "page" : "false");
            });
        });
    });

    let savedTheme;
    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {
        console.error("Unable to read the saved theme preference.", error);
    }

    body.classList.toggle("light-mode", savedTheme === "light");
    themeButton.setAttribute("aria-pressed", String(savedTheme === "light"));
    themeButton.setAttribute(
        "aria-label",
        savedTheme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );

    themeButton.addEventListener("click", function () {
        const isLightMode = body.classList.toggle("light-mode");
        themeButton.setAttribute("aria-pressed", String(isLightMode));
        themeButton.setAttribute(
            "aria-label",
            isLightMode ? "Switch to dark theme" : "Switch to light theme"
        );

        try {
            localStorage.setItem("theme", isLightMode ? "light" : "dark");
        } catch (error) {
            console.error("Unable to save the theme preference.", error);
        }
    });
})();
