import os
import requests
import json
from dotenv import load_dotenv

# Load root .env
load_dotenv()

SPREADSHEET_ID = os.getenv("GOOGLE_SPREADSHEET_ID")
API_KEY = os.getenv("GOOGLE_SHEETS_API_KEY")

# We actually want the 'Transactions' sheet which we found via inspect_sheet.py
RANGE_NAME = "Transactions!A1:Z" 

def fetch_sheet_data():
    """
    Fetches raw data from the public Google Sheet using the Google Sheets v4 API.
    Since Fintable uses Sheets as a database, we read the JSON output.
    """
    print(f"[*] Attempting to read Google Sheet: {SPREADSHEET_ID}")
    
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{RANGE_NAME}?key={API_KEY}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        data = response.json()
        rows = data.get("values", [])
        
        if not rows:
            print("[!] No data found in the spreadsheet.")
            return None
            
        print(f"[SUCCESS] Downloaded {len(rows)} rows from Google Sheets.")
        
        # Look at the headers to confirm the shape
        headers = rows[0]
        print(f"[*] Columns found: {headers}".encode('utf-8', 'ignore').decode('utf-8'))
        
        # Save mock dump to .tmp to satisfy B.L.A.S.T. logging rules
        os.makedirs(".tmp", exist_ok=True)
        with open(".tmp/sheets_raw_dump.json", "w", encoding="utf-8") as f:
            json.dump({"headers": headers, "sample_rows": rows[1:4]}, f, indent=2, ensure_ascii=False)
            
        print("[*] Raw sample saved to .tmp/sheets_raw_dump.json")
        return rows
        
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Connection to Google Sheets failed: {e}")
        # Print actual response from Google for debugging
        if hasattr(e, 'response') and e.response is not None:
            print(e.response.text)
        return None

if __name__ == "__main__":
    fetch_sheet_data()
