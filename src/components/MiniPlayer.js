import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/playerStore';
import { useNavigation } from '@react-navigation/native';

export const MiniPlayer = () => {
  const { currentTrack, isPlaying, togglePlayPause, position, duration } = usePlayerStore();
  const navigation = useNavigation();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('PlayerModal')}
    >
      <View style={styles.content}>
        <Image source={{ uri: currentTrack.albumArt }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333', // Slightly lighter than background for contrast
    position: 'absolute',
    bottom: 50, // Just above tab bar
    left: 8,
    right: 8,
    borderRadius: 6,
    overflow: 'hidden',
    zIndex: 10, // Ensure it sits on top
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  button: {
    padding: 10,
  },
  progressBackground: {
    height: 2,
    backgroundColor: '#555',
    width: '100%',
  },
  progressFill: {
    height: 2,
    backgroundColor: '#fff',
  }
});
