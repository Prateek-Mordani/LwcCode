import { LightningElement,track,wire } from 'lwc';
import wirelist from "@salesforce/apex/wireDemo.wirelist";
const columns=[
    {label:"Name", fieldName:'Name'},
    {label:'Account',fieldName:'Id'}
];

export default class WireDemo extends LightningElement {
  @track columns=columns; 
  @track data=[];

  @wire(wirelist)
  wiredplayer({data ,error}){
    if(data){
        this.data=data;
    }
    else if(error){
        console.log("error calling the apex class" );
    }
  }
}