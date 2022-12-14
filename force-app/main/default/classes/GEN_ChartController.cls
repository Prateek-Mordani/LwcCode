public class GEN_ChartController {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getOpportunities(string recId){
        return [SELECT SUM(ExpectedRevenue) expectRevenue, SUM(Amount) amount, StageName stage 
        FROM Opportunity WHERE StageName NOT IN ('Closed Won') and accountId=:recId GROUP BY StageName LIMIT 20];
    }
}