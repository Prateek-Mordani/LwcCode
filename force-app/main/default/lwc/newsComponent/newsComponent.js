import { LightningElement } from 'lwc';
import retriveNews from "@salesforce/apex/newsController.retriveNews"; 
export default class NewsComponent extends LightningElement {
    result=[]
    showcmp=true;
    connectedCallback(){
        this.fetchNews();
    }
    fetchNews(){
        retriveNews().then(response=>{
            console.log(response);
            this.formatNewsData(response.articles)
         
        }).catch(err=>{
            console.log(err);
        })
    }
    formatNewsData(res){
       this.result= res.map((item,index)=>{
            let id=`new_${index}`
            let name = item.source.name;
            return {...item,id:id,name:name}
        })
    }
}