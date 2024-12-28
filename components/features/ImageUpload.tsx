'use client';

import { useCallback, useState, memo } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  previewUrl?: string;
}

export const ImageUpload = memo(function ImageUpload({ onImageSelect, previewUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState(previewUrl);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  const handleClear = () => {
    setPreview(undefined);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-white/20'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Agent preview"
            fill
            className="object-cover"
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-xs text-gray-400 text-center mb-2">
            Drag and drop an image here, or click to select
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            id="agent-image-upload"
          />
          <Button
            variant="outline"
            className="h-8 text-sm"
            onClick={() => document.getElementById('agent-image-upload')?.click()}
          >
            Select Image
          </Button>
        </div>
      )}
    </div>
  );
});