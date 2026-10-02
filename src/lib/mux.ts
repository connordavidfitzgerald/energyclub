/**
 * Each video on the page is its own Mux asset, cut from the reel: desert
 * build, the Solar Station at dusk, the night crowd.
 */
export const CLIPS = {
    intro: "K02hLypI6adHKU9EVV8St6xZL1wue5jETDLWZ34hO01cc",
    sun: "jWDteflW2KJxFTDZ3HWzX8WQdOlD9WAjCt2n9QBS8zM",
    night: "HpcO029B4uDgikSfwmNDdN8iPqjbKTKSTCQd27pDw9Q00",
} as const;

export type Clip = keyof typeof CLIPS;

export const clipPlaybackId = (clip: Clip) => CLIPS[clip];

// Each asset starts at its clip's first frame
export const clipPoster = (clip: Clip) =>
    `https://image.mux.com/${CLIPS[clip]}/thumbnail.webp?time=0&width=1920`;
