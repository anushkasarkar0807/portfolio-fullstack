(() => {
  const html = document.documentElement;
  const header = document.getElementById("site-header");
  const themeBtn = document.getElementById("theme-toggle");
  const mobileBtn = document.getElementById("menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const yearEl = document.getElementById("year");

  // Year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme initialization
  const stored = localStorage.getItem("theme");
  if (
    stored === "dark" ||
    (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    html.classList.add("dark");
  }

  // Theme toggle button
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        html.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  // Sticky header style
  function onScroll() {
    if (window.scrollY > 8) header?.classList.add("header-scrolled");
    else header?.classList.remove("header-scrolled");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Mobile menu toggle
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
    });
  }

  // Scroll reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal-visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Contact form — connected to backend
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      try {
        const res = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Message saved successfully!");
          form.reset();
        } else {
          alert("Error: " + (data.message || "Failed to save message"));
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Server error. Please try again later.");
      }
    });
  }
})();
document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message || "Saved");
  });

