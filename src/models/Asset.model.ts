export interface Asset {
  id: string;
  mime_type: string;
  feed_id: string;
  creation_date: string;
  title: string;
  thumbnail: string;
  media_url: string;
  height: number;
  width: number;
  duration: number;
  fps: number;
  processing_info: {
    status: string;
    start: string;
    end: string;
  };
}

export interface AssetPreview {
  id: string;
  creation_date: string;
  title: string;
  thumbnail: string;
}
