Write-Host "=== public\images\shampoo ==="
$webp = Get-ChildItem "public\images\shampoo" -Filter "*.webp" | Sort-Object Name
Write-Host "webp count: $($webp.Count)"
if ($webp.Count -gt 0) {
    Write-Host "First: $($webp[0].Name)  Last: $($webp[$webp.Count-1].Name)"
}

$all = Get-ChildItem "public\images\shampoo" | Sort-Object Name
Write-Host "All files ($($all.Count)):"
$all | ForEach-Object { Write-Host "  $($_.Name) ($($_.Length) bytes)" }

Write-Host ""
Write-Host "=== public\images ==="
Get-ChildItem "public\images" | ForEach-Object { Write-Host "  $($_.Name)" }
