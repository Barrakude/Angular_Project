export interface IResponse<T = unknown> {
  data: T;
  result?: IResult;
}

export interface IResult {
  messages: IResultMessage[];
}

export interface IResultMessage {
  code: number;
  description: string;
}