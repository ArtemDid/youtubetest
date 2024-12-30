export interface ISearchDB {
  id?: number;
  videoId?: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IHistoryDB {
  id?: number;
  query: string;
  created_at?: string;
  updated_at?: string;
}

export interface IAnalyticsDB {
  id?: number;
  query: string;
  count: number;
  created_at?: string;
  updated_at?: string;
}
