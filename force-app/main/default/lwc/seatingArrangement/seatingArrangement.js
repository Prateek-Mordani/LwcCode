import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/getAccounts.getAccounts';
const columns=[{label:'Contact Name',fieldName:'Name'},
{label:'Id', fieldName:'Id'},
{label:'SeatNo',type:'button', 
typeAttributes:{label:{fieldName:'SeatNumber__c'}}
}
];
export default class SeatingArrangement extends LightningElement {
   @track records=[];
    @track options;
    columns=columns;
    currentAcc;
    data;
    AssignSeat;
    check=true;
    connectedCallback(){
        getAccounts().then(result=>{
            let arr=[];
            this.records=result;
            this.records.forEach(element => {
                if(element.Contacts){
                    arr.push({label:element.Name, value:JSON.stringify(element)});
                }
            });
            this.options=arr;
            console.log(this.records);

        }).catch(error=>{
            console.log(error);
        })
    }
    handleChange(event){
        this.template.querySelectorAll('.seat').forEach(element => {
            element.label='.';
            element.variant='Neutral';
        });;
        this.currentAcc=JSON.parse(event.target.value);
        console.log(this.currentAcc);
        this.currentAcc.Contacts.forEach(element => {
            if(!element.SeatNumber__c){
                element.SeatNumber__c='+';
            }
        });
        this.data=this.currentAcc.Contacts;

        console.log(this.data);
        this.data.forEach(element => {
            if(element.Level__c=='Primary' && element.SeatNumber__c!='+'){
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).variant='success'; 
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).label=element.SeatNumber__c; 
            }
            else if(element.Level__c=='Secondary' && element.SeatNumber__c!='+'){
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).variant='brand';
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).label=element.SeatNumber__c; 
            }
            else if(element.Level__c=='Tertiary' && element.SeatNumber__c!='+'){
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).variant='destructive';
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).label=element.SeatNumber__c; 
            }
            else{

            }
            console.log(element.SeatNumber__c);
        });
    }

    viewRecord(event){
        console.log(event.detail.row);
        if(event.detail.row.SeatNumber__c=='+'){
            console.log('assign');
            this.AssignSeat=event.detail.row;
        }
    }
    handler(event){
        if(event.target.label=='.'){
            console.log(JSON.parse(this.template.querySelector('.Cbox').value));
            
            this.AssignSeat.SeatNumber__c=event.target.dataset.id.split('seat')[1];
            this.currentAcc.Contacts.forEach(element => {
                if(element.Id==this.AssignSeat.Id){
                    element.SeatNumber__c=event.target.dataset.id.split('seat')[1];
                }
                
            });


            console.log(this.currentAcc);
            this.template.querySelector('.Cbox').value=JSON.stringify(this.currentAcc);
            console.log(this.AssignSeat);
            console.log(this.data);
        }
        this.check=true;
    }
  

}