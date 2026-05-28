Add-Type -AssemblyName System.Drawing
$path = Resolve-Path "public\images\shampoo\001.webp"
$img = [System.Drawing.Image]::FromFile($path)
Write-Host "Frame 001: $($img.Width) x $($img.Height) px"
$img.Dispose()
