export abstract class DataChannel {
  static token: string = null;
  token: string = null;
  abstract serialize(data: any): string;
  abstract deserialize(data: string): any;
}
