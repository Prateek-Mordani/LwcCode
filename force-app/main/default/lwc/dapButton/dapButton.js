import { LightningElement } from 'lwc';
export default class DapButton extends LightningElement {
    showbutton=false;
    showtime(){
        this.showbutton=true;
    }
}