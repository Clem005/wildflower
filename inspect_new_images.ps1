$folders = @("C:\Users\clemc\wildflower\temp_shampoo", "C:\Users\clemc\wildflower\temp_conditioner")

foreach ($folder in $folders) {
    Write-Host "Checking $folder..."
    $files = Get-ChildItem $folder -File -Recurse | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp|gif)$" }
    
    if ($files.Count -gt 0) {
        Write-Host "Found $($files.Count) image files."
        
        # Get unique extensions
        $exts = $files | Select-Object -ExpandProperty Extension -Unique
        Write-Host "Extensions found: $($exts -join ', ')"
        
        # Show first and last file to see naming convention
        $sortedFiles = $files | Sort-Object Name
        Write-Host "First file: $($sortedFiles[0].Name)"
        Write-Host "Last file: $($sortedFiles[-1].Name)"
    } else {
        Write-Host "No image files found."
    }
    Write-Host ""
}
