import { api, LightningElement } from 'lwc';
const columns = [
    { label: 'Website', fieldName: 'website', type: 'svg' },
    {label:'name', fieldName:'name'}
];

export default class GrandparentComp extends LightningElement {
    value='n';
    selected=0;
    alternate=true;
    alternate1=true;
    alternate2=true;
    butt;
    columns=columns;
    data=[];
    connectedCallback(){
        console.log("asdsadasd");
       console.log(this.butt);
       this.data.push({name:'prateek',website:'https://static.thenounproject.com/png/551749-200.png'});  
    }
    handler(){
        if(this.alternate){
            this.selected++;
            this.alternate=false;
        }
        else{
            this.selected--;
            this.alternate=true;
        }
    }

    handler1(){
        if(this.alternate1){
            this.selected++;
            this.alternate1=false;
        }
        else{
            this.selected--;
            this.alternate1=true;
        }
    }

    handler2(){
        if(this.alternate2){
            this.selected++;
            this.alternate2=false;
        }
        else{
            this.selected--;
            this.alternate2=true;
        }
    }
    
    reset(){  
        var butt1=this.template.querySelector('.btn');
        console.log(butt1);
        this.butt=butt1;
        this.template.querySelector('c-parent-comp').reset();
        this.selected=0;
        this.value='reset';
        this.alternate=true;
    this.alternate1=true;
    this.alternate2=true;
    }
}