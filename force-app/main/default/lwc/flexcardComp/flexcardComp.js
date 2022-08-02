import { api, LightningElement } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Id', fieldName: 'Id'},
]


export default class FlexcardComp extends LightningElement {
    @api thumbnaillimit;
    @api json1;
    columns=columns;    
    data=[];
   
   connectedCallback(){
        console.log(JSON.parse(JSON.stringify(this.json1))); 
   }
}