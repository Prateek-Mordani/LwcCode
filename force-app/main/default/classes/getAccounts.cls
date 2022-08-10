public with sharing class getAccounts {
    @AuraEnabled(cacheable=true)
    public static list<account> getAccounts() {
        return[select name,AnnualRevenue,(select name,level__c,SeatNumber__c from contacts) from Account];

    }
}
