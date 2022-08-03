import { LightningElement,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import Opportunities from '@salesforce/schema/Opportunity'
import { updateRecord } from 'lightning/uiRecordApi';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import stage_field from '@salesforce/schema/Opportunity.StageName';
import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class KanbanComp extends LightningElement {
    records;
    pickVal;
    recordId;
    
    @wire(getListUi,{
        objectApiName:Opportunities,
        listViewApiName:'AllOpportunities'
    })wiredListView({error,data}){
        if(data){
            let arr=[];
            console.log(data);
            data.records.records.forEach(element => {
                let opplist=element.fields;
                if(opplist.Account.value != null){
                    let account=opplist.Account.value.fields;
                    arr.push({'Id':opplist.Id.value, 'Name':opplist.Name.value,'AccountId':account.Id.value,'AccountName':account.Name.value,'CloseDate':opplist.CloseDate.value,'StageName':opplist.StageName.value,'Amount':opplist.Amount.value});
                }
                else{
                    arr.push({'Id':opplist.Id.value, 'Name':opplist.Name.value,'AccountId':null,'AccountName':null,'CloseDate':opplist.CloseDate.value,'StageName':opplist.StageName.value,'Amount':opplist.Amount.value});
                }
                //console.log(account);
            });
            this.records=arr;
            console.log(arr);
        }
        if(error){
            console.log(error);
        }
    }

    //fetching opportunity stage values
    @wire(getObjectInfo,{objectApiName:Opportunities})objectInfo

    @wire(getPicklistValues,{recordTypeId:'$objectInfo.data.defaultRecordTypeId',fieldApiName:stage_field})
    stagePicklistValue({data,error}){
        if(data){
            console.log('stage picklist',data);
            this.pickVal=data.values.map(item=>item.value);   
            console.log(this.pickVal);
        }
        if(error){
            console.log(error);
        }
    }

    //getter to set the width
    get calcWidth(){
        let len= this.pickVal.length+1;
        return `width : calc(100vw/${len})`

    }
 
    handleDrag(event){
        console.log("dragging");
        this.recordId=event.detail;
        console.log(this.recordId);
    }

    handleItemDrop(event){
        let stage= event.detail;
        // this.records = this.records.map(item=>{
        //     return item.Id === this.recordId ? {...item, StageName:stage}:{...item};
        // })
        this.updateHandler(stage);
    }

    updateHandler(stage){
        const fields={}
        fields[ID_FIELD.fieldApiName]= this.recordId;
        fields[stage_field.fieldApiName]=stage
        const recordInput={fields}
        updateRecord(recordInput).then(()=>{
            console.log("updated successfully");
            this.showToast();
        }).catch(error=>{
            console.log(error);
        })
    }
    showToast(){
        this.dispatchEvent(
            new ShowToastEvent({
                title:'Success',
                message:'stage updated successfully',
                variant:'success'
            })
        )
    }
}