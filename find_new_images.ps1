$locations = @(
    "C:\Users\clemc\wildflower",
    "C:\Users\clemc\Downloads"
)

foreach ($loc in $locations) {
    if (Test-Path $loc) {
        Write-Host "Searching in $loc..."
        Get-ChildItem $loc -Filter "*shampoo*" -Recurse -Depth 2 -ErrorAction SilentlyContinue | Select-Object FullName, LastWriteTime | Format-Table -AutoSize
        Get-ChildItem $loc -Filter "*conditioner*" -Recurse -Depth 2 -ErrorAction SilentlyContinue | Select-Object FullName, LastWriteTime | Format-Table -AutoSize
    }
}
