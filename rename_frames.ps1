# Rename shampoo frames from 1.webp..120.webp to 001.webp..090.webp
$src = "public\images\shampoo"

for ($i = 1; $i -le 90; $i++) {
    $old = Join-Path $src "$i.webp"
    $padded = $i.ToString("000") + ".webp"
    $new = Join-Path $src $padded
    if ((Test-Path $old) -and ($old -ne $new)) {
        Rename-Item -Path $old -NewName $padded -Force
        Write-Host "Renamed $i.webp -> $padded"
    }
}

# Remove frames 91-120
for ($i = 91; $i -le 120; $i++) {
    $f1 = Join-Path $src "$i.webp"
    $f2 = Join-Path $src ($i.ToString("000") + ".webp")
    if (Test-Path $f1) { Remove-Item $f1 -Force; Write-Host "Removed $i.webp" }
    if (Test-Path $f2) { Remove-Item $f2 -Force; Write-Host "Removed padded $i" }
}

$count = (Get-ChildItem $src -Filter "*.webp").Count
Write-Host "Done. Total frames in shampoo: $count"
