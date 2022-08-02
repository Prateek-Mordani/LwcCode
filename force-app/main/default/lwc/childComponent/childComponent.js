import { LightningElement,api} from 'lwc';

export default class ChildComponent extends LightningElement {
   @api itemName='child component'
   @api handlerForParent(){
       this.itemName='parent component now';     
   }
}