$src = "C:\Users\clemc\wildflower\public\images\conditioner"
$files = Get-ChildItem $src -Filter "*.webp"
$count = 0
foreach ($f in $files) {
    # Extract the number from the filename
    if ($f.Name -match "^(\d+)\.webp$") {
        $num = [int]$matches[1]
        $newName = $num.ToString("000") + ".webp"
        if ($f.Name -ne $newName) {
            Rename-Item -Path $f.FullName -NewName $newName -Force
            $count++
        }
    }
}
Write-Host "Renamed $count files in conditioner folder."
