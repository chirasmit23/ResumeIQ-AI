$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
Write-Host "Installing backend dependencies..."
python -m pip install --upgrade pip
python -m pip install -r .\server\requirements.txt
Write-Host "Installing frontend dependencies..."
npm install --prefix .\client
$serverPath = Join-Path $root "server"
$clientPath = Join-Path $root "client"
Write-Host "Starting Flask backend in a new PowerShell window..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$serverPath'; python app.py"
Write-Host "Starting Vite frontend in a new PowerShell window..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$clientPath'; npm run dev"
Write-Host "All commands launched."
