import 'reflect-metadata';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CounterWindowComponent } from './counter-window.component';
import { CounterWindowService } from './counter-window.service';

@NgModule({
  imports: [ BrowserModule ],
  providers: [ CounterWindowService ],
  declarations: [ CounterWindowComponent ],
  bootstrap: [ CounterWindowComponent ],
})
class CounterWindowRendererModule {}

platformBrowserDynamic().bootstrapModule(CounterWindowRendererModule);
