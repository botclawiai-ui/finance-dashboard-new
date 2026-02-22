import os
import json
import requests
from datetime import datetime
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials, firestore

# --- INIT ---
load_dotenv()

SPREADSHEET_ID = os.getenv("GOOGLE_SPREADSHEET_ID")
SHEETS_API_KEY = os.getenv("GOOGLE_SHEETS_API_KEY")

# Initialize Firebase using the admin credentials JSON
try:
    if not firebase_admin._apps:
        cred = credentials.Certificate("firebase-adminsdk.json")
        firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("[SUCCESS] Firebase initialized correctly.")
except Exception as e:
    print(f"[!] Warning: Firebase Admin not fully initialized ({e}). Will run print-only mode.")
    db = None

def parse_date(date_str):
    """Converts '2/16/2026' to '2026-02-16'"""
    try:
        return datetime.strptime(date_str, "%m/%d/%Y").strftime("%Y-%m-%d")
    except Exception:
        return date_str

def sync_data():
    print("[*] Starting Sync: Fintable Sheets -> Firebase")
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/Transactions!A1:Z?key={SHEETS_API_KEY}"
    
    response = requests.get(url)
    response.raise_for_status()
    rows = response.json().get("values", [])
    
    if len(rows) < 2:
        print("[!] No transaction data found.")
        return

    # Fintable headers contain emojis, we map by index based on our raw dump
    # ['⚡ Date', '⚡ Amount', '⚡ Description', '⚡ Category', '⚡ Account', 'Attachment', '⚡ Transaction ID', '⚡ Raw Data']
    
    success_count = 0
    
    for row in rows[1:]: # Skip header
        if not row or len(row) < 7:
            continue
            
        try:
            date_raw = row[0]
            amount_raw = row[1]
            desc = row[2]
            category = row[3] if len(row) > 3 else "Uncategorized"
            account_raw = row[4] if len(row) > 4 else "Unknown"
            tx_id = row[6] if len(row) > 6 else None
            
            if not tx_id:
                continue
                
            amount_val = float(amount_raw)
            tx_type = "income" if amount_val >= 0 else "expense"
            
            raw_data_json = {}
            if len(row) > 7 and row[7]:
                try:
                    raw_data_json = json.loads(row[7])
                except Exception:
                    pass

            doc = {
                "id": tx_id,
                "date": parse_date(date_raw),
                "amount": amount_val,
                "currency": raw_data_json.get("transactionAmount", {}).get("currency", "EUR"),
                "description": desc,
                "category": category,
                "account": account_raw,
                "type": tx_type,
                "raw_data": raw_data_json
            }
            
            if db:
                db.collection("transactions").document(tx_id).set(doc)
            
            success_count += 1
            
        except Exception as e:
            print(f"[!] Error processing row {row}: {e}")
            
    print(f"[SUCCESS] Normalized and synced {success_count} transactions.")

if __name__ == "__main__":
    sync_data()
