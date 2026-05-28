Add-Type -AssemblyName System.Drawing
$frames = @("001", "045", "090")
foreach ($f in $frames) {
    $path = Resolve-Path "public\images\shampoo\$f.webp"
    try {
        $img = [System.Drawing.Image]::FromFile($path)
        Write-Host "Frame $f`: $($img.Width) x $($img.Height) px  ($([math]::Round((Get-Item $path).Length/1024,1)) KB)"
        $img.Dispose()
    } catch {
        Write-Host "Could not read $f`: $($_.Exception.Message)"
    }
}
