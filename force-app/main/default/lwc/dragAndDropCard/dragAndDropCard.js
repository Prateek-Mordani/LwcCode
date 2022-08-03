import { api, LightningElement } from 'lwc';
import { NavigationMixin }  from 'lightning/navigation'
export default class DragAndDropCard extends NavigationMixin(LightningElement) {
    @api stage;
    @api record;
    get sameStage(){
        return this.stage == this.record.StageName;
    }

    navHandler(event){
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:event.target.dataset.id,
                objectApiName:'Opportunity',
                actionName:'view'
            }
        })
    }
    accNav(event){
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:event.target.dataset.id,
                objectApiName:'Account',
                actionName:'View'
            }
        })

    }
    itemDragStart(){
        const event= new CustomEvent('itemdrag',{
            detail:this.record.Id
        })
        this.dispatchEvent(event);
    }
}