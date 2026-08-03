# 🚀 Quick Start: Connect Your Spreadsheet

## Your Spreadsheet
**ID**: `1sV--5q4bkufr3eYnsE4KzedCLUXMJhvVfl-1-mwIQuM`  
**Link**: https://docs.google.com/spreadsheets/d/1sV--5q4bkufr3eYnsE4KzedCLUXMJhvVfl-1-mwIQuM/edit

---

## 3 Simple Steps

### 1️⃣ **Setup Spreadsheet Headers**
Open your spreadsheet and add these headers in Row 1:

```
Timestamp | Name | Email | Phone | Subject | Message
```

### 2️⃣ **Deploy Apps Script**
1. Extensions → Apps Script
2. Paste the code from `docs/YOUR_SPREADSHEET_SETUP.md`
3. Deploy → New deployment → Web app
4. Set "Who has access" to **Anyone**
5. Copy the Web App URL

### 3️⃣ **Update Website**
Open `js/main.js` and replace line 8:
```javascript
const SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
```

---

## 📖 Full Documentation
See `docs/YOUR_SPREADSHEET_SETUP.md` for complete step-by-step guide with:
- Detailed instructions
- Code to copy/paste
- Email notifications setup
- Troubleshooting tips

---

## ✅ Test It
1. Open `contact.html` in browser
2. Fill and submit the form
3. Check your spreadsheet for new data!

**Need help?** Check the full documentation in the `docs` folder.
