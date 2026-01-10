#!/usr/bin/env node

/**
 * Mammoth.js Word Document Parsing Test Script
 * 
 * This script comprehensively tests the mammoth.js parsing functionality
 * to ensure Word documents are being converted correctly and reliably.
 */

const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

// Configuration
const CONFIG = {
    API_BASE_URL: 'http://localhost:8000',
    BLOG_ID: 30,
    OUTPUT_DIR: path.join(__dirname, 'test-outputs'),
    ENABLE_DETAILED_LOGS: true
};

// Test utilities
class MammothTester {
    constructor() {
        this.testResults = {
            total: 0,
            passed: 0,
            failed: 0,
            details: []
        };
        
        // Ensure output directory exists
        if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
            fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
        }
    }

    log(message, level = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = {
            info: '📋',
            success: '✅',
            error: '❌',
            warning: '⚠️',
            debug: '🔍'
        }[level] || 'ℹ️';
        
        console.log(`${prefix} [${timestamp}] ${message}`);
        
        if (CONFIG.ENABLE_DETAILED_LOGS) {
            fs.appendFileSync(
                path.join(CONFIG.OUTPUT_DIR, 'test-log.txt'),
                `${timestamp} [${level.toUpperCase()}] ${message}\n`
            );
        }
    }

    async runTest(testName, testFunction) {
        this.testResults.total++;
        this.log(`🧪 Running test: ${testName}`, 'info');
        
        try {
            const result = await testFunction();
            this.testResults.passed++;
            this.testResults.details.push({
                name: testName,
                status: 'PASSED',
                result: result
            });
            this.log(`✅ Test passed: ${testName}`, 'success');
            return result;
        } catch (error) {
            this.testResults.failed++;
            this.testResults.details.push({
                name: testName,
                status: 'FAILED',
                error: error.message,
                stack: error.stack
            });
            this.log(`❌ Test failed: ${testName} - ${error.message}`, 'error');
            throw error;
        }
    }

    // Test 1: Fetch document from API
    async testApiDocumentFetch() {
        return await this.runTest('API Document Fetch', async () => {
            const response = await axios.get(`${CONFIG.API_BASE_URL}/api/blogs/${CONFIG.BLOG_ID}/content`);
            
            const validations = {
                statusCode: response.status === 200,
                hasData: !!response.data,
                hasSuccess: response.data.success === true,
                hasContent: !!response.data.data?.content,
                contentLength: response.data.data?.content?.length || 0
            };

            this.log(`📊 API Response validations:`, 'debug');
            Object.entries(validations).forEach(([key, value]) => {
                this.log(`   ${key}: ${value}`, 'debug');
            });

            if (!validations.statusCode || !validations.hasData || !validations.hasSuccess || !validations.hasContent) {
                throw new Error('API response validation failed');
            }

            return {
                contentLength: validations.contentLength,
                response: response.data
            };
        });
    }

    // Test 2: Binary data conversion
    async testBinaryDataConversion(content) {
        return await this.runTest('Binary Data Conversion', async () => {
            const binaryString = content;
            const bytes = new Array(binaryString.length);
            
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i) & 0xff;
            }
            
            const uint8Array = new Uint8Array(bytes);
            
            const validations = {
                originalLength: binaryString.length,
                convertedLength: uint8Array.length,
                lengthMatch: binaryString.length === uint8Array.length,
                isValidZip: uint8Array[0] === 0x50 && uint8Array[1] === 0x4B, // PK signature
                hasMinimumSize: uint8Array.length > 1000, // Word docs should be at least 1KB
                checksum: crypto.createHash('md5').update(uint8Array).digest('hex')
            };

            this.log(`🔢 Binary conversion validations:`, 'debug');
            Object.entries(validations).forEach(([key, value]) => {
                this.log(`   ${key}: ${value}`, 'debug');
            });

            if (!validations.lengthMatch || !validations.isValidZip || !validations.hasMinimumSize) {
                throw new Error('Binary data conversion validation failed');
            }

            // Save binary data for inspection
            fs.writeFileSync(
                path.join(CONFIG.OUTPUT_DIR, 'converted-document.docx'),
                uint8Array
            );

            return {
                uint8Array,
                validations
            };
        });
    }

    // Test 3: Mammoth parsing capabilities
    async testMammothParsing(uint8Array) {
        return await this.runTest('Mammoth Parsing', async () => {
            const startTime = Date.now();
            
            const result = await mammoth.convertToHtml(
                { arrayBuffer: uint8Array.buffer },
                {
                    includeDefaultStyleMap: true,
                    includeEmbeddedStyleMap: true,
                    convertImage: mammoth.images.imgElement(function(image) {
                        return image.read().then(function(imageBuffer) {
                            const base64 = Buffer.from(imageBuffer).toString('base64');
                            return { src: `data:${image.contentType};base64,${base64}` };
                        });
                    })
                }
            );

            const endTime = Date.now();
            const parseTime = endTime - startTime;

            const validations = {
                hasHtml: !!result.value,
                htmlLength: result.value?.length || 0,
                hasMessages: Array.isArray(result.messages),
                messageCount: result.messages?.length || 0,
                hasWarnings: result.messages?.some(m => m.type === 'warning') || false,
                hasErrors: result.messages?.some(m => m.type === 'error') || false,
                parseTimeMs: parseTime,
                isReasonableParseTime: parseTime < 10000, // Should parse in under 10 seconds
                htmlContainsText: (result.value?.length || 0) > 100 // Should have substantial content
            };

            this.log(`🔤 Mammoth parsing validations:`, 'debug');
            Object.entries(validations).forEach(([key, value]) => {
                this.log(`   ${key}: ${value}`, 'debug');
            });

            // Log messages for debugging
            if (result.messages && result.messages.length > 0) {
                this.log(`📝 Mammoth messages:`, 'debug');
                result.messages.forEach(msg => {
                    this.log(`   [${msg.type}] ${msg.message}`, 'debug');
                });
            }

            // Save HTML output for inspection
            fs.writeFileSync(
                path.join(CONFIG.OUTPUT_DIR, 'converted-output.html'),
                result.value || ''
            );

            if (!validations.hasHtml || !validations.isReasonableParseTime || !validations.htmlContainsText) {
                throw new Error('Mammoth parsing validation failed');
            }

            return {
                result,
                validations,
                parseTimeMs: parseTime
            };
        });
    }

    // Test 4: HTML content quality analysis
    async testHtmlQuality(html) {
        return await this.runTest('HTML Content Quality', async () => {
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

            this.log(`📊 HTML Quality Metrics:`, 'debug');
            Object.entries(qualityMetrics).forEach(([key, value]) => {
                this.log(`   ${key}: ${value}`, 'debug');
            });

            // Generate quality score
            const qualityScore = this.calculateQualityScore(qualityMetrics);
            qualityMetrics.qualityScore = qualityScore;

            if (qualityScore < 0.7) { // 70% quality threshold
                this.log(`⚠️ Low quality score: ${qualityScore.toFixed(2)}`, 'warning');
            }

            // Create formatted HTML file with analysis
            const analysisHtml = this.generateAnalysisReport(html, qualityMetrics);
            fs.writeFileSync(
                path.join(CONFIG.OUTPUT_DIR, 'quality-analysis.html'),
                analysisHtml
            );

            return qualityMetrics;
        });
    }

    // Test 5: Performance and memory usage
    async testPerformance() {
        return await this.runTest('Performance Analysis', async () => {
            const memBefore = process.memoryUsage();
            const timeBefore = Date.now();

            // Run the full conversion pipeline
            const apiResult = await this.testApiDocumentFetch();
            const binaryResult = await this.testBinaryDataConversion(apiResult.response.data.content);
            const mammothResult = await this.testMammothParsing(binaryResult.uint8Array);

            const timeAfter = Date.now();
            const memAfter = process.memoryUsage();

            const performance = {
                totalTimeMs: timeAfter - timeBefore,
                memoryUsedMB: (memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024,
                peakMemoryMB: memAfter.heapUsed / 1024 / 1024,
                isPerformant: (timeAfter - timeBefore) < 5000, // Under 5 seconds
                memoryEfficient: (memAfter.heapUsed - memBefore.heapUsed) < 50 * 1024 * 1024 // Under 50MB
            };

            this.log(`⚡ Performance Metrics:`, 'debug');
            Object.entries(performance).forEach(([key, value]) => {
                this.log(`   ${key}: ${value}`, 'debug');
            });

            return performance;
        });
    }

    calculateQualityScore(metrics) {
        let score = 0;
        
        // Basic content checks (40% weight)
        if (metrics.containsMeaningfulText) score += 0.2;
        if (metrics.noCorruptionSigns) score += 0.2;
        
        // Structure checks (30% weight)
        if (metrics.hasValidStructure) score += 0.15;
        if (metrics.paragraphCount > 0) score += 0.15;
        
        // Content richness (30% weight)
        if (metrics.wordCount > 50) score += 0.1;
        if (metrics.wordCount > 200) score += 0.1;
        if (metrics.headingCount > 0) score += 0.05;
        if (metrics.strongCount > 0 || metrics.emCount > 0) score += 0.05;

        return Math.min(score, 1.0);
    }

    generateAnalysisReport(html, metrics) {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>Mammoth Parsing Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .metrics { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .score { font-size: 1.2em; font-weight: bold; }
        .content { border: 1px solid #ddd; padding: 15px; margin: 20px 0; }
        .good { color: green; }
        .warning { color: orange; }
        .error { color: red; }
    </style>
</head>
<body>
    <h1>Mammoth.js Parsing Analysis Report</h1>
    <div class="metrics">
        <h2>Quality Metrics</h2>
        <div class="score ${metrics.qualityScore > 0.8 ? 'good' : metrics.qualityScore > 0.6 ? 'warning' : 'error'}">
            Quality Score: ${(metrics.qualityScore * 100).toFixed(1)}%
        </div>
        <ul>
            <li>Total Length: ${metrics.totalLength} characters</li>
            <li>Word Count: ${metrics.wordCount}</li>
            <li>Paragraphs: ${metrics.paragraphCount}</li>
            <li>Headings: ${metrics.headingCount}</li>
            <li>Images: ${metrics.imageCount}</li>
            <li>Tables: ${metrics.tableCount}</li>
            <li>Has Valid Structure: ${metrics.hasValidStructure ? 'Yes' : 'No'}</li>
            <li>Contains Meaningful Text: ${metrics.containsMeaningfulText ? 'Yes' : 'No'}</li>
            <li>No Corruption Signs: ${metrics.noCorruptionSigns ? 'Yes' : 'No'}</li>
        </ul>
    </div>
    
    <div class="content">
        <h2>Converted Content</h2>
        ${html}
    </div>
</body>
</html>`;
    }

    async generateFinalReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: this.testResults,
            config: CONFIG
        };

        const reportJson = JSON.stringify(report, null, 2);
        fs.writeFileSync(
            path.join(CONFIG.OUTPUT_DIR, 'test-report.json'),
            reportJson
        );

        this.log(`📋 Final Test Report:`, 'info');
        this.log(`   Total Tests: ${this.testResults.total}`, 'info');
        this.log(`   Passed: ${this.testResults.passed}`, 'success');
        this.log(`   Failed: ${this.testResults.failed}`, 'error');
        this.log(`   Success Rate: ${((this.testResults.passed / this.testResults.total) * 100).toFixed(1)}%`, 'info');
        this.log(`   Reports saved to: ${CONFIG.OUTPUT_DIR}`, 'info');

        return report;
    }

    // Main test runner
    async runAllTests() {
        this.log('🚀 Starting Mammoth.js comprehensive testing...', 'info');
        
        try {
            // Test 1: API fetch
            const apiResult = await this.testApiDocumentFetch();
            
            // Test 2: Binary conversion
            const binaryResult = await this.testBinaryDataConversion(apiResult.response.data.content);
            
            // Test 3: Mammoth parsing
            const mammothResult = await this.testMammothParsing(binaryResult.uint8Array);
            
            // Test 4: HTML quality
            const qualityResult = await this.testHtmlQuality(mammothResult.result.value);
            
            // Test 5: Performance
            // const performanceResult = await this.testPerformance();
            
            // Generate final report
            await this.generateFinalReport();
            
            this.log('🎉 All tests completed successfully!', 'success');
            
        } catch (error) {
            this.log(`💥 Testing failed: ${error.message}`, 'error');
            await this.generateFinalReport();
            throw error;
        }
    }
}

// Run the tests
async function main() {
    const tester = new MammothTester();
    
    try {
        await tester.runAllTests();
        process.exit(0);
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = MammothTester;