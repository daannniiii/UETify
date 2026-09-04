import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export const AlbumCard = ({ playlist, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: playlist.imageUri }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {playlist.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 16,
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
