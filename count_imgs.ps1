$files = Get-ChildItem "public\images\shampoo" | Sort-Object Name
Write-Host "Total: $($files.Count)"
if ($files.Count -gt 0) {
    Write-Host "First: $($files[0].Name)"
    Write-Host "Last:  $($files[$files.Count-1].Name)"
}
