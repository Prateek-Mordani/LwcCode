import { LightningElement,track,wire,api } from 'lwc';
import conList from '@salesforce/apex/ContactList.ConList';
    const columns=[{label:"Name",fieldName:"Name"},
                    {label:'Contact no', fieldName:'Phone'}];
export default class SearchComponent extends LightningElement {
    @track showcon='show contacts'
    @track visibility=false;
    @track data=[];
    columns=columns;
    @api recordId; // stores the current page record id  
    @api searchKey='';

    //get related contact list from apex class
    connectedCallback(){ 
        conList({lwcId:this.recordId})
        .then(response=>{
            this.data=response;
            console.log(this.recordId);
        })
        .catch(error=>{
            console.log('error occured while getting contacts from apex class'+error);
        })
    }
    handlechange(ev){
        this.searchKey=ev.target.value;
        conList({lwcId:this.recordId,searchkeys:this.searchKey})
        .then(res=>{
            this.data=res;
        })
        .catch(err=>{
            console.log("error calling apex function"+err);
        })
    }

    handler(event){
        const label=event.target.label;
        if(label==="show contacts"){
            this.showcon="hide contacts";
            this.visibility=true;
        }
        else{
            this.showcon="show contacts";
            this.visibility=false;
        }

    }
}