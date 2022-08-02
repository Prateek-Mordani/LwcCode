import { LightningElement,track } from 'lwc';
import accountlist from "@salesforce/apex/imperitiveclass.accountlist"
const columns=[{label :'account id',fieldName: 'Id'},
{label :'player name', fieldName:'Name'}]

export default class ImperitiveMethod extends LightningElement {
    @track columns=columns;
    @track data=[]
    connectedCallback(){
        accountlist()
        .then(result=>{
            this.data =result;
        })
        .catch(err=>{
            console.log('error occured');
        })
    }

}