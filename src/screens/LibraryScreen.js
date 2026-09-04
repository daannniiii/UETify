import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { playlists } from '../data/mockData';
import { TrackItem } from '../components/TrackItem';

export const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>U</Text>
          </View>
          <Text style={styles.title}>Your Library</Text>
          <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
          <Ionicons name="add" size={30} color="#fff" />
        </View>
      </View>
      
      <ScrollView style={styles.container}>
        {playlists.map((playlist) => (
          <TrackItem 
            key={playlist.id}
            track={{
              title: playlist.title,
              artist: 'Playlist • UETify',
              albumArt: playlist.imageUri
            }}
            onPress={() => {}}
          />
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E13300',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    marginRight: 16,
  },
  container: {
    flex: 1,
  }
});
