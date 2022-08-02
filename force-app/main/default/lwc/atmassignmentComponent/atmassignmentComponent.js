import { LightningElement } from 'lwc';
import acclist from '@salesforce/apex/fetchAccounts.acclist';
import tranlist from '@salesforce/apex/fetchAccounts.tranlist';
import createTransactions from '@salesforce/apex/fetchAccounts.createTransactions';

export default class AtmassignmentComponent extends LightningElement {
    show=false;
    exist=false;;
    name;
    account;
    ballab=false;;
    columns=[{label:'type',fieldName:'Name'},{label:'amt deposited', fieldName:'DEPOSIT_AMT__c'},{label:'amt withdrawn',fieldName:'withdrawl_amt__c'}];
    showStatement=false;
    data=[];
    showamt=false;
    label;
    
    showAccount(){
        let input=this.template.querySelector('.nameField').value;
        acclist({accId:input}).then(result=>{
            console.log(result);
            this.account=result;
            this.name=result.Name;
            console.log(this.name);
            this.show=true;
            this.exist=false;
        })
        .catch(error=>{
            console.log(error);
            this.exist=true;
            this.show=false;
        })
    

    }
    balance(event){
        if(this.ballab==false){
        event.target.label=this.account.balance__c;
        this.ballab=true;
        }
        else{
            event.target.label="show balance";
            this.ballab=false;
        }
        
    }
    statement(){
        if(this.showStatement==false){
            this.showStatement=true;
            tranlist({accId:this.account.Id}).then(result=>{
                let arr=[];
                console.log(result);
                result.forEach(element => {
                    if(element.DEPOSIT_AMT__c!=null){
                        arr.push({Name:'deposit' , DEPOSIT_AMT__c:element.DEPOSIT_AMT__c , withdrawl_amt__c:'' })

                    }
                    else{
                        arr.push({Name:'withdraw' ,DEPOSIT_AMT__c:"", withdrawl_amt__c:element.withdrawl_amt__c })
                    }
                });
                this.data=arr;

            }).catch(error=>{
                console.log(error);
            });
        }

        else{
            this.showStatement=false;
        }
        
    }

    withdrawl(){
        this.label='withdrawl'
        if(this.showamt==false){
            this.showamt=true;
            
        }
        else {
            this.showamt=false;
        }
    }

    deposit(){
        this.label='deposit';
        if(this.showamt==false){
            this.showamt=true;

        }
        else {
            this.showamt=false;
        }
    }

    submit(){
        
         let reqAmount=this.template.querySelector('.amount').value;
         createTransactions({amount:reqAmount , accId:this.account.Id,type:this.label});
         console.log("record inserted");
    }
}