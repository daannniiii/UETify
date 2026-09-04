import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { genres } from '../data/mockData';

export const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#121212" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Artists, songs, or podcasts"
              placeholderTextColor="#555"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.grid}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[styles.genreCard, { backgroundColor: genre.color }]}
              >
                <Text style={styles.genreTitle}>{genre.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreCard: {
    width: '48%',
    height: 100,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  genreTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
