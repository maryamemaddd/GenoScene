echo "--- HEALTH ---"
curl.exe -s http://127.0.0.1:8000/health

echo "`n`n--- PREDICT (REAL JSON) ---"
curl.exe -s -X POST -F "file=@fast_test.csv" http://127.0.0.1:8000/predict > output.json
Get-Content output.json

echo "`n`n--- SWAGGER DOCS ---"
$Resp = (curl.exe -s -o NUL -w "%{http_code}" http://127.0.0.1:8000/docs)
echo "HTTP Code: $Resp"

echo "`n`n--- ERROR (MISSING FILE) ---"
curl.exe -s -X POST http://127.0.0.1:8000/predict

echo "`n`n--- ERROR (NON-CSV) ---"
Set-Content test.txt "fake data"
curl.exe -s -X POST -F "file=@test.txt" http://127.0.0.1:8000/predict

echo "`n`n--- ERROR (EMPTY CSV) ---"
Set-Content empty.csv ""
curl.exe -s -X POST -F "file=@empty.csv" http://127.0.0.1:8000/predict

