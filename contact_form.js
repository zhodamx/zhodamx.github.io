// gets the current sheet
var sheet = SpreadsheetApp.getActiveSheet()

// gets the integer number of the last row
var lastRowNumber = sheet.getLastRow();

// gets the cells starting at (last_row, col_1) and then only the 1 row, and 4 columns
// sheet.getRange(row, column, numRows, numColumns)
var row = sheet.getRange(lastRowNumber,1, 1,4);

var cells = row.getValues();

// setting the multidimensional array that getValues() returns to just
// a single dimensional array because we only want 1 row
cells = cells[0];

var date = new Date(cells[0]);



function send(){
  MailApp.sendEmail("to@gmail.com", "replyto@gmail.com", date.toLocaleString());
  //  Logger.log(items.toString());
  Logger.log(MailApp.getRemainingDailyQuota());
}
