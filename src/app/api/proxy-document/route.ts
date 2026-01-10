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

        // PRODUCTION: Strict URL validation for security
        const allowedDomains = [
            's3.ap-south-1.amazonaws.com',
            'www.beyondmoksha.com.s3.amazonaws.com',
            'beyondmoksha.s3.amazonaws.com'
        ];
        
        const isValidDomain = allowedDomains.some(domain => 
            documentUrl.includes(domain)
        );
        
        if (!isValidDomain) {
            console.warn('🚨 Blocked unauthorized domain:', documentUrl);
            return NextResponse.json(
                { error: 'Unauthorized domain' },
                { status: 403 }
            );
        }

        // PRODUCTION: Rate limiting check (implement if needed)
        // Add rate limiting logic here

        console.log('🔄 Proxying document request:', documentUrl.substring(0, 100) + '...');

        // Fetch the document from S3
        const response = await fetch(documentUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'BeyondMoksha-Proxy/1.0',
                // PRODUCTION: Add any additional headers required
            },
            // PRODUCTION: Add timeout
            signal: AbortSignal.timeout(30000) // 30 second timeout
        });

        if (!response.ok) {
            console.error('❌ Failed to fetch document:', response.status, response.statusText);
            return NextResponse.json(
                { error: `Failed to fetch document: ${response.status}` },
                { status: response.status >= 500 ? 502 : response.status }
            );
        }

        // Get the document as binary data
        const documentBuffer = await response.arrayBuffer();
        
        // PRODUCTION: File size validation
        const maxSize = 50 * 1024 * 1024; // 50MB limit
        if (documentBuffer.byteLength > maxSize) {
            console.error('❌ File too large:', documentBuffer.byteLength);
            return NextResponse.json(
                { error: 'File too large' },
                { status: 413 }
            );
        }
        
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

        // PRODUCTION: Security headers
        return new NextResponse(documentBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Length': documentBuffer.byteLength.toString(),
                'Cache-Control': 'public, max-age=3600, s-maxage=3600', // CDN cache
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'Content-Security-Policy': "default-src 'none'",
                // PRODUCTION: CORS for your domain only
                'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
                    ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com')
                    : '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });

    } catch (error) {
        console.error('💥 Proxy error:', error);
        
        // PRODUCTION: Don't expose internal error details
        const isTimeout = error instanceof Error && error.name === 'TimeoutError';
        const errorMessage = process.env.NODE_ENV === 'production' 
            ? (isTimeout ? 'Request timeout' : 'Internal server error')
            : error instanceof Error ? error.message : 'Internal server error';
            
        return NextResponse.json(
            { error: errorMessage },
            { status: isTimeout ? 408 : 500 }
        );
    }
}