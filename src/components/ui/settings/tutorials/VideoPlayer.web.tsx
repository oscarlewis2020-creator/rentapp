import { createElement } from "react";

interface Props {
  videoId: string;
  width: number;
  height: number;
  onError: () => void;
}

export default function VideoPlayer({ videoId, height }: Props) {
  return createElement("iframe", {
    src: `https://www.youtube.com/embed/${videoId}`,
    style: { width: "100%", height, border: 0 },
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true,
  });
}
