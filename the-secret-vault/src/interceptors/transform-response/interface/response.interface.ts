export interface ResponseInterface<T> {
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
  requestId: string;
}