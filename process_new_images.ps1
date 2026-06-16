$folders = @(
    @{ Src="C:\Users\clemc\wildflower\temp_shampoo"; Dest="C:\Users\clemc\wildflower\public\images\shampoo" },
    @{ Src="C:\Users\clemc\wildflower\temp_conditioner"; Dest="C:\Users\clemc\wildflower\public\images\conditioner" }
)

foreach ($folder in $folders) {
    $src = $folder.Src
    $dest = $folder.Dest
    
    # Empty destination folder
    if (Test-Path $dest) {
        Remove-Item "$dest\*" -Recurse -Force
    } else {
        New-Item -ItemType Directory -Path $dest | Out-Null
    }
    
    # Get all image files from source
    $files = Get-ChildItem $src -File -Recurse | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp|gif)$" } | Sort-Object Name
    
    $i = 1
    foreach ($f in $files) {
        $newName = $i.ToString("000") + ".jpg" # Force extension to .jpg for consistency since they are jpgs
        $newPath = Join-Path $dest $newName
        Copy-Item $f.FullName -Destination $newPath -Force
        $i++
    }
    
    Write-Host "Copied and renamed $($i - 1) files into $dest"
}

# Clean up temp folders and zips
Remove-Item "C:\Users\clemc\wildflower\temp_shampoo" -Recurse -Force
Remove-Item "C:\Users\clemc\wildflower\temp_conditioner" -Recurse -Force
Remove-Item "C:\Users\clemc\wildflower\shampoo.zip" -Force
Remove-Item "C:\Users\clemc\wildflower\conditioner.zip" -Force

Write-Host "Cleanup complete."
