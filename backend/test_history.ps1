$rand = Get-Random
$emailA = "usera${rand}@Genoscene.local"
$emailB = "userb${rand}@Genoscene.local"
$pass = "password123"
$base = "http://localhost:3000/api"

echo "--- REGISTER USER A ---"
$regA = Invoke-RestMethod -Uri "$base/auth/register" -Method Post -Body (@{name = "User A"; email = $emailA; password = $pass } | ConvertTo-Json) -ContentType "application/json"
$tokenA = $regA.token

echo "`n`n--- REGISTER USER B ---"
$regB = Invoke-RestMethod -Uri "$base/auth/register" -Method Post -Body (@{name = "User B"; email = $emailB; password = $pass } | ConvertTo-Json) -ContentType "application/json"
$tokenB = $regB.token

echo "`n`n--- USER A PREDICTS ---"
$predA = curl.exe -s -X POST -F "file=@../ai/fast_test.csv" -H "Authorization: Bearer $tokenA" "$base/predict"
$predA

echo "`n`n--- USER A FETCHES HISTORY ---"
$histA = Invoke-RestMethod -Uri "$base/predictions/history" -Method Get -Headers @{ Authorization = "Bearer $tokenA" }
$histA | ConvertTo-Json -Depth 5
$predId = $histA[0]._id

echo "`n`n--- USER B FETCHES HISTORY ---"
$histB = curl.exe -s -H "Authorization: Bearer $tokenB" "$base/predictions/history"
echo $histB

echo "`n`n--- USER B ATTEMPTS TO FETCH USER A'S PREDICTION ---"
$illicitFetch = curl.exe -s -H "Authorization: Bearer $tokenB" "$base/predictions/$predId"
echo $illicitFetch

echo "`n`n--- UNAUTHENTICATED REQUESTS ---"
$unauth1 = curl.exe -s -X POST -F "file=@../ai/fast_test.csv" "$base/predict"
echo "POST /predict: $unauth1"
$unauth2 = curl.exe -s "$base/predictions/history"
echo "GET /history: $unauth2"
$unauth3 = curl.exe -s "$base/predictions/$predId"
echo "GET /:id: $unauth3"

echo "`n`n--- EXISTING HEALTH ROUTES ---"
$h1 = curl.exe -s "$base/health"
echo "/health: $h1"
$h2 = curl.exe -s "$base/ai-health"
echo "/ai-health: $h2"

