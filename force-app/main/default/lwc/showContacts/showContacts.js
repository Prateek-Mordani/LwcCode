import { LightningElement } from 'lwc';
import fethacc from '@salesforce/apex/fethacc.acclist';
import fetchcont from '@salesforce/apex/fetchcont.conlist';
const columns=[{label:"contact name", fieldName:"Name"},{label:'phone no',fieldName:"Phone"}]; 

export default class ShowContacts extends LightningElement {
    columns=columns;
    data;
    value='';
    options;
    show=false;
    connectedCallback(){
        fethacc().then(result=>{
            let arr=[];
            console.log(result);
            for(let i=0;i<result.length;i++){
                arr.push({label:result[i].Name ,value:result[i].Id});
            }
            this.options=arr;
        }).catch(error=>{
            console.log(error);
        })
    }

    handler(event){
        this.show=true;
        let accounts=event.target.value;
        console.log(accounts);
        fetchcont({accId:accounts}).then(result=>{
            console.log(result);
            this.data=result;
        })

    }
}