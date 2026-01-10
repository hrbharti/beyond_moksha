import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const documentUrl = searchParams.get('url');
        
        if (!documentUrl) {
            return NextResponse.json(
                { error: 'Missing URL parameter' },
                { status: 400 }
            );
        }

        // Validate that it's an S3 URL
        if (!documentUrl.includes('s3.ap-south-1.amazonaws.com') && 
            !documentUrl.includes('.s3.amazonaws.com')) {
            return NextResponse.json(
                { error: 'Invalid URL - only S3 URLs are allowed' },
                { status: 400 }
            );
        }

        console.log('🔄 Proxying document request:', documentUrl);

        // Fetch the document from S3
        const response = await fetch(documentUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Next.js Document Proxy/1.0'
            }
        });

        if (!response.ok) {
            console.error('❌ Failed to fetch document:', response.status, response.statusText);
            return NextResponse.json(
                { error: `Failed to fetch document: ${response.status} ${response.statusText}` },
                { status: response.status }
            );
        }

        // Get the document as binary data
        const documentBuffer = await response.arrayBuffer();
        
        console.log('✅ Document fetched successfully, size:', documentBuffer.byteLength, 'bytes');

        // Verify it's a valid Word document (ZIP signature)
        const uint8Array = new Uint8Array(documentBuffer);
        if (uint8Array.length < 4 || uint8Array[0] !== 0x50 || uint8Array[1] !== 0x4B) {
            console.error('❌ Invalid document format - not a ZIP/DOCX file');
            return NextResponse.json(
                { error: 'Invalid document format' },
                { status: 400 }
            );
        }

        // Return the binary data with appropriate headers
        return new NextResponse(documentBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Length': documentBuffer.byteLength.toString(),
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });

    } catch (error) {
        console.error('💥 Proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}