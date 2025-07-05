# Backup Script for Phase Completion
# Usage: .\backup-phase.ps1 -PhaseNumber 0 -PhaseName "ui-ux-design"

param(
    [Parameter(Mandatory=$true)]
    [int]$PhaseNumber,
    
    [Parameter(Mandatory=$true)]
    [string]$PhaseName,
    
    [string]$Description = ""
)

# Get current date and time
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$phaseFolder = "saves/phase-$PhaseNumber-$PhaseName"

Write-Host "🚀 Starting backup for Phase $PhaseNumber: $PhaseName" -ForegroundColor Green
Write-Host "📁 Backup location: $phaseFolder" -ForegroundColor Yellow

# Create phase folder
if (Test-Path $phaseFolder) {
    Write-Host "⚠️  Warning: Phase folder already exists. Creating timestamped version..." -ForegroundColor Yellow
    $phaseFolder = "$phaseFolder-$timestamp"
}

New-Item -ItemType Directory -Path $phaseFolder -Force | Out-Null

# Define what to copy and what to exclude
$sourcePath = "."
$excludePatterns = @(
    "node_modules",
    ".git",
    "build",
    "dist",
    ".env*",
    "*.log",
    "saves",
    "backup-phase.ps1"
)

# Create robocopy command with exclusions
$robocopyArgs = @(
    $sourcePath,
    $phaseFolder,
    "/E",           # Copy subdirectories including empty ones
    "/R:3",         # Retry 3 times on failure
    "/W:1",         # Wait 1 second between retries
    "/MT:8",        # Use 8 threads for faster copying
    "/TEE",         # Output to console and log file
    "/LOG:$phaseFolder/backup.log"  # Log file
)

# Add exclusions
foreach ($pattern in $excludePatterns) {
    $robocopyArgs += "/XD"
    $robocopyArgs += $pattern
}

Write-Host "📋 Copying project files..." -ForegroundColor Cyan
robocopy @robocopyArgs

# Check if backup was successful
$exitCode = $LASTEXITCODE
if ($exitCode -le 7) {  # Robocopy success codes are 0-7
    Write-Host "✅ Backup completed successfully!" -ForegroundColor Green
    
    # Create backup summary
    $summaryFile = "$phaseFolder/backup-summary.md"
    $summary = @"
# Phase $PhaseNumber Backup Summary

**Phase**: $PhaseName
**Backup Date**: $timestamp
**Description**: $Description

## Files Backed Up
- Source code files
- Configuration files
- Documentation
- Dependencies (package.json, etc.)
- Database schemas
- Smart contracts
- Design files
- Test files

## Excluded Files
- node_modules/ (can be reinstalled)
- .git/ (version control)
- build/ (generated files)
- .env files (sensitive data)
- Log files

## Recovery Instructions
1. Copy all files from this folder to your project root
2. Run `npm install` to reinstall dependencies
3. Verify functionality
4. Continue development from next phase

## Phase Completion Status
- [ ] All phase tasks completed
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Performance benchmarks met
- [ ] Security review conducted
- [ ] User acceptance testing passed

---
*Backup created automatically by backup-phase.ps1*
"@
    
    $summary | Out-File -FilePath $summaryFile -Encoding UTF8
    Write-Host "📄 Backup summary created: $summaryFile" -ForegroundColor Green
    
    # Update saves README
    $savesReadme = "saves/README.md"
    if (Test-Path $savesReadme) {
        $readmeContent = Get-Content $savesReadme -Raw
        $readmeContent = $readmeContent -replace "**Last Updated**: \[Date will be updated after each phase\]", "**Last Updated**: $timestamp"
        $readmeContent = $readmeContent -replace "**Total Backups**: \d+", "**Total Backups**: $PhaseNumber"
        $readmeContent | Out-File -FilePath $savesReadme -Encoding UTF8
    }
    
    Write-Host "🎉 Phase $PhaseNumber backup completed successfully!" -ForegroundColor Green
    Write-Host "📂 Backup location: $phaseFolder" -ForegroundColor Yellow
    Write-Host "📋 Next: Update ROADMAP.md to mark phase as completed" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Backup failed with exit code: $exitCode" -ForegroundColor Red
    Write-Host "📋 Check the log file for details: $phaseFolder/backup.log" -ForegroundColor Yellow
    exit 1
} 