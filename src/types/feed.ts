export interface IFeed {
  document_id: number;
  author_id: number;
  activity_plan: {
    title: string;
    subject: string[];
    activity_content: {
      subtitle: string;
      content: string;
    }[];
    file: {
      url: string;
      type: string;
    }[];
  };
  activity_record: {
    image: string[];
    content: string;
    file: {
      url: string;
      type: string;
    }[];
  };
  is_liked: boolean;
  bookmark_count: number;
  created_dt: string;
}

export interface IFeedData {
  document_id: number;
}
