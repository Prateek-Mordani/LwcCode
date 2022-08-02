import { LightningElement, wire } from 'lwc';
import firstLms from '@salesforce/messageChannel/firstLms__c';
import { subscribe,unsubscribe,MessageContext,APPLICATION_SCOPE } from 'lightning/messageService';

export default class SubscribeComponent extends LightningElement {
    @wire(MessageContext) msgctx;
    sib;
    subscribevar;
    connectedCallback(){
        this.subscribevar=subscribe(this.msgctx,firstLms,(message)=>this.fromsib(message),{scope:APPLICATION_SCOPE});
        
    }
    fromsib(message){
        console.log(message);
        console.log('message received from sibling');
        this.sib=message.detail;
    }
    handler(){
        unsubscribe(this.subscribevar);
    }
    
}