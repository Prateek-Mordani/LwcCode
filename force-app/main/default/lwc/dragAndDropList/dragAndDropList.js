import { api, LightningElement } from 'lwc';

export default class DragAndDropList extends LightningElement {
    @api record;
    @api stage;
    handler(evt){
        const event= new CustomEvent('listitemdrag',{
            detail:evt.detail
        })
        this.dispatchEvent(event);
    }
    handleDrop(){
        const event= new CustomEvent('itemdrop',{
            detail:this.stage
        })
        this.dispatchEvent(event);
    }
    handleDragOver(evt){
        evt.preventDefault() 
    }
 }
