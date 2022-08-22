import { LightningElement } from 'lwc';
import queryAllObjects from '@salesforce/apex/soslSearch.queryAllObjects';
const columns = [
    { label: 'Name', fieldName:'Name'},
    { label: 'Id', fieldName: 'Id' }, 
    {label:'',type:'button', 
    typeAttributes:{label:{fieldName:'fav'},variant:'neutral',class:'Dbtn'},
    }
];
export default class Assignment6Lwctask extends LightningElement {
    soslResult=[];
    columns=columns;
    check=false;
    favList=[];
    cleared=false;
    data;
    ref=true;

    handleChange(){
        console.log('changed');
    }

    handleClick(){
        this.cleared=false;
        let searchKey=this.template.querySelector('.search').value;
        console.log(searchKey);
        queryAllObjects({searchKey:searchKey}).then(result=>{
            let fieldList=['Account','Contact','Opportunity','Lead','Product2','User','Bank Account'];
            let i=0;
            let tempData=[];
            result.forEach(element => {
                element.forEach(element1 => {
                    element1.fav='F';
                });
                tempData.push({'type':fieldList[i],'records':element});
                i++;
            });
            let arr=[];
            tempData.forEach(element => {
                if(element.records != 0){
                    arr.push(element);
                }
            });
            this.soslResult=arr;
            console.log(result);
        }).catch(error=>{
            console.log(error);
        })
    }

    ClearData(){
        this.soslResult=[];
        this.check=false;
        this.template.querySelector('.search').value='';
        this.cleared=true;
        this.data=this.favList;
    }

    LockField(){
        console.log('locked');
        this.check=true;
    }

    viewRecord(event){
        console.log(JSON.parse(JSON.stringify(event.detail.action)));
        if(event.detail.row.fav =='F'){
            event.detail.row.fav ='UF';
            this.favList.push(event.detail.row);
        }
        else{
            event.detail.row.fav='F';
            for(let i=0;i<this.favList.length;i++){
                if(this.favList[i].Id==event.detail.row.Id){
                    this.favList.splice(i,1);
                                 
                }
            }
           // this.favList[1]='';
        }
        // console.log(event.detail.action.variant);
        console.log(JSON.parse(JSON.stringify(event.detail.row)));
        console.log(this.favList);
    }
}