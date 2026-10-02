/**
 * The small window the hero's video shrinks into and Let's power's grows out
 * of, as a share of the screen width and a floor in px. Matches
 * --power-window in global.css, which the list is laid out around.
 */
export const POWER_WINDOW = { width: 180 / 1728, min: 128 };

/**
 * A full-screen layer seen through a centred 16:9 window that can rise in from
 * below the screen and then grow to fill it.
 *
 * The window is the layer's clip-path. The media inside scales so it always
 * just covers the window, so a small window shows the whole shot rather than
 * a crop. Anything else in the layer isn't scaled, so the window reveals it
 * in place.
 *
 * `startWidth` is the starting window as a share of the screen width; on
 * narrow screens it never starts narrower than `minWidth` px (or the screen).
 *
 * Tween `state` (rise and grow, both 0 → 1) and call `render` on update.
 */
export function videoWindow(
  layer: HTMLElement,
  media: HTMLElement,
  startWidth: number,
  minWidth = 240,
) {
  const state = { rise: 1, grow: 0 };

  const render = () => {
    const vw = layer.clientWidth;
    const vh = layer.clientHeight;
    const w0 = Math.min(vw, Math.max(vw * startWidth, minWidth));
    const h0 = (w0 * 9) / 16;
    const w = w0 + (vw - w0) * state.grow;
    const h = h0 + (vh - h0) * state.grow;

    // Centre of the window: fully below the screen at rise 0, centred at 1
    const cy = vh / 2 + (1 - state.rise) * (vh / 2 + h0 / 2);
    const top = Math.max(0, cy - h / 2);
    const bottom = Math.max(0, vh - cy - h / 2);
    const side = (vw - w) / 2;

    layer.style.clipPath = `inset(${top}px ${side}px ${bottom}px ${side}px)`;
    media.style.transform = `translateY(${cy - vh / 2}px) scale(${Math.max(w / vw, h / vh)})`;
  };

  window.addEventListener("resize", render);
  return { state, render };
}
