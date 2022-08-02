import { api, LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    isSelected='deselected';
    isSelected1='deselected';
    isSelected2='deselected';
    @api temp;
    handler(){
        this.dispatchEvent(new Event('select'));
        if(this.isSelected=='selected'){
            this.isSelected='deselected';
            
        }
        else{
            this.isSelected='selected';
        }
        
    }

    handler1(){
        this.dispatchEvent(new Event('select1'));
        if(this.isSelected1=='selected'){
            this.isSelected1='deselected';
            
        }
        else{
            this.isSelected1='selected';
        }
        
    }

    handler2(){
        this.dispatchEvent(new Event('select2'));
        if(this.isSelected2=='selected'){
            this.isSelected2='deselected';
            
        }
        else{
            this.isSelected2='selected';
        }
        
    }
    
    handler8(){
   
        let temp1=this.template.querySelector('.tdiv');
        temp1.appendChild(this.temp);
        console.log(this.temp);
    }
   @api reset(){
    this.isSelected='deselected';
    this.isSelected1='deselected';
    this.isSelected2='deselected';
    this.template.querySelector('c-child-comp').resetall();
}
}