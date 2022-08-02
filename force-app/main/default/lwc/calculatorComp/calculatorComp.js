import { LightningElement } from 'lwc';

export default class CalculatorComp extends LightningElement {
    arr=['1','2','3','4','5','6','7','8','9','0','+','-','*','/'];
    handler(){
        let a=this.template.querySelector(".inp").value;
        console.log(a);
        let b=eval(a);
        console.log(b);
    }

    arr={key:[{keys:"value"}]}
    connectedCallback(){
        

    }
    
}