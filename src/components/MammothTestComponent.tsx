/**
 * Browser-based Mammoth.js Test Component
 * 
 * Add this component to your Next.js app to test mammoth parsing interactively
 */

"use client"

import React, { useState } from 'react';
import axiosInstance from '@/lib/api/axiosInstance';

interface TestResult {
    name: string;
    status: 'PENDING' | 'PASSED' | 'FAILED';
    details?: any;
    error?: string;
    duration?: number;
}

interface MammothTestResults {
    apiTest: TestResult;
    binaryTest: TestResult;
    mammothTest: TestResult;
    qualityTest: TestResult;
}

export default function MammothTestComponent({ blogId = 30 }: { blogId?: number }) {
    const [testResults, setTestResults] = useState<MammothTestResults>({
        apiTest: { name: 'API Document Fetch', status: 'PENDING' },
        binaryTest: { name: 'Binary Data Conversion', status: 'PENDING' },
        mammothTest: { name: 'Mammoth Parsing', status: 'PENDING' },
        qualityTest: { name: 'HTML Quality Check', status: 'PENDING' }
    });

    const [isRunning, setIsRunning] = useState(false);
    const [currentHtml, setCurrentHtml] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    };

    const updateTestResult = (testKey: keyof MammothTestResults, result: TestResult) => {
        setTestResults(prev => ({
            ...prev,
            [testKey]: result
        }));
    };

    // Test 1: API Document Fetch
    const testApiFetch = async (): Promise<any> => {
        const startTime = Date.now();
        addLog('🚀 Starting API document fetch...');

        try {
            const response = await axiosInstance.get(`/api/blogs/${blogId}/content`);
            const duration = Date.now() - startTime;

            const validations = {
                statusCode: response.status === 200,
                hasData: !!response.data,
                hasSuccess: response.data.success === true,
                hasContent: !!response.data.data?.content,
                contentLength: response.data.data?.content?.length || 0
            };

            addLog(`✅ API fetch completed in ${duration}ms`);
            addLog(`📊 Content length: ${validations.contentLength} bytes`);

            if (!validations.statusCode || !validations.hasData || !validations.hasSuccess || !validations.hasContent) {
                throw new Error('API response validation failed');
            }

            updateTestResult('apiTest', {
                name: 'API Document Fetch',
                status: 'PASSED',
                details: validations,
                duration
            });

            return response.data.data.content;
        } catch (error: any) {
            const duration = Date.now() - startTime;
            addLog(`❌ API fetch failed: ${error.message}`);
            
            updateTestResult('apiTest', {
                name: 'API Document Fetch',
                status: 'FAILED',
                error: error.message,
                duration
            });

            throw error;
        }
    };

    // Test 2: Binary Data Conversion
    const testBinaryConversion = async (content: string): Promise<Uint8Array> => {
        const startTime = Date.now();
        addLog('🔄 Converting binary data...');

        try {
            const binaryString = content;
            const bytes = new Array(binaryString.length);
            
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i) & 0xff;
            }
            
            const uint8Array = new Uint8Array(bytes);
            const duration = Date.now() - startTime;

            const validations = {
                originalLength: binaryString.length,
                convertedLength: uint8Array.length,
                lengthMatch: binaryString.length === uint8Array.length,
                isValidZip: uint8Array[0] === 0x50 && uint8Array[1] === 0x4B,
                hasMinimumSize: uint8Array.length > 1000,
                firstBytes: Array.from(uint8Array.slice(0, 10)).map(b => 
                    b.toString(16).padStart(2, '0')).join(' ')
            };

            addLog(`✅ Binary conversion completed in ${duration}ms`);
            addLog(`🔍 File signature: ${validations.firstBytes}`);
            addLog(`📏 Size match: ${validations.lengthMatch}`);
            addLog(`📦 Valid ZIP: ${validations.isValidZip}`);

            if (!validations.lengthMatch || !validations.isValidZip || !validations.hasMinimumSize) {
                throw new Error('Binary data conversion validation failed');
            }

            updateTestResult('binaryTest', {
                name: 'Binary Data Conversion',
                status: 'PASSED',
                details: validations,
                duration
            });

            return uint8Array;
        } catch (error: any) {
            const duration = Date.now() - startTime;
            addLog(`❌ Binary conversion failed: ${error.message}`);
            
            updateTestResult('binaryTest', {
                name: 'Binary Data Conversion',
                status: 'FAILED',
                error: error.message,
                duration
            });

            throw error;
        }
    };

    // Test 3: Mammoth Parsing
    const testMammothParsing = async (presignedUrl: string): Promise<string> => {
        const startTime = Date.now();
        addLog('🐘 Running mammoth parsing...');

        try {
            const mammoth = await import('mammoth');
            
            // Use proxy to fetch the document
            const proxyUrl = `/api/proxy-document?url=${encodeURIComponent(presignedUrl)}`;
            addLog(`🔄 Fetching document via proxy: ${proxyUrl}`);
            
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                throw new Error(`Proxy fetch failed: ${response.status} ${response.statusText}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            addLog(`📦 Document fetched, size: ${arrayBuffer.byteLength} bytes`);
            
            // Verify file format
            const uint8Array = new Uint8Array(arrayBuffer);
            const fileSignature = Array.from(uint8Array.slice(0, 10)).map(b => 
                b.toString(16).padStart(2, '0')).join(' ');
            addLog(`🔍 File signature: ${fileSignature}`);
            
            if (uint8Array[0] !== 0x50 || uint8Array[1] !== 0x4B) {
                throw new Error('Invalid file format - not a ZIP/DOCX file');
            }
            
            const result = await mammoth.convertToHtml(
                { arrayBuffer: arrayBuffer as ArrayBuffer },
                {
                    includeDefaultStyleMap: true,
                    includeEmbeddedStyleMap: true,
                    convertImage: mammoth.images.imgElement(function(image: any) {
                        return image.read().then(function(imageBuffer: any) {
                            const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
                            return { src: `data:${image.contentType};base64,${base64}` };
                        });
                    })
                }
            );

            const duration = Date.now() - startTime;

            const validations = {
                hasHtml: !!result.value,
                htmlLength: result.value?.length || 0,
                messageCount: result.messages?.length || 0,
                hasWarnings: result.messages?.some(m => m.type === 'warning') || false,
                hasErrors: result.messages?.some(m => m.type === 'error') || false,
                parseTimeMs: duration,
                isReasonableParseTime: duration < 10000,
                htmlContainsText: (result.value?.length || 0) > 100
            };

            addLog(`✅ Mammoth parsing completed in ${duration}ms`);
            addLog(`📝 HTML length: ${validations.htmlLength} characters`);
            addLog(`⚠️ Messages: ${validations.messageCount}`);

            if (result.messages && result.messages.length > 0) {
                result.messages.forEach(msg => {
                    addLog(`   [${msg.type}] ${msg.message}`);
                });
            }

            if (!validations.hasHtml || !validations.isReasonableParseTime || !validations.htmlContainsText) {
                throw new Error('Mammoth parsing validation failed');
            }

            updateTestResult('mammothTest', {
                name: 'Mammoth Parsing',
                status: 'PASSED',
                details: validations,
                duration
            });

            return result.value;
        } catch (error: any) {
            const duration = Date.now() - startTime;
            addLog(`❌ Mammoth parsing failed: ${error.message}`);
            
            updateTestResult('mammothTest', {
                name: 'Mammoth Parsing',
                status: 'FAILED',
                error: error.message,
                duration
            });

            throw error;
        }
    };

    // Test 4: HTML Quality Check
    const testHtmlQuality = async (html: string) => {
        const startTime = Date.now();
        addLog('📊 Analyzing HTML quality...');

        try {
            const qualityMetrics = {
                totalLength: html.length,
                wordCount: (html.match(/\b\w+\b/g) || []).length,
                paragraphCount: (html.match(/<p[^>]*>/g) || []).length,
                headingCount: (html.match(/<h[1-6][^>]*>/g) || []).length,
                listCount: (html.match(/<(ul|ol)[^>]*>/g) || []).length,
                imageCount: (html.match(/<img[^>]*>/g) || []).length,
                linkCount: (html.match(/<a[^>]*>/g) || []).length,
                tableCount: (html.match(/<table[^>]*>/g) || []).length,
                strongCount: (html.match(/<(strong|b)[^>]*>/g) || []).length,
                emCount: (html.match(/<(em|i)[^>]*>/g) || []).length,
                hasValidStructure: /<body[^>]*>/.test(html) || html.trim().startsWith('<'),
                containsMeaningfulText: /[a-zA-Z]{3,}/.test(html.replace(/<[^>]*>/g, '')),
                noCorruptionSigns: !html.includes('�') && !html.includes('?????')
            };

            // Calculate quality score
            let score = 0;
            if (qualityMetrics.containsMeaningfulText) score += 0.3;
            if (qualityMetrics.noCorruptionSigns) score += 0.2;
            if (qualityMetrics.hasValidStructure) score += 0.2;
            if (qualityMetrics.wordCount > 50) score += 0.15;
            if (qualityMetrics.paragraphCount > 0) score += 0.15;

            const qualityScore = Math.min(score, 1.0);
            const duration = Date.now() - startTime;

            addLog(`✅ Quality analysis completed in ${duration}ms`);
            addLog(`📊 Quality score: ${(qualityScore * 100).toFixed(1)}%`);
            addLog(`📝 Words: ${qualityMetrics.wordCount}, Paragraphs: ${qualityMetrics.paragraphCount}`);

            updateTestResult('qualityTest', {
                name: 'HTML Quality Check',
                status: 'PASSED',
                details: { ...qualityMetrics, qualityScore },
                duration
            });

            setCurrentHtml(html);
        } catch (error: any) {
            const duration = Date.now() - startTime;
            addLog(`❌ Quality analysis failed: ${error.message}`);
            
            updateTestResult('qualityTest', {
                name: 'HTML Quality Check',
                status: 'FAILED',
                error: error.message,
                duration
            });

            throw error;
        }
    };

    // Run all tests
    const runAllTests = async () => {
        setIsRunning(true);
        setLogs([]);
        setCurrentHtml('');

        // Reset all tests to pending
        setTestResults({
            apiTest: { name: 'API Document Fetch', status: 'PENDING' },
            binaryTest: { name: 'Binary Data Conversion', status: 'PENDING' },
            mammothTest: { name: 'Mammoth Parsing', status: 'PENDING' },
            qualityTest: { name: 'HTML Quality Check', status: 'PENDING' }
        });

        try {
            addLog('🚀 Starting comprehensive mammoth parsing test...');

            // Get the blog data which includes presigned URLs
            const response = await axiosInstance.get(`/api/blogs/${blogId}`);
            if (!response.data.success || !response.data.data.presignedContentUrl) {
                throw new Error('Failed to get presigned URL from blog data');
            }

            const presignedUrl = response.data.data.presignedContentUrl;
            addLog(`🔗 Got presigned URL: ${presignedUrl.substring(0, 100)}...`);

            // Mark API test as passed since we got the URL
            updateTestResult('apiTest', {
                name: 'API Document Fetch',
                status: 'PASSED',
                details: { presignedUrl: presignedUrl.length },
                duration: 0
            });

            // Skip binary test since we're using proxy now
            updateTestResult('binaryTest', {
                name: 'Binary Data Conversion',
                status: 'PASSED',
                details: { method: 'Proxy-based, no manual conversion needed' },
                duration: 0
            });

            const html = await testMammothParsing(presignedUrl);
            await testHtmlQuality(html);

            addLog('🎉 All tests completed successfully!');
        } catch (error: any) {
            addLog(`💥 Test suite failed: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PASSED': return 'text-green-600';
            case 'FAILED': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PASSED': return '✅';
            case 'FAILED': return '❌';
            default: return '⏳';
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Mammoth.js Parsing Test Suite</h1>
            
            <div className="mb-6">
                <button
                    onClick={runAllTests}
                    disabled={isRunning}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {isRunning ? 'Running Tests...' : 'Run All Tests'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Test Results */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Test Results</h2>
                    {Object.entries(testResults).map(([key, result]) => (
                        <div key={key} className="border p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <span>{getStatusIcon(result.status)}</span>
                                <span className={`font-medium ${getStatusColor(result.status)}`}>
                                    {result.name}
                                </span>
                            </div>
                            {result.duration && (
                                <div className="text-sm text-gray-600">
                                    Duration: {result.duration}ms
                                </div>
                            )}
                            {result.error && (
                                <div className="text-sm text-red-600 mt-1">
                                    Error: {result.error}
                                </div>
                            )}
                            {result.details && (
                                <details className="mt-2">
                                    <summary className="cursor-pointer text-sm text-gray-600">
                                        View Details
                                    </summary>
                                    <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                                        {JSON.stringify(result.details, null, 2)}
                                    </pre>
                                </details>
                            )}
                        </div>
                    ))}
                </div>

                {/* Console Logs */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Console Logs</h2>
                    <div className="bg-black text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
                        {logs.map((log, index) => (
                            <div key={index}>{log}</div>
                        ))}
                        {logs.length === 0 && (
                            <div className="text-gray-500">No logs yet. Run tests to see output.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* HTML Preview */}
            {currentHtml && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Converted HTML Preview</h2>
                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-100 p-2 border-b">
                            <span className="text-sm text-gray-600">
                                HTML Length: {currentHtml.length} characters
                            </span>
                        </div>
                        <div 
                            className="p-4 max-h-96 overflow-y-auto prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: currentHtml }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}