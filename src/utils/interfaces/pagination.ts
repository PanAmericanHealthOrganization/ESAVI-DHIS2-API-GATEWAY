export interface IPaginationRequest<T> {
  page: number;
  size: number;
  query: T;
}
export interface IPaginationResponse<T> {
  data: T;
  total: number;
}
