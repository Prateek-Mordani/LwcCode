import { LightningElement ,track} from 'lwc';

export default class TrainComp extends LightningElement {
    falsee = false;
    @track Track1='Track 1'; 
    @track Track2='Track 2';
    @track Track3='Track 3';
    @track Track4='Track 4';
    @track Track5='Track 5';
    @track Track6='Track 6';
    @track photo1 = 'https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
    @track photo2 = 'https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
    @track photo3 = 'https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
    @track photo4 = 'https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
    @track photo5 = 'https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
    @track photo6 = 'https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';

    trainphoto="https://c.tenor.com/tkvt49JLQb4AAAAj/train-green-train.gif";
    TName;Arr;Dep;i=0;
    TrainDetail = [];
    
    addTrain(){
        this.TrainDetail.push({Name:this.template.querySelector('.train').value,Arrival:this.template.querySelector('.ArrTime').value,Dep:this.template.querySelector('.DepTime').value});
       
        //console.log(this.TrainDetail[0]);
    }
    showTrain(){
        let ShowTime = this.template.querySelector('.ShowTrainTime').value;
        this.Track1='Track 1'
        this.Track2='Track 2'
        this.Track3='Track 3'
        this.Track4='Track 4'
        this.Track5='Track 5'
        this.Track6='Track 6'
        this.photo1='https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
        this.photo2='https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
        this.photo3='https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
        this.photo4='https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
        this.photo5='https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';
        this.photo6='https://th.bing.com/th/id/R.c8b9a82899455a9f767906990b86d905?rik=L6YJvA%2bdMujM1A&riu=http%3a%2f%2fclipartmag.com%2fimages%2frailroad-tracks-clipart-48.jpg&ehk=SWUa1sztVpChtRcOhqtsklA0PqYZusP47bHw5nOm7wk%3d&risl=&pid=ImgRaw&r=0';

        

        for(let i=0;i<this.TrainDetail.length;i++){
            
            if(this.TrainDetail[i].Arrival<ShowTime&&this.TrainDetail[i].Dep>ShowTime){
                
          
            if(this.Track1=='Track 1'){
                this.Track1 = this.TrainDetail[i].Name;
                this.photo1=this.trainphoto;
                
           }
           else if(this.Track2=='Track 2'){
               this.Track2 = this.TrainDetail[i].Name;
               this.photo2=this.trainphoto;
               
           }
           else if(this.Track3=='Track 3' && this.Track2=='Track 2'){
               this.Track3 = this.TrainDetail[i].Name;
               this.photo3=this.trainphoto;
               
           }
           else if(this.Track4=='Track 4' && this.Track5=='Track 5'){
               this.Track4 = this.TrainDetail[i].Name;
               this.photo4=this.trainphoto;
               
           }
          
           else if(this.Track4!='Track 4'||this.Track5!='Track 5'){
               this.Track6 = this.TrainDetail[i].Name;
               this.photo6=this.trainphoto;
               
           }
       
           else if(this.Track6=='Track 6'){
               this.Track6 = this.TrainDetail[i].Name;
               this.photo6=this.trainphoto;
               
           }
           
        }
        
      
     
    
    }
} 
}