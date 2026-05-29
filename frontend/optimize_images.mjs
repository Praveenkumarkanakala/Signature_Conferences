import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

async function main() {
  const srcDir = path.resolve('src');
  
  // Find all images over 1MB
  const allImages = await glob('**/*.{png,jpg,jpeg}', { cwd: srcDir, absolute: true });
  const largeImages = [];
  
  for (const file of allImages) {
    const stats = await fs.stat(file);
    if (stats.size > 1000000) { // > 1MB
      largeImages.push(file);
    }
  }

  console.log(`Found ${largeImages.length} images larger than 1MB.`);

  for (const imgPath of largeImages) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.slice(0, -ext.length) + '.webp';
    
    // Convert to webp
    await sharp(imgPath)
      .webp({ quality: 80 })
      .toFile(webpPath);
      
    console.log(`Converted: ${path.basename(imgPath)} -> ${path.basename(webpPath)}`);

    // Now find and replace references in codebase
    // The reference could be just the filename like "EuroHimg3.png"
    const filename = path.basename(imgPath);
    const webpFilename = path.basename(webpPath);
    
    const allCodeFiles = await glob('**/*.{jsx,js,css}', { cwd: srcDir, absolute: true });
    
    for (const codeFile of allCodeFiles) {
      const content = await fs.readFile(codeFile, 'utf8');
      if (content.includes(filename)) {
        const newContent = content.replaceAll(filename, webpFilename);
        await fs.writeFile(codeFile, newContent, 'utf8');
        console.log(`  Updated references in: ${path.basename(codeFile)}`);
      }
    }
  }

  console.log('Image optimization complete.');
}

main().catch(console.error);
