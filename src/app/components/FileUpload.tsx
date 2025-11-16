'use client'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // For now, we just log. Hook this into your API or react-hook-form if needed.
    console.log('dropped files', acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">Upload ID Proof (PDF/Image)</div>
      <div {...getRootProps()} className="border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p className="text-sm text-gray-500">{isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}</p>
      </div>
    </div>
  )
}
