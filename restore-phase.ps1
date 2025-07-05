# Restore Script for Phase Backup
# Usage: .\restore-phase.ps1 -PhaseNumber 0 -PhaseName "ui-ux-design"

param(
    [Parameter(Mandatory=$true)]
    [int]$PhaseNumber,
    
    [Parameter(Mandatory=$true)]
    [string]$PhaseName
)

$backupFolder = "saves/phase-$PhaseNumber-$PhaseName"

Write-Host "🔄 Starting restore from Phase $PhaseNumber: $PhaseName" -ForegroundColor Green
Write-Host "📁 Backup location: $backupFolder" -ForegroundColor Yellow

# Check if backup exists
if (-not (Test-Path $backupFolder)) {
    Write-Host "❌ Backup folder not found: $backupFolder" -ForegroundColor Red
    Write-Host "📋 Available backups:" -ForegroundColor Yellow
    Get-ChildItem "saves" -Directory | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor Cyan }
    exit 1
}

# Confirm restore
Write-Host "⚠️  WARNING: This will overwrite current project files!" -ForegroundColor Red
$confirmation = Read-Host "Are you sure you want to restore from Phase $PhaseNumber? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "❌ Restore cancelled by user" -ForegroundColor Yellow
    exit 0
}

# Create backup of current state before restore
$currentBackup = "saves/pre-restore-backup-$(Get-Date -Format 'yyyy-MM-dd_HH-mm-ss')"
Write-Host "📋 Creating backup of current state: $currentBackup" -ForegroundColor Cyan
New-Item -ItemType Directory -Path $currentBackup -Force | Out-Null

# Backup current files (excluding saves folder and node_modules)
$excludePatterns = @(
    "node_modules",
    ".git",
    "build",
    "dist",
    ".env*",
    "*.log",
    "saves"
)

$robocopyArgs = @(
    ".",
    $currentBackup,
    "/E",
    "/R:3",
    "/W:1",
    "/MT:8",
    "/TEE",
    "/LOG:$currentBackup/pre-restore-backup.log"
)

foreach ($pattern in $excludePatterns) {
    $robocopyArgs += "/XD"
    $robocopyArgs += $pattern
}

robocopy @robocopyArgs | Out-Null

# Restore from backup
Write-Host "🔄 Restoring project files..." -ForegroundColor Cyan

# Create robocopy command for restore
$restoreArgs = @(
    $backupFolder,
    ".",
    "/E",           # Copy subdirectories including empty ones
    "/R:3",         # Retry 3 times on failure
    "/W:1",         # Wait 1 second between retries
    "/MT:8",        # Use 8 threads for faster copying
    "/TEE",         # Output to console and log file
    "/LOG:restore.log",  # Log file
    "/PURGE"        # Delete destination files not in source
)

# Exclude saves folder from restore
$restoreArgs += "/XD"
$restoreArgs += "saves"

robocopy @restoreArgs

# Check if restore was successful
$exitCode = $LASTEXITCODE
if ($exitCode -le 7) {  # Robocopy success codes are 0-7
    Write-Host "✅ Restore completed successfully!" -ForegroundColor Green
    
    # Check if package.json exists and suggest npm install
    if (Test-Path "package.json") {
        Write-Host "📦 Package.json found. You may need to run:" -ForegroundColor Yellow
        Write-Host "   npm install" -ForegroundColor Cyan
    }
    
    # Check if there are other dependency files
    if (Test-Path "requirements.txt") {
        Write-Host "🐍 Requirements.txt found. You may need to run:" -ForegroundColor Yellow
        Write-Host "   pip install -r requirements.txt" -ForegroundColor Cyan
    }
    
    Write-Host "🎉 Project restored from Phase $PhaseNumber backup!" -ForegroundColor Green
    Write-Host "📂 Current backup location: $currentBackup" -ForegroundColor Yellow
    Write-Host "📋 Next: Verify functionality and continue development" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Restore failed with exit code: $exitCode" -ForegroundColor Red
    Write-Host "📋 Check the log file for details: restore.log" -ForegroundColor Yellow
    Write-Host "🔄 You can restore your previous state from: $currentBackup" -ForegroundColor Yellow
    exit 1
} 