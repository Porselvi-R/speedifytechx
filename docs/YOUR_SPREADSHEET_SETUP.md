# Setup Guide for Your SpeedifyTechX Spreadsheet

## 📊 Your Google Spreadsheet
**Spreadsheet ID**: `1sV--5q4bkufr3eYnsE4KzedCLUXMJhvVfl-1-mwIQuM`

**Direct Link**: https://docs.google.com/spreadsheets/d/1sV--5q4bkufr3eYnsE4KzedCLUXMJhvVfl-1-mwIQuM/edit

---

## ✅ Quick Setup Steps

### **Step 1: Open Your Spreadsheet**
Click this link to open your spreadsheet:
👉 https://docs.google.com/spreadsheets/d/1sV--5q4bkufr3eYnsE4KzedCLUXMJhvVfl-1-mwIQuM/edit

### **Step 2: Set Up Column Headers**
Make sure Row 1 has these exact headers:

| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| Timestamp | Name | Email | Phone | Subject | Message |

### **Step 3: Open Apps Script**
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

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

### **Step 4: Deploy as Web App**
1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in the settings:
   - **Description**: SpeedifyTechX Contact Form
   - **Execute as**: Me (your@email.com)
   - **Who has access**: **Anyone** (IMPORTANT!)
6. Click **Deploy**
7. Click **Authorize access**
8. Choose your Google account
9. Click **Advanced** (if you see a warning)
10. Click **Go to [Project name] (unsafe)**
11. Click **Allow**
12. **Copy the Web App URL** - it looks like:
    ```
    https://script.google.com/macros/s/XXXXXXXXX/exec
    ```

### **Step 5: Update Your Website**
1. Open the file: `speedifytechx/js/main.js`
2. Find line 8 with the old URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzs_.../exec';
   ```
3. Replace it with YOUR new Web App URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_NEW_ID/exec';
   ```

### **Step 6: Test It!**
1. Open `speedifytechx/contact.html` in your browser
2. Fill out the contact form
3. Submit it
4. Check your spreadsheet - you should see a new row with the data!

---

## 🎨 **Make It Look Professional**

### **Format the Headers:**
1. Select row 1 (the header row)
2. Make it **bold**
3. Add a background color (e.g., light blue or gray)
4. Freeze the row: **View** → **Freeze** → **1 row**

### **Auto-resize Columns:**
1. Select all columns (click the triangle in top-left)
2. Right-click any column header
3. Click **Resize columns** → **Fit to data**

### **Add a Status Column (Optional):**
1. Click on column G header
2. Type "Status" in G1
3. Select cells G2 onwards
4. Go to **Data** → **Data validation**
5. Criteria: **List of items**
6. Enter: `New, In Progress, Replied, Closed`
7. Click **Save**

---

## 📧 **Add Email Notifications (Optional)**

To get an email every time someone submits the form, update your Apps Script:

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
    
    // Send email notification
    MailApp.sendEmail({
      to: "your-email@example.com",  // 👈 Change this to your email
      subject: "🔔 New Contact Form Submission - SpeedifyTechX",
      body: "New contact form submission received:\n\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "📅 Time: " + timestamp + "\n" +
            "👤 Name: " + (data.name || 'Not provided') + "\n" +
            "📧 Email: " + (data.email || 'Not provided') + "\n" +
            "📱 Phone: " + (data.phone || 'Not provided') + "\n" +
            "📝 Subject: " + (data.subject || 'Not provided') + "\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "💬 Message:\n" + (data.message || 'No message') + "\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
            "View all submissions:\n" +
            "https://docs.google.com/spreadsheets/d/1sV--5q4bkufr3eYnsE4KzedCLUXMJhvVfl-1-mwIQuM/edit"
    });
    
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

### ❌ **"Script function not found: doPost"**
- Make sure you saved the script (Ctrl+S or File → Save)
- Try deploying a new version

### ❌ **"Authorization required"**
- Click the Deploy button again
- Go through the authorization process
- Make sure you clicked "Allow"

### ❌ **Form submits but no data appears**
- Check that "Who has access" is set to **Anyone**
- Verify the Web App URL is correct in main.js
- Check browser console for errors (Press F12)

### ❌ **"Permission denied" error**
- You need to be the owner of the spreadsheet
- Make sure you're logged into the correct Google account

---

## 📱 **Access Your Data Anytime**

**Spreadsheet Link**:  
https://docs.google.com/spreadsheets/d/1sV--5q4bkufr3eYnsE4KzedCLUXMJhvVfl-1-mwIQuM/edit

Bookmark this link to quickly check new form submissions!

---

## ✅ **Checklist**

- [ ] Spreadsheet headers are set up (Timestamp, Name, Email, Phone, Subject, Message)
- [ ] Apps Script code is pasted
- [ ] Script is deployed as Web app
- [ ] "Who has access" is set to **Anyone**
- [ ] Authorization is complete
- [ ] Web App URL is copied
- [ ] Web App URL is updated in `js/main.js`
- [ ] Contact form tested and working
- [ ] Data appears in spreadsheet

---

🎉 **You're all set! Your contact form is now connected to your Google Spreadsheet!**
