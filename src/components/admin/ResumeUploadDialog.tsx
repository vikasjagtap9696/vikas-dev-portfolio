import { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useResume } from "@/hooks/useResume";

export function ResumeUploadDialog() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadResume, resumeSettings } = useResume();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    await uploadResume.mutateAsync(selectedFile);
    setSelectedFile(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Upload Resume
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {resumeSettings?.file_name && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm">Current: {resumeSettings.file_name}</span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            variant="outline"
            className="w-full h-24 border-dashed"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-6 w-6" />
              <span>{selectedFile ? selectedFile.name : "Select PDF or DOC file"}</span>
            </div>
          </Button>

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploadResume.isPending}
            className="w-full"
          >
            {uploadResume.isPending ? "Uploading..." : "Upload Resume"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
