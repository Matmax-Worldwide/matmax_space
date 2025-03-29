import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the image file from the public directory
    const imagePath = path.join(process.cwd(), 'public', 'twitter-image.png');
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving twitter image:', error);
    
    // Return fallback response
    return new NextResponse(null, {
      status: 404,
    });
  }
}
