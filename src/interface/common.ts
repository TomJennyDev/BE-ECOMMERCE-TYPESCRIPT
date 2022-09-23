export interface Query<T = {}> {
  limit?: string;
  page?: string;
  sortBy?: string;
  populate?: string;
  select?: string;
  filter?: T;
}
