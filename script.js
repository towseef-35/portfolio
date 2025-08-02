document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scrolling for Nav Links ---
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70, // Adjust for sticky nav height
        behavior: "smooth",
      });
    });
  });

  // --- Active Link Highlighting on Scroll ---
  const sections = document.querySelectorAll("section");
  const navLi = document.querySelectorAll(".nav-menu .nav-item .nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-80px 0px -80px 0px", // Adjust margin to trigger earlier/later
    threshold: 0.6, // 60% of the section must be visible
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLi.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // --- Reveal Elements on Scroll ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});
