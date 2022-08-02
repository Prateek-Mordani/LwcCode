import { LightningElement } from 'lwc';
import imageTableControl from './imageTableControl.html';
export default class SalesforceCodexDataTable extends LightningElement {
    static customTypes = {
        image: {
            template: imageTableControl
        }
    };
}