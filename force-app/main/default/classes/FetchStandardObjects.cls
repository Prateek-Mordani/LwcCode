public class FetchStandardObjects {
    @AuraEnabled
    public static list<string> getData() {
        string[] strlist=new list<string>();
        List<EntityDefinition> Llist=[SELECT  QualifiedApiName FROM EntityDefinition where NOT QualifiedApiName  like '%__c'  order by QualifiedApiName  ];
        for(EntityDefinition l:lList){
            strlist.add(l.QualifiedApiName);
        }
        return strlist;

    }
    @AuraEnabled(cacheable=true)
    public static List<FieldDefinition> rFields(string ObName){
        return [SELECT  QualifiedApiName FROM FieldDefinition WHERE EntityDefinition.QualifiedApiName = :ObName ];
    }
   
}
