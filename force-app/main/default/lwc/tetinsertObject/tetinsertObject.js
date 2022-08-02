import { LightningElement } from 'lwc';
import getData from '@salesforce/apex/FetchStandardObjects.getData';
import rFields from '@salesforce/apex/FetchStandardObjects.rFields';
export default class TetinsertObject extends LightningElement {
    objects;
    fields;
    connectedCallback(){
        getData().then(res=>{
            console.log(res);
            let opt=[];
            res.forEach(element => {
                opt.push({label:element,value:element});
            })
            this.objects=opt;
        }).catch(err=>{
            console.log(err);
        })
    }
    handleChange(event){
        console.log('cahnges');
        rFields({ObName:event.target.value}).then(result=>{
            console.log(result);
            let arr=[];
            result.forEach(element => {
               arr.push({label:element.QualifiedApiName,value:element.QualifiedApiName});        

            });
            this.fields=arr;
        })

        

    }
    fieldChange(event){
        let fields=event.target.value;
        

    }

}  