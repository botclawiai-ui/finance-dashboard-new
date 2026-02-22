import os
import requests
import json
from dotenv import load_dotenv

# Load root .env
load_dotenv()

SPREADSHEET_ID = os.getenv("GOOGLE_SPREADSHEET_ID")
API_KEY = os.getenv("GOOGLE_SHEETS_API_KEY")

def inspect_sheet():
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}?key={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        sheets = data.get('sheets', [])
        print("Available Worksheets:")
        for idx, sheet in enumerate(sheets):
            props = sheet.get("properties", {})
            print(f"- {props.get('title')} (ID: {props.get('sheetId')})")
    else:
        print(f"Error {response.status_code}: {response.text}")

if __name__ == "__main__":
    inspect_sheet()
