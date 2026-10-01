$rand = Get-Random
$email = "test${rand}@Genoscene.local"

echo "--- REGISTER USER ---"
$regBody = @{
    name = "Test"
    email = $email
    password = "password123"
} | ConvertTo-Json
$regResp = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Body $regBody -ContentType "application/json"
$regResp | ConvertTo-Json
$token = $regResp.token

echo "`n`n--- CALL /ME WITH TOKEN ---"
$meResp = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method Get -Headers @{ Authorization = "Bearer $token" }
$meResp | ConvertTo-Json

echo "`n`n--- LOGIN USER ---"
$logBody = @{
    email = $email
    password = "password123"
} | ConvertTo-Json
$logResp = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -Body $logBody -ContentType "application/json"
$logResp | ConvertTo-Json

echo "`n`n--- INVALID LOGIN ---"
Try {
    $badLogBody = @{
        email = $email
        password = "wrongpass"
    } | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -Body $badLogBody -ContentType "application/json"
} Catch {
    $_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $reader.ReadToEnd()
}

echo "`n`n--- INVALID TOKEN /ME ---"
Try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method Get -Headers @{ Authorization = "Bearer bad_token" }
} Catch {
    $_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $reader.ReadToEnd()
}

echo "`n`n--- HEALTH POST-AUTH ---"
curl.exe -s http://localhost:3000/api/health

echo "`n`n--- PREDICT POST-AUTH ---"
curl.exe -s -X POST -F "file=@../ai/fast_test.csv" http://localhost:3000/api/predict

