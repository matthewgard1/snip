export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  _v?: number;
  tags?: string[];
}

export interface TagMapping {
  id: string;
  tags: string[];
}