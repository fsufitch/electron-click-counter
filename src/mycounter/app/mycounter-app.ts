import * as Electron from 'electron';
import { CounterBrowserWindow } from './counter-window';
import { CounterStatusTray } from './status-tray';

export class MyCounterApp {
  private trayIcon: CounterStatusTray = null;
  private mainWindow: Electron.BrowserWindow = null;
  private started = false;

  start() {
    if (this.started) return;
    this.trayIcon = new CounterStatusTray();
    this.mainWindow = new Electron.BrowserWindow({show: false});
    CounterBrowserWindow.show();
  }

  quit() {
    this.mainWindow.close();
    this.trayIcon.destroy();
    if (!!CounterBrowserWindow.currentlyShowing) {
      CounterBrowserWindow.currentlyShowing.close();
    }
    Electron.app.quit();
  }

  private static _instance: MyCounterApp = null;
  static get instance() {
    if (MyCounterApp._instance === null) {
      MyCounterApp._instance = new MyCounterApp();
    }
    return MyCounterApp._instance;
  }
}
