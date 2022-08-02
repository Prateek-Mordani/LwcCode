import { api, LightningElement, track } from 'lwc';
import GetOpportunitiesOfAccount from '@salesforce/apex/FetchOpportunities.GetOpportunitiesOfAccount';
import updatestatus from '@salesforce/apex/FetchOpportunities.updatestatus';

export default class Opportunity extends LightningElement {
    @api recid;
     @track Opportunities=[];
    obj={
        'el1':{},
        'el2':{},
        'el3':{}
    }
    CurrStats;
    check=false;
    @track status=[{'val':'Prospecting','vari':'Neutral'},{'val':'Value Proposition','vari':'Neutral'},{"val":'Needs Analysis','vari':'Neutral'},{'val':'Qualification','vari':'Neutral'},{'val':'Closed Won','vari':'Neutral'},{'val':'Closed Lost','vari':'Neutral'},{'val':'All','vari':'Neutral'}];
    connectedCallback(){
    }
    ShowRes(event){
         this.Opportunities=[];
        let label=event.target.label;
        let index=event.target.value;
       
        this.status.forEach(element => {
            if(element.vari=='Brand')
                element.vari='Neutral'
        });
        this.status[index].vari='Brand';
        this.CurrStats=label;
        let i=0;
        let j=0;
        GetOpportunitiesOfAccount({RecId:this.recid,Label:label}).then(result=>{
            console.log(result);
            this.check=true;
            result.forEach(element => {
                i++;
                let str='el'+i;  
                this.obj[str]=element;

                if(i%3==0){
                   
                    this.Opportunities.push(this.obj);
                    i=0;
                }

            });
            if(result.length%3!=0){
                if(result.length%3==1){
                    this.obj={
                        'el1':{},
                        'el2':{},
                        'el3':{}
                    };
                    this.obj.el1=result[result.length-1];
                    this.obj.el2=false;
                    this.obj.el3=false;
                   this.Opportunities.push(this.obj);
                }
                else if(result.length%3==2){
                    this.obj={
                        'el1':{},
                        'el2':{},
                        'el3':{}
                    };
                    this.obj.el1=result[result.length-1];
                    this.obj.el2=result[result.length-2];
                    this.obj.el3=false;
                    this.Opportunities.push(this.obj);
                    console.log("from if block"+this.Opportunities);
                  
                }
            }
            console.log(this.Opportunities);
            
        })
        .catch(error=>{
            console.log(error);
        })
        

    }

    changestats (event){
        console.log(event.target.label);
        console.log(event.target.value);
        updatestatus({recId:event.target.value,status:event.target.label}).then(result=>{
            console.log(result);
            console.log('updated');
        })
        .catch(error=>{
            console.log(error);
        })

    }
}