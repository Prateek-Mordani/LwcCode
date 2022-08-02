import { LightningElement, track } from 'lwc';
import getaccounts from '@salesforce/apex/getAccounts.getAccounts';
export default class TreeGridComponent extends LightningElement {
    @track columns=[{fieldName:"Name",label:'account name',type:'text'},{fieldName:'AnnualRevenue',label:'Annual Revenue'},{fieldName:'Name',label:'contact name'}];
    @track rows=[];
    connectedCallback(){
        getaccounts().then(result=>{
           // console.log(result[0].Contacts.Name);
           // result.forEach(element => {
                this.rows=result;
           // });
        })

    }

}