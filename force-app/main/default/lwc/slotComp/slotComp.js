import { api, LightningElement } from 'lwc';

import getSlots from '@salesforce/apex/slotclass.main';
import main2 from '@salesforce/apex/slotclass.main2';

export default class SlotComp extends LightningElement {
    @api recordId;
    options=[];
    resId="";
    start;
    end;
    message;
    connectedCallback(){
        
        getSlots({RecId:this.recordId}).then(result=>{
            let arr=[];
         this.resId=result[0];
         JSON.parse(result[1]).forEach(element => {
            arr.push({'label':element.Interval.Start+"-"+element.Interval.Finish, 'value':element.Interval.Start+"|"+element.Interval.Finish});
         });
         this.options=arr;
              }
        )
    .catch(error=>{console.log("error"+error);});
    }
    handleData(event){
       let current= event.target.value.split('|');
       let start=current[0];
       let Finish=current[1];
       this.start=start;
       this.end=Finish;
       
    }

    handleSlot(){
     
        main2({i:this.recordId,a:this.start,b:this.end,iob:this.resId})
        .then(result=>{this.message="record updated successfully";})
        .catch(error=>{console.log(error);})
        

      
    }

   
}