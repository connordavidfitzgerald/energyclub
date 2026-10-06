/**
 * Each video on the page is its own Mux asset, cut from the reel: desert
 * build, the Solar Station at dusk, the night crowd; plus the client's
 * Solarpunks film.
 */
export const CLIPS = {
    intro: "K02hLypI6adHKU9EVV8St6xZL1wue5jETDLWZ34hO01cc",
    sun: "W301Q1HnbEJZ4BgYiswfZOqkYPyA1KW9wCAoFX4sl3is",
    night: "P73O01dbyul5BuyxezearLow87Qy6k01NDy8eGKUKE02DQ",
    solarpunks: "4LVDGEXex5C89ED9p59BWSWLJjiTxXyTP35QvYCvi38",
} as const;

export type Clip = keyof typeof CLIPS;

export const clipPlaybackId = (clip: Clip) => CLIPS[clip];

// Each asset starts at its clip's first frame
export const clipPoster = (clip: Clip) =>
    `https://image.mux.com/${CLIPS[clip]}/thumbnail.webp?time=0&width=1920`;
