import { LightningElement,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import Opportunities from '@salesforce/schema/Opportunity'

export default class KanbanComp extends LightningElement {
    @wire(getListUi,{
        objectApiName:Opportunities,
        listViewApiName:'AllOpportunities'
    })wiredListView({error,data}){
        if(data){
            let tobj=[];
            
            data.records.records.forEach(element => {
                let opplist=element.fields;
                console.log(opplist);
                try{
                let acclist=opplist.Account.value;
            
                
                Object.entries(acclist).forEach(element => {
                    tobj.push({'key':element[1]});
                    
                });
                console.log('tobj'+JSON.stringify(tobj));
                
                console.log(acclist);
                }catch(err){
                    console.log(err);
                }
                console.log(element.id+'----'+element.fields.Name.value);
            });
        }
        if(error){
            console.log(error);
        }
    }
}