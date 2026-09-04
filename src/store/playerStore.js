import { create } from 'zustand';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

export const usePlayerStore = create((set, get) => ({
  player: null,
  currentTrack: null,
  isPlaying: false,
  position: 0,
  duration: 0,
  queue: [],
  queueIndex: 0,

  setQueue: (tracks, startIndex = 0) => {
    set({ queue: tracks, queueIndex: startIndex });
    get().playTrack(tracks[startIndex]);
  },

  playTrack: async (track) => {
    let { player } = get();
    
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
      });

      if (!player) {
        player = createAudioPlayer(track.audioUri);
        // We simulate basic event listening if playbackStatusUpdate isn't available
        // expo-audio uses player.addListener('playbackStatusUpdate', ...)
        player.addListener('playbackStatusUpdate', (status) => {
          set({
            position: status.currentTime * 1000,
            duration: status.duration * 1000,
            isPlaying: status.playing,
          });
          if (status.didJustFinish) {
             get().nextTrack();
          }
        });
        set({ player });
      } else {
        player.replace(track.audioUri);
      }
      
      player.play();
      set({ currentTrack: track, isPlaying: true });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  },

  togglePlayPause: async () => {
    const { player, isPlaying } = get();
    if (!player) return;

    if (isPlaying) {
      player.pause();
      set({ isPlaying: false });
    } else {
      player.play();
      set({ isPlaying: true });
    }
  },

  nextTrack: () => {
    const { queue, queueIndex } = get();
    if (queueIndex < queue.length - 1) {
      const newIndex = queueIndex + 1;
      set({ queueIndex: newIndex });
      get().playTrack(queue[newIndex]);
    }
  },

  prevTrack: () => {
    const { queue, queueIndex } = get();
    if (queueIndex > 0) {
      const newIndex = queueIndex - 1;
      set({ queueIndex: newIndex });
      get().playTrack(queue[newIndex]);
    }
  },

  seekTo: async (positionMillis) => {
    const { player } = get();
    if (player) {
      await player.seekTo(positionMillis / 1000);
    }
  },
}));
