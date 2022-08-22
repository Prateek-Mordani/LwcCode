import { LightningElement, track,api } from 'lwc';
import { OmniscriptBaseMixin } from 'vlocity_ins/omniscriptBaseMixin';

// const columns=[
//     {label:'Name',fieldName:'Name'},
//     {label:'ProductCode',fieldName:'ProductCode',editable: true, type:'Phone'},
//     {label:'description',fieldName:'Description',editable:true},
// ];

export default class TetcsvQues extends OmniscriptBaseMixin(LightningElement) {
    csvString;
    columnHeader;
    @track lines;
    check=false;
    //check1=true;
    columns1=[];
    i=0;
    data=[];

    data1 = {
        person: {
            name: "Paulo",
            lastName: "Orquillo",
            role: "Salesforce Developer"
        }
    }

    get columns(){
        if(this.count<=3)  {
        const columns=[
            {label:'Name',fieldName:'Name'},
            {label:'ProductCode',fieldName:'ProductCode',editable: true, type:'Phone'},
            {label:'description',fieldName:'Description',editable:true},
        ];
        this.columns1=columns;
    return this.columns1;
        }
        else{
            
            this.columns1.push({label:Object.keys(this.lines[0])[this.count],fieldName:Object.keys(this.lines[0])[this.count]});
            return this.columns1;
        }
     
        
    }
    
    rowOffset=0;
    check=false;
    count=3;
    handler(event){
        this.check=true;
        
        const csvFile= event.detail.files;
        //creating a promise
        let newPromise = new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.readAsText(csvFile[0]);
        })
            .then(result => {
                this.csvString = result;
                console.log("this.csvString : ");
                console.log(this.csvString);
                this.lines = JSON.parse(this.csvJSON(result));

                console.log(this.lines);
                this.data=this.lines;
            })
            .catch(error => {
                console.log(error.message.body);
            });
    }

    csvJSON(csv){
        csv = csv.replaceAll('"','');
        var lines=csv.split("\n");
        console.log(lines);
        var result = [];
      
        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers=lines[0].split(",");
      
        for(var i=1;i<lines.length;i++){
      
            var obj = {};
            var currentline=lines[i].split(",");
      
            for(var j=0;j<headers.length;j++){
                // let str = currentline[j].replaceAll('"', '');
                // console.log(str);
                obj[headers[j]] = currentline[j];  
            }
      
            result.push(obj);
      
        }
      
        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
      }


    saveHandleAction(event){
        console.log(event.detail.draftValues);  
        this.check=true;
    }

    handleSave(){
        let changedvals=JSON.parse(JSON.stringify(this.template.querySelector('.dTable').draftValues));
        changedvals.forEach(element => {
            let ind=element.name.split('-')[1];
            Object.keys(element).forEach(el => {
                this.lines[ind][el]=element[el];
                
            });
           
            
        });
    
   

        console.log(JSON.parse(JSON.stringify(this.template.querySelector('.dTable').draftValues)));

        console.log(JSON.parse(JSON.stringify(this.lines)));
    }

    AddRow(){
        this.count++;  
        console.log(Object.keys(this.lines[0])[this.count]);   
        try {
        this.columns(); 
        }catch(err){
            console.log(err);
        }
        
        console.log(this.columns1);
    }
}