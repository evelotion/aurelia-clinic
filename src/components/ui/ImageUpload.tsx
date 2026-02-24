"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div className="flex flex-col gap-4">
      {value && (
        <div className="relative w-40 h-40 rounded-md overflow-hidden border">
          <Image fill src={value} alt="Upload" className="object-cover" />
        </div>
      )}
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result: any) => {
          onChange(result.info.secure_url);
        }}
      >
        {({ open }) => (
          <button 
            type="button" 
            onClick={() => open()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 rounded-md w-max transition"
          >
            <ImagePlus className="w-5 h-5" />
            Upload Gambar
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
