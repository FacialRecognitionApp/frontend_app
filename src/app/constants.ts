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

// Local
// const BASE_URL = "http://localhost:7000";
// AWS Server
const BASE_URL =
  "http://ec2-35-182-245-66.ca-central-1.compute.amazonaws.com/api";

// backend Calls
export const upload_video_url = `${BASE_URL}/video/upload_file`;
export const add_user_url = `${BASE_URL}/user/create_new_user`;
export const get_all_video_questions_url = `${BASE_URL}/video/get_video_question_type`;
export const get_all_survey_questions_url = `${BASE_URL}/survey/survey_questions`;
export const upload_survey_answers_url = `${BASE_URL}/survey/survey_answer`;

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
