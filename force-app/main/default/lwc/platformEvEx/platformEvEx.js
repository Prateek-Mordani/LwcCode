import { LightningElement, track } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empapi';
export default class PlatformEvEx extends LightningElement {
    channelName='/event/New_Event__e'
    isSubscribeDisabled = !this.isSubscribeDisabled;
    subscription={};
    @track accountNameList=[];

    connectedCallback(){
        this.handleSubscribe();
    }

    handleSubscribe(){
        subscribe(this.channelName, -1, this.messageCallback).then(response=>{
            console.log('subscription request sent to :',JSON.stringify(response.channel));
            this.subscription=response;
        })
    }
    handleUnsubscribe(){
        unsubscribe(this.subscription, response=>{
            console.log('unsubscribe response',JSON.stringify(response));
        });
    }

    disconnectedCallback(){
        this.handleUnsubscribe();
    }

    messageCallback= (response) => {
        let actname=response.data.payload.Record_Name__c;
        let actId=response.data.payload.Record_Id__c;
        let recPath='/'+response.data.payload.Record_Id__c;

        this.accountNameList.push({"Id":actId,"Name":actname,"Path":recPath});
        console.log('this.accountNameList'+JSON.stringify(this.accountNameList));
    }
}