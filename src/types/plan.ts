export interface IActivityContent {
  subtitle: string;
  content: string;
}

export interface INuriCurriculumDetail {
  [key: string]: string[];
}

export interface INuriCurriculum {
  [category: string]: INuriCurriculumDetail;
}

export interface IAttachment {
  url: string;
  fileName: string;
  type?: string;
}

export interface IClassPlan {
  title: string;
  subject: string;
  detail_subject: string;
  activity_type: string;
  activity_goal: string[];
  activity_tool: string[];
  precautions: string[];
  evaluation_criteria: string[];
  activity_content: IActivityContent[];
  nuri_curriculum: INuriCurriculum;
  attachments: IAttachment[];
  images: string[];
}

export interface IPlanner {
  document_id: number;
  author_id: number;
  class_plan: IClassPlan;
  class_log: any;
  created_dt: string;
}
