import { api, LightningElement ,track} from 'lwc';

export default class AssignmentCom extends LightningElement {
  @track count=0

  handler(){    
      this.count=0;     
       let TextAreaVal=this.template.querySelector('lightning-textarea').value;
       let TextFieldVal=this.template.querySelector('.textfield').value;
       let arr=TextAreaVal.split(/[\s,-]+/);
              let count=0;
       for(let i=0;i<arr.length;i++){
       if(arr[i]==TextFieldVal)
           this.count+=1;
    }
}
}