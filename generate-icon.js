const { Jimp } = require('jimp');
const fs = require('fs');

async function createIcon() {
  try {
    const image = await Jimp.read('public/images/about_coverImage.JPG');
    
    // Resize to a square 256x256 and convert to grayscale
    image.cover({ w: 256, h: 256 }).greyscale();
    
    // Write to src/app/icon.png
    await image.write('src/app/icon.png');
    console.log('Successfully created grayscale icon.png');
  } catch (err) {
    console.error('Error creating icon:', err);
  }
}

createIcon();
