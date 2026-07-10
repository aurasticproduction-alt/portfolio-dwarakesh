import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
// @ts-ignore
import heicConvert from 'heic-convert'

const BUCKET_URL = 'https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery'

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path')
  if (!path) return new NextResponse('Missing path', { status: 400 })

  const url = `${BUCKET_URL}/${path}`
  const ext = path.split('.').pop()?.toLowerCase()

  try {
    const res = await fetch(url)
    if (!res.ok) return new NextResponse('Failed to fetch image', { status: 502 })

    const buffer = Buffer.from(await res.arrayBuffer())
    let jpegBuffer: Buffer

    if (ext === 'heic' || ext === 'heif') {
      // Use heic-convert for HEIC files
      const outputBuffer = await heicConvert({
        buffer,
        format: 'JPEG',
        quality: 0.88,
      })
      jpegBuffer = Buffer.from(outputBuffer)
    } else {
      // Use sharp for everything else (ARW, TIFF, etc.)
      jpegBuffer = await sharp(buffer)
        .rotate()
        .jpeg({ quality: 88 })
        .toBuffer()
    }

    return new NextResponse(jpegBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('Image convert error:', err)
    return new NextResponse('Conversion failed', { status: 500 })
  }
}
