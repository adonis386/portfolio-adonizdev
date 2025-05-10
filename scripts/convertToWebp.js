import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertToWebp(directory) {
  try {
    // Leer todos los archivos del directorio
    const files = await fs.readdir(directory);
    
    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg'].includes(ext);
    });

    // Convertir cada imagen a WebP
    for (const file of imageFiles) {
      const inputPath = path.join(directory, file);
      const outputPath = path.join(directory, `${path.parse(file).name}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: 80 }) // Ajusta la calidad según necesites (0-100)
          .toFile(outputPath);

        console.log(`✅ Convertido: ${file} -> ${path.parse(file).name}.webp`);
      } catch (error) {
        console.error(`❌ Error al convertir ${file}:`, error.message);
      }
    }

    console.log('\n🎉 ¡Conversión completada!');
  } catch (error) {
    console.error('Error al leer el directorio:', error);
  }
}

// Ruta al directorio public
const publicDir = path.join(__dirname, '..', 'public');
convertToWebp(publicDir);
