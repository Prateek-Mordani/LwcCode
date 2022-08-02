import { LightningElement } from 'lwc';
import qu from '@salesforce/apex/QueryEditor.qu';
import rFields from '@salesforce/apex/QueryEditor.rFields';
import finalQuery from '@salesforce/apex/QueryEditor.finalQuery';

export default class QueryMaker extends LightningElement {
    options;
    value = 'inProgress';
    lstOptions;
    lstSelected;
    lstSelected1
    lstSelected2
    whereReq=false;
    count=0;
    labelarr=['where']
    arr=[{combo:"Where",fi:"id",la:this.labelarr[0]}];
    datarecord
    columns
    //calling objects
connectedCallback(){
    qu()
    .then(result=>{
        let temp=[];
        console.log(result);
        result.forEach(element => {
            temp.push( { label:element, value: element }   )
        });
this.options=temp;
    })
}
    
//calling fields
    handleChange(event) {
        this.value = event.detail.value;
        rFields({ObName:this.value})
        .then(resultt=>{
            let temp=[];
            console.log(resultt);
            resultt.forEach(element => {
                temp.push({ label:element.QualifiedApiName, value: element.QualifiedApiName })
            });2

            0
            
            this.lstOptions=temp;
            console.log(this.lstOptions);
        })
    }

//chacking where
    wantWhere(event){
        if(event.target.checked){
            this.whereReq=true;

        }
    }
    //and or
    andOr(event){
        this.count++;
        let lab=event.target.label;
        this.labelarr.push(lab);

        let arr2=[]

        for(let i=0;i<this.count;i++){
            this.lstSelected1=this.template.querySelectorAll('.Where')[i].value;
            let a =JSON.stringify( this.lstSelected1).replaceAll('"', '');
        
            this.lstSelected2=this.template.querySelectorAll('.whfield')[i].value;
            let b =JSON.stringify( this.lstSelected2).replaceAll('"', '');

        

            arr2.push({combo:b,fi:a,la:this.labelarr[i]});

            }

            arr2.push({combo:'',fi:'',la:lab});
            this.arr=arr2;




        this.whereReq=false;
        this.whereReq=true;



        }
    //submit
    handleChange1() {
            this.lstSelected=this.template.querySelectorAll('.Fields')[0].value;
            let whfiled=[];
            let input=[];
            let temp2=[]


           
            if(this.whereReq){
                
                for(let i=0;i<=this.count;i++){
                    this.lstSelected1=this.template.querySelectorAll('.Where')[i].value;
                    console.log(JSON.stringify( this.lstSelected1));
                    input.push(JSON.stringify( this.lstSelected1).replaceAll('"', ''));
                
                    this.lstSelected2=this.template.querySelectorAll('.whfield')[i].value;
                    whfiled.push(JSON.stringify( this.lstSelected2).replaceAll('"', ''));
                    }

            finalQuery({obj:this.value, fl:this.lstSelected ,input:input, whfiled:whfiled,iswhere:this.whereReq,ll:this.labelarr})
            .then(resul=>{
                this.datarecord=resul;
                Object.keys(resul[0]).forEach(element => {
                    temp2.push({ label: element, fieldName:element });

                });
                this.columns=temp2;

            })
            .catch(error=>{
                console.log(error)

            })
        }
        else{
            finalQuery({obj:this.value, fl:this.lstSelected ,input:'id', whfiled:'id',iswhere:this.whereReq,ll:this.labelarr})
            .then(resul=>{
                this.datarecord=resul;
                Object.keys(resul[0]).forEach(element => {
                    temp2.push({ label: element, fieldName:element });

                });
                this.columns=temp2;

            })
            .catch(error=>{
                console.log(error)

            })

        }


        }
    }