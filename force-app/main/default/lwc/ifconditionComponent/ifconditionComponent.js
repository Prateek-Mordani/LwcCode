import { LightningElement,track } from 'lwc';

export default class IfconditionComponent extends LightningElement {
    buttonl='show';
    @track visibility=false;

    handler(event){
        const label=event.target.label;

        if(label == 'show'){
            this.buttonl='hide';
            this.visibility=true;
        }
        else {
            this.buttonl='show';
            this.visibility=false;
        }
    }
}