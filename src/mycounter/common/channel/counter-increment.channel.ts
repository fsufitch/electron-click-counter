import { DataChannel } from './data-channel';

export class CounterIncrementChannel extends DataChannel {
  static token = 'mycounter/incrementChannel';
  token = CounterIncrementChannel.token;

  serialize(): string { return null; }
  deserialize(): any { return null; }
}
