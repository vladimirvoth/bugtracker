import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {}

  name = 'Hello angular inline input';
  cost = 100;

  username = new FormControl('');

  saveCost(value) {
    console.log('saveCost', value);
    this.cost = value;
  }
}
