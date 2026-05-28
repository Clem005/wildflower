# PowerShell script to extract and organize frame sequence for Wildflower Hair Care
$ErrorActionPreference = "Stop"

$zipPath = "ezgif-84bfb62523bdd028-jpg.zip"
$tempDir = "temp_extracted"
$folders = @("shampoo", "conditioner")

if (-not (Test-Path $zipPath)) {
    Write-Error "Zip file '$zipPath' not found in current directory!"
}

# Clean up old juice folders if they exist
$oldFolders = @("mango", "chocolate", "pomegranate")
foreach ($old in $oldFolders) {
    $oldPath = "public/images/$old"
    if (Test-Path $oldPath) {
        Remove-Item -Path $oldPath -Recurse -Force | Out-Null
        Write-Host "Cleaned up old folder: $oldPath"
    }
}

# Create public/images subdirectories for hair care
foreach ($folder in $folders) {
    $dir = "public/images/$folder"
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Write-Host "Created directory: $dir"
    }
}

# Extract zip
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force | Out-Null
}
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
Write-Host "Extracting $zipPath..."
Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force

# Rename and copy
Write-Host "Organizing frames for Wildflower..."
$count = 0
for ($i = 1; $i -le 120; $i++) {
    $padded = $i.ToString("000")
    $srcFile = "$tempDir/ezgif-frame-$padded.jpg"
    if (Test-Path $srcFile) {
        foreach ($folder in $folders) {
            $destFile = "public/images/$folder/$i.webp"
            Copy-Item -Path $srcFile -Destination $destFile -Force
        }
        $count++
    }
}

# Clean up temp
Remove-Item -Path $tempDir -Recurse -Force
Write-Host "Successfully processed $count frames into public/images/{shampoo,conditioner}/ folders."
