$files = @(
  "components\Navbar.tsx",
  "components\Footer.tsx",
  "components\ProductBottleScroll.tsx",
  "components\ProductTextOverlays.tsx",
  "data\products.ts"
)
foreach ($f in $files) {
  if (Test-Path $f) {
    Remove-Item $f -Force
    Write-Host "Deleted $f"
  } else {
    Write-Host "Not found: $f"
  }
}
Write-Host "Cleanup done."
