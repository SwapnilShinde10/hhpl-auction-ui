// Upload service - converts images to base64 data URLs
// This allows photos to be stored directly in the database as valid URLs

/**
 * Convert file to base64 data URL
 * @param {File} file - The file to convert
 * @returns {Promise<string>} A base64 data URL
 */
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Compress and resize image
 * @param {string} base64 - Base64 image data
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Promise<string>} Compressed base64 data URL
 */
const compressImage = (base64, maxWidth = 400, maxHeight = 400) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      
      // Create canvas and compress
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get compressed base64 (quality 0.7 = 70%)
      const compressed = canvas.toDataURL('image/jpeg', 0.7);
      resolve(compressed);
    };
    
    img.onerror = (error) => reject(error);
  });
};

/**
 * Upload file and return a valid image URL (base64 data URL)
 * @param {File} file - The file to upload
 * @param {string} folder - The folder path (unused for base64)
 * @returns {Promise<string>} A base64 data URL
 */
export const uploadFile = async (file, folder = 'players') => {
  if (!file) {
    throw new Error('No file provided');
  }

  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    console.log('Converting image to base64...');
    
    // Convert to base64
    const base64 = await convertToBase64(file);
    
    // Compress and resize
    const compressed = await compressImage(base64);
    
    console.log('Image converted successfully. Size:', Math.round(compressed.length / 1024), 'KB');
    
    return compressed;
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error(error.message || 'Failed to upload file. Please try again.');
  }
};

/**
 * Upload player photo
 * @param {File} file - The photo file
 * @returns {Promise<string>} The download URL
 */
export const uploadPlayerPhoto = async (file) => {
  return await uploadFile(file, 'players');
};

/**
 * Upload team logo
 * @param {File} file - The logo file
 * @returns {Promise<string>} The download URL
 */
export const uploadTeamLogo = async (file) => {
  return await uploadFile(file, 'teams');
};
