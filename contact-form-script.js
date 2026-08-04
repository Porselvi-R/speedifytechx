/**
 * Google Apps Script for SpeedifyTechX Contact Form
 * 
 * This script handles form submissions from the website contact form
 * and stores the data in a Google Sheets spreadsheet.
 * 
 * Deploy URL: https://script.google.com/macros/s/AKfycbwb1xOZ2dAZLcj-FLeYNZ_lhcA1wj7bRTc4RPSGiB1c1CkGwKHmDR3ghJ3FoPlisk-QeQ/exec
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheets spreadsheet
 * 2. Copy the spreadsheet ID from the URL
 * 3. Update the SHEET_ID constant below
 * 4. Deploy the script as a web app
 * 5. Update the SCRIPT_URL in main.js with the deployment URL
 */

const SHEET_ID = "1SKB4qB2JRhGdTfYs7v1LQbWIDPJkfExLpMqECByhATo";

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
        
        // Add header row if the sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(["Timestamp", "Name", "Email", "Service", "Message"]);
        }
        
        // Add the form data
        sheet.appendRow([
            e.parameter.timestamp,
            e.parameter.name,
            e.parameter.email,
            e.parameter.service,
            e.parameter.message
        ]);
        
        return ContentService.createTextOutput(JSON.stringify({ 
            status: "success" 
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ 
            status: "error", 
            message: error.toString() 
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function doGet() {
    return ContentService.createTextOutput("Speedify Tech X Contact API Running");
}