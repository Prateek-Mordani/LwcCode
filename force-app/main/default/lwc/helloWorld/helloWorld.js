import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'sup';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}