import YoutubePlayer from "react-native-youtube-iframe";

interface Props {
  videoId: string;
  width: number;
  height: number;
  onError: () => void;
}

export default function VideoPlayer({
  videoId,
  width,
  height,
  onError,
}: Props) {
  return (
    <YoutubePlayer
      height={height}
      width={width}
      videoId={videoId}
      onError={(e: string) => {
        console.log("YouTube player error:", e);
        onError();
      }}
    />
  );
}
