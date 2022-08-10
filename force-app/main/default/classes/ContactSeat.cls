public with sharing class ContactSeat {
    @AuraEnabled
    public static void assignSeat(string id, integer seatNo) {
            contact con=[select name,seatNumber__c,level__c from contact where id =:id];
            con.seatNumber__c=seatNo;
            update con;
        }
    @AuraEnabled
    public static void removeSeat(string Id){
        contact con =[select name,seatnumber__c,level__c from contact where id=:Id];
        con.seatNumber__c=null;
        update con;
    }
}