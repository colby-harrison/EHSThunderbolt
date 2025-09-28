import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormElementValueProps, FileInputType } from "../types";
import { useState, useEffect } from "react";
import { UploadDropzone } from "@/lib/utils";
import { toast } from "sonner";

export function FileInput({
  name,
  title,
  uploadEndpoint,
  value,
  imagePreview = false,
  user,
  onChange,
}: FileInputType & FormElementValueProps<FileInputType>) {
  const [_localValue, setLocalValue] = useState(value || "");
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);
  function handleChange(e: string) {
    onChange?.(e);
    setLocalValue(e);
  }
  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={`${name}-${title}`}>{title}</Label>
      <div className='w-full flex flex-row gap-2 p-2 border border-border rounded-lg'>
        <UploadDropzone
          endpoint={uploadEndpoint}
          headers={{ Authorization: user._id }}
          onClientUploadComplete={(res) => {
            handleChange(res[0]?.key!);
            toast.success("File uploaded successfully", { id: "upload" });
          }}
          onUploadError={(err) => {
            toast.error("Error uploading file", { id: "upload" });
            console.error(err);
          }}
          onUploadBegin={() => {
            toast.loading("Uploading file...", { id: "upload" });
          }}
          className='w-full h-full'
        />
        {imagePreview && value && (
          <img
            src={`/cdn/ut/${value}`}
            alt={title}
            className='w-full h-full object-cover'
          />
        )}
      </div>
    </div>
  );
}
