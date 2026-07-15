$newFooter = @"
    <footer class="footer premium-footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-col brand-col">
                    <a href="../index.html" class="nav-brand">Stitch<span>Craft</span></a>
                    <p class="footer-desc">Where heritage tailoring meets contemporary design. We craft bespoke garments that transcend generations, built on uncompromising quality and peerless artistry.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" aria-label="Pinterest"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="22" x2="12" y2="10"></line><path d="M12 10a4 4 0 1 0-8 0c0 4 8 12 8 12z"></path><path d="M12 10a4 4 0 1 1 8 0c0 4-8 12-8 12z"></path></svg></a>
                        <a href="#" aria-label="Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                    </div>
                </div>
                <div class="footer-col links-col">
                    <h3>Atelier</h3>
                    <ul class="footer-links">
                        <li><a href="services.html">Bespoke Tailoring</a></li>
                        <li><a href="services.html">Bridal Couture</a></li>
                        <li><a href="services.html">Alteration Services</a></li>
                        <li><a href="gallery.html">The Gallery</a></li>
                        <li><a href="about.html">Our Story</a></li>
                    </ul>
                </div>
                <div class="footer-col links-col">
                    <h3>Information</h3>
                    <ul class="footer-links">
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="blog.html">Journal</a></li>
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-col newsletter-col">
                    <h3>The StitchCraft Edit</h3>
                    <p>Subscribe to receive exclusive insights into our latest collections and tailoring masterclasses.</p>
                    <form class="newsletter-form global-ajax-form">
                        <input type="email" name="email" placeholder="Your Email Address" required>
                        <button type="submit" class="btn-subscribe">SUBSCRIBE</button>
                    </form>
                    <div class="form-feedback"></div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 StitchCraft Atelier. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="maintenance.html">Sitemap</a>
                    <a href="privacy-policy.html">Privacy</a>
                    <a href="terms-and-conditions.html">Terms</a>
                </div>
            </div>
        </div>
    </footer>
"@

$rootNewFooter = $newFooter -replace 'href="', 'href="pages/' -replace 'pages/\.\./', '' -replace 'pages/#', '#'

function Process-File {
    param([string]$FilePath, [bool]$IsRoot)
    
    $content = [System.IO.File]::ReadAllText($FilePath)
    $pattern = '(?s)<footer class="footer[^>]*>.*?</footer>'
    
    if ($content -match $pattern) {
        $replacement = if ($IsRoot) { $rootNewFooter } else { $newFooter }
        $newContent = $content -replace $pattern, $replacement
        if ($newContent -ne $content) {
            [System.IO.File]::WriteAllText($FilePath, $newContent)
            Write-Host "Updated: $FilePath"
        }
    }
}

if (Test-Path "index.html") {
    Process-File "index.html" $true
}

if (Test-Path "pages") {
    Get-ChildItem "pages\*.html" | ForEach-Object {
        Process-File $_.FullName $false
    }
}

Write-Host "Done replacing footers."
