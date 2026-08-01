$placeholder = "/assets/images/placeholder.svg"
$files = Get-ChildItem -Recurse -Include "*.js","*.html" . | Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "dist" -and $_.FullName -notmatch ".git" }
$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "images\.unsplash\.com") {
        $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, "https://images\.unsplash\.com/[^\s'`"">]+", $placeholder)
        Set-Content $file.FullName $newContent -NoNewline
        $count++
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done -- $count files updated"
