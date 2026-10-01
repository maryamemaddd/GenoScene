echo "--- NODE HEALTH ---"
curl.exe -s http://localhost:3000/api/health

echo "`n`n--- NODE AI HEALTH ---"
curl.exe -s http://localhost:3000/api/ai-health

echo "`n`n--- NODE PREDICT ---"
curl.exe -s -X POST -F "file=@../ai/fast_test.csv" http://localhost:3000/api/predict

