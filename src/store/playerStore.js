import { create } from 'zustand';
import { Audio } from 'expo-av';

export const usePlayerStore = create((set, get) => ({
  sound: null,
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
    const { sound: currentSound } = get();
    
    if (currentSound) {
      await currentSound.unloadAsync();
    }

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.audioUri },
        { shouldPlay: true },
        get().onPlaybackStatusUpdate
      );

      set({ sound, currentTrack: track, isPlaying: true });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  },

  togglePlayPause: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
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
    const { sound } = get();
    if (sound) {
      await sound.setPositionAsync(positionMillis);
    }
  },

  onPlaybackStatusUpdate: (status) => {
    if (status.isLoaded) {
      set({
        position: status.positionMillis,
        duration: status.durationMillis,
        isPlaying: status.isPlaying,
      });

      if (status.didJustFinish) {
        get().nextTrack();
      }
    }
  },
}));
