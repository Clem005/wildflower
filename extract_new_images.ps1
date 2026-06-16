$shampooZip = "C:\Users\clemc\wildflower\shampoo.zip"
$conditionerZip = "C:\Users\clemc\wildflower\conditioner.zip"

$tempShampoo = "C:\Users\clemc\wildflower\temp_shampoo"
$tempConditioner = "C:\Users\clemc\wildflower\temp_conditioner"

# Remove temp folders if they exist
if (Test-Path $tempShampoo) { Remove-Item -Recurse -Force $tempShampoo }
if (Test-Path $tempConditioner) { Remove-Item -Recurse -Force $tempConditioner }

Write-Host "Extracting shampoo.zip..."
Expand-Archive -Path $shampooZip -DestinationPath $tempShampoo -Force

Write-Host "Extracting conditioner.zip..."
Expand-Archive -Path $conditionerZip -DestinationPath $tempConditioner -Force

Write-Host "Extraction complete."
