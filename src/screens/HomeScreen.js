import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { playlists, tracks } from '../data/mockData';
import { AlbumCard } from '../components/AlbumCard';
import { TrackItem } from '../components/TrackItem';
import { usePlayerStore } from '../store/playerStore';

export const HomeScreen = () => {
  const { setQueue, currentTrack } = usePlayerStore();

  const handlePlayTrack = (trackIndex) => {
    setQueue(tracks, trackIndex);
  };

  const renderGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{renderGreeting()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Made for you</Text>
          <FlatList
            data={playlists}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AlbumCard playlist={item} onPress={() => {}} />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          {tracks.map((track, index) => (
            <TrackItem 
              key={track.id} 
              track={track} 
              onPress={() => handlePlayTrack(index)} 
              isPlaying={currentTrack?.id === track.id}
            />
          ))}
        </View>
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
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    paddingBottom: 60,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 32,
    paddingLeft: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
