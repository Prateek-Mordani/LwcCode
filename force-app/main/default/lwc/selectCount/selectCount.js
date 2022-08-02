import { LightningElement } from 'lwc';

export default class SelectCount extends LightningElement {
    variant='success';
    label1='select';
    selected=0;
    label2='select';
    variant1='success';
    variant3='success';
    label3='select';
    c1;
    handler(){
        console.log(this.label1);
        if(this.label1=='select'){
            this.c1=this.label1 +'ed';
            this.selected++;
            this.label1='deselect';
            this.variant="destructive";

        }

        else{
            this.c1=this.label1+'ed';
            this.selected--;
            this.label1="select";
            this.variant='success';
        }
    }
    handler2(){
        console.log(this.label2);
        if(this.label2=='select'){
            this.c2=this.label2 +'ed';
            this.selected++;
            this.label2='deselect';
            this.variant1="destructive";

        }

        else{
            this.c2=this.label2+'ed';
            this.selected--;
            this.label2="select";
            this.variant1='success';
        }

    }
    handler3(){
        console.log(this.label3);
        if(this.label3=='select'){
            this.c3=this.label3 +'ed';
            this.selected++;
            this.label3='deselect';
            this.variant3="destructive";

        }

        else{
            this.c3=this.label3+'ed';
            this.selected--;
            this.label3="select";
            this.variant3='success';
        }
    }
    reset(){
        this.variant='success';
        this.label1='select';
        this.label2='select';
        this.label3='select';
        this.variant1='success';
        this.variant3='success';
        this.selected=0;
        this.c1='deselected';
        this.c2='deselected';
        this.c3='deselected';
    }
}