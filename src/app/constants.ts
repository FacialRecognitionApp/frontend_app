export interface VideoQuestion {
  description: string;
  type: string;
  videoUrl: string;
}

// backend Calls
export const upload_video_url = "http://localhost:7000/video/upload_file";
export const add_user_url = "http://localhost:7000/user/create_new_user";
