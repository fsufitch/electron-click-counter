import { BehaviorSubject } from 'rxjs/Rx';

export class CounterStorageService {
  private counter$ = new BehaviorSubject<number>(0);

  incrementCounter() {
    this.counter$.take(1)
      .map(ctr => ctr + 1)
      .subscribe(ctr => this.counter$.next(ctr));
  }

  getCounter() {
    return this.counter$.asObservable();
  }

  private static _instance = new CounterStorageService();
  static get instance() { return CounterStorageService._instance; }
}
