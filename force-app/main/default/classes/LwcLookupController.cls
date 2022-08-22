public class LwcLookupController {  
    @AuraEnabled
    public static List<sobject> findRecords(String searchKey, String objectName, string accId) {  
      string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';  
      string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6';  
      string str='SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+'and accountId=:'+accId+' LIMIT 6';
      system.debug(str);
      return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+'and accountId=:'+accId+' LIMIT 6');  
    }  
  }  
