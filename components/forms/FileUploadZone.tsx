'use client';

import { useState, useRef } from 'react';
import { Upload as UploadSimple, X, Image as ImageIcon, Video as VideoCamera, File } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export function FileUploadZone() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={18} />;
    if (type.startsWith('video/')) return <VideoCamera size={18} />;
    return <File size={18} />;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-3 
          border-2 border-dashed rounded-[12px] py-12 px-6 cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-[#006aff] bg-[#006aff]/5'
            : 'border-[#cbd5e0] bg-white hover:border-[#001a40]/40'
          }
        `}
      >
        <div className="w-[56px] h-[56px] rounded-full bg-[#f4f3ea] flex items-center justify-center">
          <UploadSimple size={24} className="text-[#001a40]" />
        </div>
        <p className="text-[#001a40] font-semibold text-[15px]">
          Drag & drop files here, or <span className="text-[#006aff] underline">browse</span>
        </p>
        <p className="text-[#4a5568] text-[13px]">
          JPG, PNG, WEBP, MP4, PDF — Max 10MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* File previews */}
      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-[8px] px-3 py-2 text-[13px] text-[#001a40] group"
            >
              {file.preview ? (
                <img src={file.preview} alt={file.name} className="w-8 h-8 rounded-[4px] object-cover" />
              ) : (
                <span className="text-[#4a5568]">{getIcon(file.type)}</span>
              )}
              <span className="max-w-[140px] truncate">{file.name}</span>
              <span className="text-[#a0aec0] text-[11px]">{formatSize(file.size)}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="ml-1 text-[#a0aec0] hover:text-[#c0392b] transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
