import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'bs-signal-test',
  imports: [],
  templateUrl: './signal-test.component.html',
  styles: ``
})
export class SignalTestComponent {
  counter = signal(0);

  increment() {
    this.counter.set(this.counter()+1);
  }

  derivedCounter = computed(()=>{
    return this.counter() *10;
  })
}
