# Technical SOP: Syncing Fintable Sheets to Firebase

## Goal
Automate the extraction of personal finance data from a Google Sheet (managed by Fintable) and securely ingest it into the Firebase datastore.

## Input: Google Sheets (Fintable Format)
The Fintable "Transactions" sheet contains the following headers:
- `⚡ Date` (e.g., "2/16/2026")
- `⚡ Amount` (e.g., "500", "-6.38")
- `⚡ Description` (e.g., "Miete März 2026")
- `⚡ Category` (e.g., "Uncategorized")
- `⚡ Account` (e.g., "JACOB FORSTNER (EUR) (6657)")
- `Attachment`
- `⚡ Transaction ID` (e.g., "65303732...-...")
- `⚡ Raw Data` (JSON string containing full bank metadata)

## Output: Firebase `transactions` Collection
Each row must be normalized into the following JSON shape before writing to Firebase:
```json
{
  "id": "65303732...", // ⚡ Transaction ID
  "date": "2026-02-16", // ISO format extracted from ⚡ Date
  "amount": 500.00, // Float extracted from ⚡ Amount
  "currency": "EUR", // Extracted from ⚡ Raw Data or Account string
  "description": "Miete März 2026", // ⚡ Description
  "category": "Uncategorized", // ⚡ Category
  "account": "JACOB FORSTNER (6657)", // Cleaned ⚡ Account
  "type": "income", // "income" if amount >= 0 else "expense"
  "raw_data": {} // Parsed JSON from ⚡ Raw Data
}
```

## Tool Logic Constraints
1. **Idempotency:** The script must use `firebase_admin.firestore.client().collection('transactions').document(id).set(data)` so that running the sync multiple times does not duplicate transactions.
2. **Date Parsing:** Google Sheets returns `M/D/YYYY`. It must be converted to `YYYY-MM-DD`.
3. **Encoding:** Note that headers use the `⚡` emoji. The Python script must correctly decode these keys.
4. **Data-first:** Only complete, valid transactions should be synced.

## Edge Cases
- **Missing Data:** If a row is completely blank, skip it.
- **Malformed Amount:** If an amount strings cannot be parsed as a float, log an error and skip the row.
- **Empty Raw Data:** If `⚡ Raw Data` is empty, insert an empty `{}` dictionary instead of a string.
