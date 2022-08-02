import { LightningElement } from 'lwc';

export default class TrialComp extends LightningElement {
    show=true;
    connectedCallback(){
        let a=this.template.querySelector(".trial");
        console.log(a);
    }
    handler(){
        this.show=true;
    }
}