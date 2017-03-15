/// <reference types="node" />

import { app } from 'electron';

import { MyCounterApp } from './mycounter-app';
// console.log('askljdhasdkjlfhasdklfhskdfh');
app.on('ready', () => MyCounterApp.instance.start());
