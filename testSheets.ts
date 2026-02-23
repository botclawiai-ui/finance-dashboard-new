import process from "process";

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

async function check() {
    console.log("Fetching Google Sheets metadata...");
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Accounts!A1:Z?key=${API_KEY}`);
    const data = await res.json();
    if (data.values) {
        console.log("Headers:", data.values[0]);
        console.log("Row 1:", data.values[1]);
        console.log("Row 2:", data.values[2]);
    } else {
        console.log(data);
    }
}
check();
