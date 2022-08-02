import { LightningElement ,track,api} from 'lwc';
import combovalue from '@salesforce/apex/comboclass.combovalue';
import getcon from '@salesforce/apex/comboclass.conlist';
import garbagemethod from '@salesforce/schema/Bank__c.Name'
const columns=[{label:'Contacts Name',fieldName:'Name'},
            {label:"contacts email",fieldName:'Email'}];
export default class ComboboxComponent extends LightningElement {
    @track value='';
    @track accOptions=[];
    @track visibility=false;
    @track columns =columns;
    @track data=[]; 
    @api recordId

    get options(){ 
      return this.accOptions;      
    }
    handler(event){
        this.value=event.detail.value;
        this.visibility = true;
        getcon({lwcId:this.value})  
        .then(result=>{
            this.data=result;
        })
        .catch(error=>{
            window.alert('error calling apex class'+error);
        })

    }
    connectedCallback(){
        combovalue().then(result=>{
            let arr = [];
            for(var i=0 ; i<result.length ;i++){
                arr.push({label: result[i].Name, value: result[i].Id})
                
            }
            this.accOptions=arr;
            console.log(garbagemethod);

        })
    }
    
}