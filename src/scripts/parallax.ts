import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./split";

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax for [data-parallax] media. Each one sits inside a box that clips
 * it, and drifts from above to below its resting place as that box crosses
 * the screen, so it seems to move slower than the page.
 *
 *   data-parallax="12"   how far it drifts each way, as a % of its height (default 8)
 *
 * It's scaled up just enough that the drift never shows the box's edges. The
 * scroll it follows is its parent's, or the nearest [data-parallax-root]
 * (used for the sticky sections, whose frames don't move while stuck).
 */
if (!prefersReducedMotion()) {
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || "8");

    gsap.fromTo(
      el,
      { yPercent: -amount, scale: 1 + (amount * 2) / 100 },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("[data-parallax-root]") ?? el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}
