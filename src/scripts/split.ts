import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * The character reveal from the original site's <c-split>. Each [data-split]
 * line masks its own characters, which slide in from above or below.
 *
 *   data-from="bottom"  chars rise from below (default: drop in from above)
 *   data-reverse        stagger runs last char → first
 *   data-duration       seconds per char (default 1)
 *   data-stagger        seconds between chars (default 0.06)
 *   data-delay          seconds before the first char (default 0)
 *
 * Returns a paused tfmeline, so the caller decides when it plays.
 */
export function createSplit(el: HTMLElement): gsap.core.Timeline {
  const { from, duration, stagger, delay } = el.dataset;
  const reverse = el.hasAttribute("data-reverse");
  const step = stagger ? parseFloat(stagger) : 0.06;

  const split = SplitText.create(el, { type: "chars" });
  el.classList.add("is-split");

  return gsap
    .timeline({ paused: true })
    .fromTo(
      split.chars,
      { yPercent: from === "bottom" ? 100 : -100 },
      {
        yPercent: 0,
        duration: duration ? parseFloat(duration) : 1,
        delay: delay ? parseFloat(delay) : 0,
        ease: "power3.out",
        force3D: true,
        stagger: reverse ? -step : step,
      },
    );
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
