import { Component } from '@angular/core';

import { CounterWindowService } from './counter-window.service';

@Component({
  selector: 'counter-window',
  template: require('./counter-window.component.html'),
})
export class CounterWindowComponent {
  counter$ = this.counterWindowService.getCounter();

  constructor(private counterWindowService: CounterWindowService) {}

  clicked() {
    this.counterWindowService.incrementCounter();
  }
}
