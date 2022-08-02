import { api, LightningElement } from 'lwc';
import updatestatus from '@salesforce/apex/fslCompClass.updatestatus';
import updatedate from '@salesforce/apex/fslCompClass.updatedate';
import fetchappoints from '@salesforce/apex/fslCompClass.fetchappoints';
export default class FslComp extends LightningElement {
@api recordId;
options=[{label:"Re-Schedule", value:'0'},{label:"Canceled", value:'1'}];
toptions=[{label:"not enough tools", value:'first'},{label:"not enough will",value:'sec'}];
check=false;
status;
tcheck=false;
app=[];

comboHandler(){
    this.check=true;
}

handler(){
    let picval=this.template.querySelector(".combo").value;
    console.log(picval);
    if(picval=="1"){
        updatestatus({recId:this.recordId}).then(result=>{
            this.status="record updated successfully";
        }).catch(error=>{
            console.log(error);
            window.alert(JSON.stringify(error.body));
        });
    }
    else{
        this.tcheck=true;
    }
}
updatehandler(){
    let start=this.template.querySelector('.startdt').value.replace("T"," ");
    let end=this.template.querySelector('.enddt').value.replace("T"," ");
    
   // window.alert(start,'===========');
    //window.alert(this.recordId);

    updatedate({recId:this.recordId,start:start,Scend:end}).then(result=>{
        this.status='date changed successfully';
    }).catch(error=>{
        console.log(error);
        window.alert(JSON.stringify(error.body));
    })

}

}