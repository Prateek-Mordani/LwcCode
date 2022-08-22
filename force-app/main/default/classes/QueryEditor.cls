public class QueryEditor {
        @AuraEnabled(cacheable=true)
    public static List<string> qu(){
                List<string> finalList=new List<string>{'Account','Contact','Opportunity','lead','product2','opportunityLineItem','pricebook','user','task','case'};

        List<EntityDefinition> Llist=[SELECT  QualifiedApiName FROM EntityDefinition where QualifiedApiName like '%__c'  order by QualifiedApiName  ];
        for(EntityDefinition l:lList){
            finalList.add(l.QualifiedApiName);
        }
       
       
        return finalList;
    }
            @AuraEnabled(cacheable=true)
    public static List<FieldDefinition> rFields(string ObName){
        return [SELECT  QualifiedApiName FROM FieldDefinition WHERE EntityDefinition.QualifiedApiName = :ObName ];
    }
   
   
                @AuraEnabled(cacheable=true)
    public static List<sobject> finalQuery(string obj,List<string> fl,List<string> input,List<string> whfiled,boolean iswhere,list<string>ll){
       
        system.debug(input[0]);
        map<string,string>mmap=new map<string,string>();
        //field data type
               String objType=obj;
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
Schema.SObjectType leadSchema = schemaMap.get(objType);
Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
       
        for(string s:whfiled){
        Schema.DisplayType fielddataType = fieldMap.get(s).getDescribe().getType();
                system.debug(s+'=>'+string.valueOf(fielddataType));
            mmap.put(s,string.valueOf(fielddataType));
               
        }
        system.debug(mmap);
       
        //query
        string que='';
        integer i=0;
        for(string ss:mmap.keyset()){
            if(mmap.get(ss)=='string' ||mmap.get(ss)=='Id' ){
                que+=' '+ll[i] +' '+ss+' = '+'\''+input[i]+'\'';
            }
            else{
                que+=' '+ll[i] +' '+ss+' = '+input[i];
            }
            i++;
        }
//final query
string q='select '+string.join(fl,',')+' from '+obj;  
        system.debug(q);
        system.debug(que);
        if(iswhere){
       
        return database.query(q+que);
            }
        else{
                    return database.query(q);
        }
       
       
    }
}