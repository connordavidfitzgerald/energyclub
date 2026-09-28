/**
 * Every video on the page is a cut of this one Mux asset, using Mux instant
 * clipping. Mux's players accept query params after the playback ID and pass
 * them to the stream URL, so a clip is just a playback ID with its times.
 */
export const MUX_ID = "3t5DLcf011hhNwytrB6wRzwKmomYyI800LLEkrllFisZU";

/* [start, end] in seconds of the full 65.5s reel. Picked to match the
   storyboard stills: desert build, the Solar Station at dusk, the night crowd. */
export const CLIPS = {
  intro: [0, 21],
  sun: [21, 33],
  night: [45, 54],
} as const;

export type Clip = keyof typeof CLIPS;

export const clipPlaybackId = (clip: Clip) => {
  const [start, end] = CLIPS[clip];
  return `${MUX_ID}?asset_start_time=${start}&asset_end_time=${end}`;
};

// Thumbnail times are in the full asset, so the clip's start is its first frame
export const clipPoster = (clip: Clip) =>
  `https://image.mux.com/${MUX_ID}/thumbnail.webp?time=${CLIPS[clip][0]}&width=1920`;
