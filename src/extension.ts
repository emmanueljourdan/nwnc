import {
  AudioClip,
  initialize,
  type ActivationContext,
} from "@ableton-extensions/sdk";

export function activate(activation: ActivationContext) {
  const context = initialize(activation, "1.0.0");

  context.withinTransaction(() => {
    // iterate through every tracks,
    // find the AudioClips in session and arrangement
    // disable Warp
    const tracks = context.application.song.tracks.forEach((track) => {
      // Session's clips
      track.clipSlots.forEach((clipSlot) => {
        const clip = clipSlot.clip;
        if (clip instanceof AudioClip) {
          clip.warping = false;
          console.log(`Disabled warping: ${clip?.name}`);
        }
      });

      // Arrangement's Clips
      track.arrangementClips.forEach((arrangementClip) => {
        const clip = arrangementClip;
        if (clip instanceof AudioClip) {
          clip.warping = false;
          console.log(`Disabled warping: ${clip?.name}`);
        }
      });
    });
  });
}
