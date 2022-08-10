import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/getAccounts.Accs';
import { refreshApex } from '@salesforce/apex';
import assignSeat from '@salesforce/apex/ContactSeat.assignSeat';
import removeSeat from '@salesforce/apex/ContactSeat.removeSeat';




const columns=[{label:'Contact Name',fieldName:'Name'},
{label:'Id', fieldName:'Id'},
{label:'SeatNo',type:'button',
typeAttributes:{label:{fieldName:'SeatNumber__c'}},
},
{label:' ',type:'button', 
typeAttributes:{label:{fieldName:'delete'}},
}
];
export default class SeatingArrangement extends LightningElement {
   @track records=[];
    @track options;
    columns=columns;
    currentAcc;
    @track data;
    AssignSeat;
    value;
    selectedId;
    deleteSeat;
    @track parameters;
    @track error;

    /** Wired Apex result so it can be refreshed programmatically */
    _wiredResult;

    @wire(getAccounts)
    wiredCallback(result){
        this._wiredResult = result;
        if (result.data) {
            console.log(result.data);
            this.parameters = result.data;
            this.error = undefined;
            let arr=[];
            this.records=result.data;
            this.records.forEach(element => {
                if(element.Contacts){
                        arr.push({label:element.Name, value:element.Id});
                    }
            });
            this.options=[...arr];
            setTimeout( () => {
                 this.value = this.selectedId; 
                 this.handleChange({'detail': {'value': this.value}});
             }, 0)
            // console.log(this.options);
            
        } else if (result.error) {
            this.error = result.error;
            this.parameters = undefined;
            console.log(this.error);
        }
    }
    //  connectedCallback(){
    //     this.options=this.options;
    //     getAccounts().then(result=>{
    //         let arr=[];
    //         this.records=result;
    //         this.records.forEach(element => {
    //             if(element.Contacts){
    //                 arr.push({label:element.Name, value:JSON.stringify(element)});
    //             }
    //         });
    //         this.options=arr;
    //         console.log(this.records);

    //     }).catch(error=>{
    //         console.log(error);
    //     })
    //  }
    handleChange(event){
        let arr=[];
        this.template.querySelectorAll('.seat').forEach(element => {
            element.label='.';
            element.variant='Neutral';
        });
        console.log(event.detail.value);
        this.selectedId = event.detail.value;
        this.currentAcc=event.detail.value;
        this.parameters.forEach(ele => {
            if(ele.Id == this.currentAcc) this.currentAcc = JSON.parse(JSON.stringify(ele))
        })
        console.log(JSON.stringify(this.currentAcc));
        this.currentAcc.Contacts.forEach(element => {
            if(!element.SeatNumber__c){
                element.SeatNumber__c='+';
                arr.push(element);
            }
            else{
                element.delete='delete';
                arr.push(element);
                    
            }
        });
   
        this.data=arr;

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
            else if(element.Level__c=='Tertiary' || !element.Level__c && element.SeatNumber__c!='+'){
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).variant='destructive';
                this.template.querySelector(`[data-id="seat${element.SeatNumber__c}"]`).label=element.SeatNumber__c; 
            }
          
        });
    }

    viewRecord(event){  
        
        console.log(JSON.stringify(event.detail));
        console.log(JSON.parse(JSON.stringify(event.detail.row)));
        if(event.detail.action.label.fieldName=='SeatNumber__c'){
            console.log('seatno butn');
        if(event.detail.row.SeatNumber__c=='+'){
            console.log('assign');
            this.AssignSeat=event.detail.row;
        }
    }
    else if(event.detail.action.label.fieldName=='delete'){
        console.log('delete button');
        removeSeat({Id:event.detail.row.Id}).then(res=>{
            console.log('seat deleted');
            this.refreshData();
        });

    }
    }
    handler(event){
        if(event.target.label=='.'){
            //console.log(JSON.parse(this.template.querySelector('.Cbox').value));
            
            this.AssignSeat.SeatNumber__c=event.target.dataset.id.split('seat')[1];
            assignSeat({id:this.AssignSeat.Id,seatNo:this.AssignSeat.SeatNumber__c}).then(result=>{
                console.log('SeatUpdated');
                this.refreshData();
                this.template.querySelector('.Cbox').value=this.currentAcc;
              
            }).catch(err=>{
                console.log(err);
            })

            // this.currentAcc.Contacts.forEach(element => {
            //     if(element.Id==this.AssignSeat.Id){
            //         element.SeatNumber__c=event.target.dataset.id.split('seat')[1];
            //     }
                
            // });


            // console.log(this.currentAcc);
            // console.log(this.template.querySelector('.Cbox').options);
            // //this.template.querySelector('.Cbox').value=JSON.stringify(this.currentAcc);
            // console.log(this.AssignSeat);
            // console.log(this.data);
            
        }
    }
    refreshData() {

            refreshApex(this._wiredResult);
            
    }
    
    delete(){
        console.log('delete button');
    }

}