import * as path from 'path';
import { app, nativeImage, Menu, Tray } from 'electron';

import { CounterStorageService } from 'mycounter/app/counter-storage';
import { CounterBrowserWindow } from 'mycounter/app/counter-window';
import { MyCounterApp } from 'mycounter/app/mycounter-app';

const ICON_PATH = path.join(app.getAppPath(), 'res', 'tray-icon.png');

export class CounterStatusTray extends Tray {
  private counter$ = this.counterStorageService
    .getCounter()
    .map(ctr => 0 + ctr);


  updateCounterTooltipSubscription = this.counter$
    .map(ctr => this.clickMessage(ctr))
    .subscribe(message => this.setToolTip(message));

  updateTrayMenuSubscription = this.counter$.subscribe(ctr => this.setContextMenu(
      Menu.buildFromTemplate([
        {label: this.clickMessage(ctr), enabled: false},
        {label: 'Open counter window', click: () => this.openCounterWindow()},
        {label: 'Quit', click: () => this.quit()},
      ])
  ));

  private clickMessage(ctr: number) {
    return `Button clicked ${ctr} time(s)`;
  }

  private openCounterWindow() {
    CounterBrowserWindow.show();
  }

  private quit() {
    MyCounterApp.instance.quit();
  }

  constructor(
    private counterStorageService = CounterStorageService.instance
  ) {
    super(ICON_PATH);
  }
}
