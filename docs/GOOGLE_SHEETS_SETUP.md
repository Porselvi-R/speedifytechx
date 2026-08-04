# Google Sheets Contact Form Integration Guide

## 📊 **Connect Your Contact Form to Google Sheets**

Your contact form is already configured to use Google Apps Script. Follow these steps to set up the spreadsheet.

---

## 🚀 **Step-by-Step Setup**

### **Step 1: Create a New Google Spreadsheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"SpeedifyTechX Contact Form Submissions"**

### **Step 2: Set Up the Spreadsheet Headers**

In Row 1, add these column headers:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Subject | Message |

### **Step 3: Open Apps Script Editor**

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the code below:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = e.parameter;
    
    // Get current timestamp
    var timestamp = new Date();
    
    // Append data to spreadsheet
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.subject || '',
      data.message || ''
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Data saved successfully" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### **Step 4: Deploy the Script**

1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: SpeedifyTechX Contact Form
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize** the script (you may need to click "Advanced" and "Go to [project name]")
7. **Copy the Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/XXXXXXXX.../exec
   ```

### **Step 5: Update Your Website Code**

1. Open `speedifytechx/js/main.js`
2. Find this line near the top (around line 8):
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzs_NUHq_nVzkxeo6KPdxNv7sAggWyiKwD8an2F4Doop9Rla_VfoNQG5qagt4LL_t-sEw/exec';
   ```
3. Replace it with your new Web App URL:
   ```javascript
   const SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
   ```

### **Step 6: Test the Form**

1. Open your `contact.html` page in a browser
2. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 86105 35231
   - Subject: Test Submission
   - Message: Testing the contact form
3. Click **Send Message**
4. Check your Google Sheet - a new row should appear with the data!

---

## 🎨 **Optional: Format Your Spreadsheet**

### **Add Conditional Formatting:**
1. Select row 1 (headers)
2. Make it **bold** and add a background color
3. Freeze the header row: **View** > **Freeze** > **1 row**

### **Auto-resize Columns:**
1. Select all columns
2. Right-click > **Resize columns** > **Fit to data**

### **Add Status Column:**
1. Add a new column G with header "Status"
2. Use dropdown: **Data** > **Data validation**
3. Criteria: List of items: `New, Read, Replied, Closed`

---

## 📧 **Optional: Email Notifications**

Add email notifications when someone submits the form:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter;
    var timestamp = new Date();
    
    // Append data to spreadsheet
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.subject || '',
      data.message || ''
    ]);
    
    // Send email notification (OPTIONAL - uncomment to enable)
    /*
    MailApp.sendEmail({
      to: "your-email@example.com",  // Change this to your email
      subject: "New Contact Form Submission - " + (data.subject || 'No Subject'),
      body: "New contact form submission:\n\n" +
            "Name: " + (data.name || '') + "\n" +
            "Email: " + (data.email || '') + "\n" +
            "Phone: " + (data.phone || '') + "\n" +
            "Subject: " + (data.subject || '') + "\n" +
            "Message: " + (data.message || '') + "\n\n" +
            "Timestamp: " + timestamp
    });
    */
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Data saved successfully" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 🔧 **Troubleshooting**

### **Form submits but no data in sheet:**
- Check that the Script URL in main.js is correct
- Make sure you deployed as "Anyone" can access
- Check if authorization is complete

### **"Authorization needed" error:**
- Re-authorize the script
- Try deploying a new version

### **Data not appearing:**
- Check the spreadsheet name matches
- Verify column headers are correct
- Check browser console for errors (F12)

---

## 📱 **View Your Data**

Access your Google Sheet anytime at:
https://sheets.google.com

All form submissions will appear automatically with:
- ✅ Timestamp of submission
- ✅ Contact details
- ✅ Full message content
- ✅ Organized in rows

---

## 🎉 **You're All Set!**

Your contact form is now connected to Google Sheets. Every submission will be automatically saved to your spreadsheet!

**Need help?** Check the troubleshooting section or test with sample data first.
