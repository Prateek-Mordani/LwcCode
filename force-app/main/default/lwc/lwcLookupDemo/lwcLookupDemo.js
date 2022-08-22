import { LightningElement, track } from 'lwc';  
import { OmniscriptBaseMixin } from 'vlocity_ins/omniscriptBaseMixin';
 export default class LwcLookupDemo extends OmniscriptBaseMixin(LightningElement) { 
   @track ContactName;  
   @track ContactId;  
   @track accountId='0015i00000AEO3KAAX';

   connectedCallback() {
	const jsonData = JSON.parse(JSON.stringify(this.omniJsonData));
    console.log(jsonData);
    }

   onAccountSelection(event){  
   this.ContactName = event.detail.selectedValue;  
   this.ContactId = event.detail.selectedRecordId;  
   }  
 }  