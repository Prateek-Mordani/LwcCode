import { LightningElement, wire } from 'lwc';
import firstLms from '@salesforce/messageChannel/firstLms__c';
import { publish,MessageContext } from 'lightning/messageService';
 

export default class PublishComponent extends LightningElement {
    @wire(MessageContext) msgctx;
    handleClick(){
        let tjson={detail:'from sibling'};
        publish(this.msgctx,firstLms,tjson);
    }
}