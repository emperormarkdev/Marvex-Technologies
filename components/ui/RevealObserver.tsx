"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const viewportHeight = window.innerHeight;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.92) {
        el.classList.add("is-visible");
      } else {
        el.classList.add("js-ready");
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
