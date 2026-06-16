Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Image]::FromFile("C:\Users\clemc\wildflower\public\images\shampoo\001.jpg")
$img2 = [System.Drawing.Image]::FromFile("C:\Users\clemc\wildflower\public\images\conditioner\001.webp")

Write-Host "Shampoo Image: $($img1.Width) x $($img1.Height)"
Write-Host "Conditioner Image: $($img2.Width) x $($img2.Height)"

$img1.Dispose()
$img2.Dispose()
