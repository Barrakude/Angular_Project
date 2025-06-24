export interface IResponse<T = unknown> {
  prev?: null,
  next?:number,
  first?:number,
  last?:number,
  totalCount?:number,
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
