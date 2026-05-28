# Search common locations for the zip file
$locations = @(
    "$env:USERPROFILE\Downloads",
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\Documents",
    "C:\Users\clemc\wildflower"
)
foreach ($loc in $locations) {
    if (Test-Path $loc) {
        $found = Get-ChildItem $loc -Filter "*ezgif*" -Recurse -ErrorAction SilentlyContinue
        if ($found) { $found | ForEach-Object { Write-Host "FOUND: $($_.FullName)" } }
        $found2 = Get-ChildItem $loc -Filter "*.zip" -ErrorAction SilentlyContinue
        if ($found2) { $found2 | ForEach-Object { Write-Host "ZIP: $($_.FullName)" } }
    }
}
