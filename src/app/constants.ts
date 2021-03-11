export interface VideoQuestion {
  videoTypeId: number;
  description: string;
  videoUrl: string;
  durationMS: number;
}

// backend Calls
export const upload_video_url = "http://localhost:7000/video/upload_file";
export const add_user_url = "http://localhost:7000/user/create_new_user";
export const get_all_video_questions_url = "http://localhost:7000/video/get_video_question_type";


/** 
export const testVideoQuestions: Array<VideoQuestion> = [
  {
    description: 'Closed-mouth smile',
    videoUrl: null,
    durationMS: 1000
  },
  {
    description: 'Open-mouth smile',
    videoUrl: null,
    durationMS: 1000
  },
  {
    description: 'Frown',
    videoUrl: null,
    durationMS: 1000
  },
  {
    description: 'Brow furrow',
    videoUrl: null,
    durationMS: 1000
  },
  {
    description: 'Wink with left eye',
    videoUrl: null,
    durationMS: 1000
  },
  {
    description: 'Wink with right eye',
    videoUrl: null,
    durationMS: 1000
  }
];
*/
