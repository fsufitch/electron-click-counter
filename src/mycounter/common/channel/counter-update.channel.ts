import { DataChannel } from './data-channel';

export class CounterUpdateChannel extends DataChannel {
  static token = 'mycounter/updateChannel';
  token = CounterUpdateChannel.token;

  serialize(counter: number) {
    return JSON.stringify({counter});
  }

  deserialize(data: string) {
    console.log(data);
    return +(JSON.parse(data).counter);
  }
}
