import { useCreateAsset } from '@livepeer/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';


export default function uploadVideo() {
  const [video, setVideo] = useState<File | undefined>();
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null,
  );
 
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);
 
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['*.mp4'],
    },
    maxFiles: 1,
    onDrop,
  });
 
  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  );
 
  return (
    <>
      <Box {...getRootProps()}>
        <Box as="input" {...getInputProps()} />
        <Box as="p">
          <Text>Drag and drop or browse files</Text>
        </Box>
      </Box>
 
      {createError?.message && <Text>{createError.message}</Text>}
 
      {video ? (
        <Badge>{video.name}</Badge>
      ) : (
        <Text>Select a video file to upload.</Text>
      )}
      {progressFormatted && <Text>{progressFormatted}</Text>}
 
      <Button
        onClick={() => {
          createAsset?.();
        }}
        size="2"
        disabled={!createAsset || createStatus === 'loading'}
      >
        Upload
      </Button>
    </>
  );
};