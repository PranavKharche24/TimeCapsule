import { useState, useRef } from 'react';
import { Upload, Image, Mic, Video, File, X, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'audio' | 'video' | 'document';
  url: string;
  uploadProgress?: number;
}

export default function MediaUpload() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getFileType = (file: File): MediaFile['type'] => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.startsWith('video/')) return 'video';
    return 'document';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const mediaFile: MediaFile = {
        id: Date.now() + Math.random().toString(),
        file,
        type: getFileType(file),
        url: URL.createObjectURL(file),
      };
      
      setMediaFiles(prev => [...prev, mediaFile]);
      
      // Simulate upload progress
      simulateUpload(mediaFile.id);
    });

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setMediaFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, uploadProgress: progress }
            : file
        )
      );
    }, 200);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const file = new File([blob], `recording-${Date.now()}.wav`, { type: 'audio/wav' });
        
        const mediaFile: MediaFile = {
          id: Date.now().toString(),
          file,
          type: 'audio',
          url: URL.createObjectURL(blob),
        };
        
        setMediaFiles(prev => [...prev, mediaFile]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const removeFile = (fileId: string) => {
    setMediaFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'audio':
        return <Mic className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6" data-testid="media-upload-section">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="file-input"
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="glassmorphism border-timeline-green/30 hover:bg-timeline-green/20"
          data-testid="upload-files-button"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          className={`glassmorphism ${
            isRecording 
              ? 'border-pruning-red/30 hover:bg-pruning-red/20 text-pruning-red' 
              : 'border-tva-orange/30 hover:bg-tva-orange/20'
          }`}
          data-testid="record-audio-button"
        >
          {isRecording ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Stop Recording ({formatTime(recordingTime)})
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Record Audio
            </>
          )}
        </Button>
      </div>

      {/* Uploaded Files */}
      {mediaFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Attached Media</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mediaFiles.map((mediaFile) => (
              <Card key={mediaFile.id} className="glassmorphism" data-testid={`media-file-${mediaFile.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-timeline-green/20 text-timeline-green">
                        {getFileIcon(mediaFile.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" title={mediaFile.file.name}>
                          {mediaFile.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(mediaFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(mediaFile.id)}
                      className="text-pruning-red hover:bg-pruning-red/20"
                      data-testid={`remove-file-${mediaFile.id}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Upload Progress */}
                  {mediaFile.uploadProgress !== undefined && mediaFile.uploadProgress < 100 && (
                    <div className="space-y-1">
                      <Progress value={mediaFile.uploadProgress} className="h-1" />
                      <p className="text-xs text-gray-500">
                        Uploading... {Math.round(mediaFile.uploadProgress)}%
                      </p>
                    </div>
                  )}

                  {/* Preview for images */}
                  {mediaFile.type === 'image' && mediaFile.uploadProgress === 100 && (
                    <div className="mt-2">
                      <img
                        src={mediaFile.url}
                        alt={mediaFile.file.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Audio player */}
                  {mediaFile.type === 'audio' && mediaFile.uploadProgress === 100 && (
                    <div className="mt-2">
                      <audio
                        src={mediaFile.url}
                        controls
                        className="w-full h-8"
                      />
                    </div>
                  )}

                  {/* Video player */}
                  {mediaFile.type === 'video' && mediaFile.uploadProgress === 100 && (
                    <div className="mt-2">
                      <video
                        src={mediaFile.url}
                        controls
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recording Instructions */}
      {isRecording && (
        <div className="glassmorphism rounded-lg p-4 border border-pruning-red/30 animate-pulse-glow">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-pruning-red rounded-full animate-pulse"></div>
            <p className="text-sm text-pruning-red font-semibold">
              Recording in progress... Click "Stop Recording" when finished.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
