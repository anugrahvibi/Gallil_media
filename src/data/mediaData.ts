export interface MediaItem {
  label: string;
  descriptor: string;
  images: string[];
  videos?: { src: string; thumbnail: string }[];
}

export const mediaData: Record<string, MediaItem> = {
  liveFusion: {
    label: "LIVE FUSION",
    descriptor: "LIVE PERFORMANCE MASTERING FOR STAGE AND BROADCAST",
    images: [
      "/media/live-fusion/img-01.jpg",
      "/media/live-fusion/img-02.jpg",
      "/media/live-fusion/img-03.jpg",
      "/media/live-fusion/img-04.jpg",
      "/media/live-fusion/img-05.jpg",
      "/media/live-fusion/img-06.jpg",
      "/media/live-fusion/img-07.jpg",
      "/media/live-fusion/img-08.jpg",
      "/media/live-fusion/img-09.jpg",
      "/media/live-fusion/img-10.jpg",
      "/media/live-fusion/img-11.jpg",
      "/media/live-fusion/img-12.jpg",
      "/media/live-fusion/img-13.jpg",
      "/media/live-fusion/img-14.jpg",
      "/media/live-fusion/img-15.jpg",
      "/media/live-fusion/img-16.jpg",
      "/media/live-fusion/img-17.jpg",
      "/media/live-fusion/img-18.jpg",
      "/media/live-fusion/img-19.jpg",
      "/media/live-fusion/img-20.jpg",
      "/media/live-fusion/img-21.jpg",
    ],
    videos: [
      { src: "/media/live-fusion/vid-01.mp4", thumbnail: "/media/live-fusion/vid-01-thumb.jpg" },
      { src: "/media/live-fusion/vid-02.mp4", thumbnail: "/media/live-fusion/vid-02-thumb.jpg" },
      { src: "/media/live-fusion/vid-03.mp4", thumbnail: "/media/live-fusion/vid-03-thumb.jpg" },
    ],
  },
  churchChoir: {
    label: "CHURCH CHOIR",
    descriptor: "CHORAL SERVICES FOR WEDDINGS AND LITURGICAL CEREMONIES",
    images: [
      "/media/church-choir/img-01.jpg",
      "/media/church-choir/img-02.jpg",
      "/media/church-choir/img-03.jpg",
      "/media/church-choir/img-04.jpg",
      "/media/church-choir/img-05.jpg",
      "/media/church-choir/img-06.jpg",
      "/media/church-choir/img-07.jpg",
      "/media/church-choir/img-08.jpg",
      "/media/church-choir/img-09.jpg",
      "/media/church-choir/img-10.jpg",
      "/media/church-choir/img-11.jpg",
      "/media/church-choir/img-12.jpg",
      "/media/church-choir/img-13.jpg",
      "/media/church-choir/img-14.jpg",
      "/media/church-choir/img-15.jpg",
    ],
    videos: [],
  },
  funeralChoir: {
    label: "FUNERAL CHOIR",
    descriptor: "CHORAL SERVICES FOR FUNERALS AND MEMORIAL SERVICES",
    images: [
      "/media/funeral-choir/img-01.jpg",
      "/media/funeral-choir/img-02.jpg",
      "/media/funeral-choir/img-03.jpg",
      "/media/funeral-choir/img-04.jpg",
      "/media/funeral-choir/img-05.jpg",
      "/media/funeral-choir/img-06.jpg",
      "/media/funeral-choir/img-07.jpg",
      "/media/funeral-choir/img-08.jpg",
      "/media/funeral-choir/img-09.jpg",
      "/media/funeral-choir/img-10.jpg",
      "/media/funeral-choir/img-11.jpg",
      "/media/funeral-choir/img-12.jpg",
    ],
    videos: [],
  },
  recordingSessions: {
    label: "RECORDING SESSIONS",
    descriptor: "PROFESSIONAL RECORDING SESSIONS — STUDIO AND FIELD",
    images: [
      "/media/recording-sessions/img-01.jpg",
      "/media/recording-sessions/img-02.jpg",
      "/media/recording-sessions/img-03.jpg",
      "/media/recording-sessions/img-04.jpg",
      "/media/recording-sessions/img-05.jpg",
      "/media/recording-sessions/img-06.jpg",
    ],
    videos: [
      { src: "/media/recording-sessions/vid-01.mp4", thumbnail: "/media/recording-sessions/vid-01-thumb.jpg" },
    ],
  },
};
