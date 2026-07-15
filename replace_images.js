const fs = require('fs');
const path = require('path');

const replacements = {
    'https://upload.wikimedia.org/wikipedia/commons/8/88/Royal_Winter_Fair_Wool_2.jpg': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800',
    'https://upload.wikimedia.org/wikipedia/commons/e/e3/Popel_101.jpg': 'https://images.unsplash.com/photo-1585914924626-15adac1e6402?q=80&w=800',
    'https://upload.wikimedia.org/wikipedia/commons/2/2e/Silk_raw_01a.jpg': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
    'https://upload.wikimedia.org/wikipedia/commons/0/01/Kaschmirschal_1.jpg': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800',
    'https://upload.wikimedia.org/wikipedia/commons/f/f8/TailoringFirstFitFront01.jpg': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200',
    'https://upload.wikimedia.org/wikipedia/commons/c/c2/A_Tailor_at_Work_%286920059143%29.jpg': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000',
    'https://upload.wikimedia.org/wikipedia/commons/c/c7/Arnaud_Rousseau_Dress_Shirt_with_a_Modern_Spread_Collar.jpg': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000'
};

const files = [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'pages', 'home2.html')
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        for (const [oldUrl, newUrl] of Object.entries(replacements)) {
            content = content.split(oldUrl).join(newUrl);
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated images in ${path.basename(file)}`);
    }
}
