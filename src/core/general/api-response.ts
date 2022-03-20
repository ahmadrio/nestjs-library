export type TApiReponseDefault<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export class ApiResponse {
  static async default<T>(
    data: T,
    message: string,
  ): Promise<TApiReponseDefault<T>> {
    return {
      status: true,
      statusCode: 200,
      message: message,
      data: data,
    };
  }
}
