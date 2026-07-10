const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputVideo = path.join(__dirname, 'video of the banner.mp4');
const outputDir = path.join(__dirname, 'public', 'images', 'banner_seq');

// Ensure output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const DURATION_SECONDS = 8;
const FPS = 24; // 24 frames per second is a good smooth cinematic rate

// Calculate total frames to know which one is the "last" frame
const TOTAL_FRAMES = DURATION_SECONDS * FPS; // 96 frames

console.log(`Extracting first ${DURATION_SECONDS} seconds at ${FPS} fps...`);

ffmpeg(inputVideo)
  .setDuration(DURATION_SECONDS)
  .outputOptions([
    `-vf fps=${FPS},scale=-1:1080`,
    '-qscale:v 4' // Balanced quality/size JPEG
  ])
  .output(path.join(outputDir, '%03d.jpg'))
  .on('end', () => {
    console.log('JPEG extraction complete.');
    console.log('Extracting the very last frame as a lossless PNG...');
    
    // Now extract the very last frame as a PNG
    ffmpeg(inputVideo)
      .setStartTime(DURATION_SECONDS - (1 / FPS))
      .frames(1)
      .output(path.join(outputDir, `${TOTAL_FRAMES.toString().padStart(3, '0')}.png`))
      .on('end', () => {
        console.log('Final PNG frame extracted successfully!');
      })
      .on('error', (err) => {
        console.error('Error extracting PNG:', err);
      })
      .run();
  })
  .on('error', (err) => {
    console.error('Error extracting JPEGs:', err);
  })
  .run();
