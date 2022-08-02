import { LightningElement } from 'lwc';
import getData from '@salesforce/apex/FetchStandardObjects.getData';
import getLimits from '@salesforce/apex/FetchStandardObjects.getLimits';
import getOrglimitsMod from '@salesforce/apex/FetchStandardObjects.getOrglimitsMod';
export default class TetQuestion extends LightningElement {
    objects;
    licenses=[];
    OrgLimits=[];

    value = ['option1'];

    get options() {
        return [
            { label: 'FormulaField', value: 'FormulaField' },
            { label: 'RollUp', value: 'RollUp' },
            { label:'Lookups',value:'lookup'},
            {label:'Master-Detail',value:'Master-Detail'}
        ];
    }

    get selectedValues() {
        return this.value.join(',');
    }

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

        getLimits().then(res=>{
            let arr=[];
            console.log(res);
            res.forEach(element => {
                let obj={'Ogval':element,
                            'AvailableLicense':element.TotalLicenses-element.UsedLicenses}
                
                arr.push(obj);
            });
            console.log("arr value");
            console.log(arr);
            this.licenses=arr;
        }).catch(err=>{
            console.log(error);
        })

        getOrglimitsMod().then(res=>{
            let arr=[];
            console.log(res);
            let i=0;
            res.forEach(element => {
                i++;
                let value=JSON.stringify(element).split(":")[1].replace('}','');
                let key=JSON.stringify(element).split(":")[0].replace('{','');
              let obj={
                'Name':key,
                'value':value,
                'id':i
              }
              arr.push(obj);

            });
            this.OrgLimits=arr;
            console.log(typeof res[0]);

        }).catch(err=>{
            console.log(err);
        })
    }
}