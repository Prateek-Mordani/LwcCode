public  class FetchOpportunities {
    @AuraEnabled
    public static list<Opportunity> GetOpportunitiesOfAccount(Id RecId, string Label) {
        Schema.FieldSet fs1 = Schema.SObjectType.opportunity.fieldSets.getMap().get('OpportunityFs');
        system.debug(fs1);
        Schema.FieldSetMember[] fs2=fs1.getfields();
        string str='';
        for(Schema.FieldSetMember sc:fs2){
            str+=','+sc.getFieldPath();      
    }
    string query='select '+str.removestart(',')+' from opportunity where accountId=:RecId and stagename=:Label';
    opportunity[] opplist=Database.query(query);
    system.debug(opplist);
    return opplist;
}
    @AuraEnabled
    public static void updatestatus(Id recId, string status){
        Opportunity opp=[select stagename from Opportunity where id=:recId];
        opp.StageName=status;
        update opp;
    }

}
