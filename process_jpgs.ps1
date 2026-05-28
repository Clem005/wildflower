$src = "C:\Users\clemc\wildflower\temp_images"
$files = Get-ChildItem $src -Filter "*.jpg" -Recurse | Sort-Object Name
Write-Host "Found $($files.Count) JPGs"

if ($files.Count -gt 0) {
    # Delete old webp files
    Remove-Item "C:\Users\clemc\wildflower\public\images\shampoo\*.webp" -Force -ErrorAction SilentlyContinue
    Remove-Item "C:\Users\clemc\wildflower\public\images\shampoo\*.jpg" -Force -ErrorAction SilentlyContinue
    
    $i = 1
    foreach ($f in $files) {
        $newName = $i.ToString("000") + ".jpg"
        $dest = Join-Path "C:\Users\clemc\wildflower\public\images\shampoo" $newName
        Copy-Item $f.FullName -Destination $dest -Force
        $i++
    }
    Write-Host "Copied $($i-1) files to public/images/shampoo"
}
