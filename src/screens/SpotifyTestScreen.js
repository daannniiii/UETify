import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function SpotifyTestScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');

  // Automatically fetch token on component mount
  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    // Note: To use the secret inside React Native, it must be prefixed with EXPO_PUBLIC_
    // In production, this entire process should be moved to a backend server.
    const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      setError('Missing API credentials in .env file (ensure they have EXPO_PUBLIC_ prefix)');
      return;
    }

    try {
      // Base64 encode the client ID and secret
      // React Native doesn't have btoa() built-in by default, so we can use a small polyfill or fetch trick
      // However, fetch headers can take a base64 encoded string. We'll use a standard base64 encoding approach.
      const credentials = `${clientId}:${clientSecret}`;
      const encodedCredentials = require('buffer').Buffer.from(credentials).toString('base64');

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${encodedCredentials}`
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) throw new Error('Authentication failed');
      const data = await response.json();
      setAccessToken(data.access_token);
      setError('');
    } catch (err) {
      setError('Failed to get Access Token: ' + err.message);
    }
  };

  const searchSpotify = async () => {
    if (!query || !accessToken) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setResults(data.tracks.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTrack = ({ item }) => (
    <View style={styles.trackCard}>
      <Image 
        source={{ uri: item.album.images[0]?.url || 'https://via.placeholder.com/64' }} 
        style={styles.trackImage} 
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.trackArtist}>{item.artists.map(a => a.name).join(', ')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Spotify API Search</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a song..."
          placeholderTextColor="#B3B3B3"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchSpotify}
        />
        <TouchableOpacity style={styles.button} onPress={searchSpotify} disabled={!accessToken}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderTrack}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#282828',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  trackCard: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  trackArtist: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  errorText: {
    color: '#e22134',
    marginBottom: 15,
  }
});
