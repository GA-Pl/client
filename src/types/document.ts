export interface IDocumentData {
  title?: string;
  subject: string;
  detailSubject?: string;
  age: number | string;
  groupSize: string;
  activityType: string;
  selectedSubtitle?: string;
  selectedContent?: string;
  activityGoal?: string[];
  activityTool?: string[];
  precautions?: string[];
  evaluationCriteria?: string[];
  activityContent?: IActivityContent[];
  nuriCurriculum?: INuriCurriculum;
  attachments?: IAttachment[];
  images?: string[];
}

export interface IDocument {
  status: string;
  data: IReceivedDocumentData;
  message: null | string;
}

export interface IReceivedDocumentData {
  title: string;
  subject: string;
  detail_subject?: string;
  age: number;
  group_size: string;
  activity_type: string;
  activity_goal: string[];
  activity_tool: string[];
  precautions: string[];
  evaluation_criteria: string[];
  activity_content: IActivityContent[];
  nurri_curriculum?: INuriCurriculum;
  attachments?: IAttachment[];
  images?: string[];
}

interface IActivityContent {
  subtitle: string;
  content: string;
}

interface INuriCurriculum {
  [category: string]: {
    [detail: string]: string[];
  };
}

interface IAttachment {
  url: string;
  fileName: string;
  type?: string;
}
