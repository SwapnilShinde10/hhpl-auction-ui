// Utility script to fix broken photo URLs in the database
import { getAllPlayers, updatePlayer } from '../services/playerService.js';

/**
 * Generate a placeholder photo URL for a player
 */
const generatePlaceholderPhoto = (playerName) => {
  const initials = playerName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=400&background=random&color=fff&bold=true&length=2`;
};

/**
 * Fix all players with broken Firebase Storage URLs
 */
export const fixBrokenPlayerPhotos = async () => {
  try {
    console.log('Fetching all players...');
    const response = await getAllPlayers();
    const players = response.data || response;
    
    const brokenPlayers = players.filter(player => 
      player.photo && player.photo.includes('firebasestorage.googleapis.com')
    );
    
    console.log(`Found ${brokenPlayers.length} players with broken photo URLs`);
    
    const results = [];
    for (const player of brokenPlayers) {
      try {
        const newPhotoUrl = generatePlaceholderPhoto(player.name);
        console.log(`Updating ${player.name}: ${newPhotoUrl}`);
        
        await updatePlayer(player.id, { photo: newPhotoUrl });
        results.push({ id: player.id, name: player.name, status: 'success' });
      } catch (error) {
        results.push({ id: player.id, name: player.name, status: 'failed', error: error.message });
      }
    }
    
    console.log('Update complete:', results);
    return results;
  } catch (error) {
    console.error('Error fixing player photos:', error);
    throw error;
  }
};

// If running directly in console:
// import { fixBrokenPlayerPhotos } from './utils/fixPlayerPhotos.js';
// fixBrokenPlayerPhotos().then(results => console.log('Done:', results));
