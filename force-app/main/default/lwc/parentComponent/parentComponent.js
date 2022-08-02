import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handler(){
        this.template.querySelector("c-child-component").handlerForParent();
    }
}