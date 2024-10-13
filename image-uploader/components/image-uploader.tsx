"use client"

import { useState } from "react"
import { UploadButton } from "@uploadthing/react"
import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UploadedFile {
  name: string;
  url: string;
}

export default function ImageUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleUploadComplete = (res: UploadedFile[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...res])
  }

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error)
    alert("Upload failed: " + error.message)
  }

  const removeFile = (fileToRemove: UploadedFile) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileToRemove.name)
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Image Uploader</CardTitle>
        <CardDescription>Upload up to 4 images (max 4MB each)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            config={{
              mode: "auto",
              maxFileCount: 4,
              maxFileSize: "4MB",
            }}
          />
          <div className="grid grid-cols-2 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative">
                <Image
                  src={file.url}
                  alt={`Uploaded file ${index + 1}`}
                  width={150}
                  height={150}
                  className="rounded-md object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1"
                  onClick={() => removeFile(file)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {uploadedFiles.length > 0 && (
            <Button
              onClick={() => setUploadedFiles([])}
              variant="outline"
              className="w-full"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}