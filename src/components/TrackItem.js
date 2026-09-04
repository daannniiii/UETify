import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const TrackItem = ({ track, onPress, isPlaying }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: track.albumArt }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, isPlaying && styles.playingText]} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist}
        </Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color="#b3b3b3" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  playingText: {
    color: '#1DB954', // Spotify Green
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 14,
  },
});
