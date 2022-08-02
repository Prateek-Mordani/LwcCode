import { LightningElement ,api} from 'lwc';

export default class ChildComp extends LightningElement {
    label1='select';
    variant1='success';
    label2='select';
    variant2='success';
    label3='select';
    variant3='success';
    handler1(){
        this.dispatchEvent(new Event('select'),{
            
        });
        if(this.label1=='deselect'){
            this.variant1='success';
            this.label1='select';
        }
        else{
            this.label1='deselect';
            this.variant1='destructive';
        }
    }
    handler2(){
        this.dispatchEvent(new Event('select1'));
        if(this.label2=='deselect'){
            this.variant2='success';
            this.label2='select';
        }
        else{
            this.label2='deselect';
            this.variant2='destructive';
        }
    }
    handler3(){
        this.dispatchEvent(new Event('select2'));
        if(this.label3=='deselect'){
            this.variant3='success';
            this.label3='select';
        }
        else{
            this.label3='deselect';
            this.variant3='destructive';
        }
    }
    @api resetall(){
        this.label1='select';
        this.variant1='success';
        this.label2='select';
        this.variant2='success';
        this.label3='select';
        this.variant3='success';
        
    }
}