import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ipcRenderer } from 'electron';

import {
  CounterUpdateChannel,
  CounterIncrementChannel,
} from 'mycounter/common/channel';

@Injectable()
export class CounterWindowService {
  private ipc = ipcRenderer;
  private counterUpdateChannel = new CounterUpdateChannel();
  private counterIncrementChannel = new CounterIncrementChannel();
  private _counter$ = Observable.fromEvent<string>(this.ipc, this.counterUpdateChannel.token, (event, data) => data)
    .map(data => this.counterUpdateChannel.deserialize(data))
    .share();

  getCounter() {
    return this._counter$;
  }

  incrementCounter() {
    this.ipc.send(this.counterIncrementChannel.token);
  }
}
