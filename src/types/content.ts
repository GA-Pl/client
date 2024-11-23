export interface IContentItem {
  id: string;
  subtitle: string;
  contents: ISubContentItem[];
}

export interface ISubContentItem {
  id: string;
  text: string;
}
