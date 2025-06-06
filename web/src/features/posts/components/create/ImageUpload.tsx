import InputFieldError from "@/components/shared/InputFieldError";

import { useState } from "react";
import type { CreateErrorsType, CreateInputDataProps } from "../../types";

interface ImageUploadProps {
  setInputData: React.Dispatch<React.SetStateAction<CreateInputDataProps>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  errors: CreateErrorsType;
}

export default function ImageUpload({
  setInputData,
  setImagePreview,
  errors,
}: ImageUploadProps) {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setInputData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setInputData((prev) => ({ ...prev, image: file }));
    }
  };

  return (
    <div>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        htmlFor="dropzone"
        className={`flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed bg-white transition dark:border-neutral-700 dark:bg-neutral-900 ${
          dragging
            ? "!border-neutral-300 !bg-neutral-200 dark:!border-neutral-500 dark:!bg-neutral-950"
            : "border-neutral-300"
        }`}
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-center select-none">
            <p>Click to upload or drag and drop</p>
            <p className="text-xs">PNG, JPG or JPEG</p>
          </div>
        </div>
        <input
          id="dropzone"
          name="image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      {errors.image && <InputFieldError error={errors.image} />}
    </div>
  );
}
