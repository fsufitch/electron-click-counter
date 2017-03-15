import * as path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';
import { Observable } from 'rxjs/Rx';

import { CounterStorageService } from 'mycounter/app/counter-storage';
import {
  CounterUpdateChannel,
  CounterIncrementChannel,
} from 'mycounter/common/channel';

const HTML_PATH = path.join(app.getAppPath(), 'res', 'counter.window.html');
const ICON_PATH = path.join(app.getAppPath(), 'res', 'tray-icon.png');

export class CounterBrowserWindow extends BrowserWindow {
  private counterOnWindowShow$ = Observable.fromEvent(this.webContents, 'dom-ready')
    .withLatestFrom(this.counterStorageService.getCounter(), (event, ctr) => ctr);

  private sendCounter$ = this.counterStorageService.getCounter()
    .merge(this.counterOnWindowShow$);

  private sendCounterSubscription = this.sendCounter$
    .map(ctr => this.counterUpdateChannel.serialize(ctr))
    .subscribe(data => this.webContents.send(this.counterUpdateChannel.token, data));

  private recvIncrementCounterSubscription = Observable
    .fromEvent(this.ipc, this.counterIncrementChannel.token)
    .subscribe(() => this.counterStorageService.incrementCounter());

  constructor(
    private counterStorageService = CounterStorageService.instance,
    private counterUpdateChannel = new CounterUpdateChannel(),
    private counterIncrementChannel = new CounterIncrementChannel(),
    private ipc = ipcMain
  ) {
    super({
      width: 600,
      height: 400,
      title: 'Electron Click Counter',
      icon: ICON_PATH,
    });
    this.setMenu(null);
    this.loadURL(`file://${HTML_PATH}`);
  }

  destroy() {
    this.sendCounterSubscription.unsubscribe();
    this.recvIncrementCounterSubscription.unsubscribe();
  }

  private static _currentlyShowing: CounterBrowserWindow = null;

  static get currentlyShowing() { return CounterBrowserWindow._currentlyShowing; }

  static show() {
    if (!!CounterBrowserWindow.currentlyShowing) {
      CounterBrowserWindow.currentlyShowing.focus();
      return;
    };
    let window = CounterBrowserWindow._currentlyShowing = new CounterBrowserWindow();
    window.on('close', (ev: Event) => {
      window.destroy();
      CounterBrowserWindow._currentlyShowing = null;
    });
  }
}
