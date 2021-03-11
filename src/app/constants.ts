// Fake Local Stored Data Type
export interface VideoQuestion {
  video_type_id: number;
  video_type_content: string;
  video_url?: string;
  duration_ms: number;
}

export interface SurveyQuestion {
  survey_question_id: number;
  question_content: string;
  question_type_id: number;
  type_name: string;
  rating_questions: Array<RatingSurveyQuestion>;
  answer_content: string;
}

export interface RatingSurveyQuestion {
  rating_question_id: number;
  rating_question_content: string;
  rating: number;
}

// upload Single Survey Question Answer Data Type
export interface SurveyAnswer {
  survey_question_id: number;
  question_type_id: number;
  answer_content: string | Array<SurveyRatingAnswer>;
}

// Single Rating question answer
export interface SurveyRatingAnswer {
  rating_question_id: number;
  rating: number;
}

// backend Calls
export const upload_video_url = "http://localhost:7000/video/upload_file";
export const add_user_url = "http://localhost:7000/user/create_new_user";
export const get_all_video_questions_url = "http://localhost:7000/video/get_video_question_type";
export const get_all_survey_questions_url = "http://localhost:7000/survey/survey_questions";
export const upload_survey_answers_url = "http://localhost:7000/survey/survey_answer";


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
  }
];
*/
