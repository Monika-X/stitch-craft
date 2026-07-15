const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const pagesDir = path.join(__dirname, 'pages');

const getHtmlFiles = (dir) => {
    let files = [];
    if (fs.existsSync(dir)) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const itemPath = path.join(dir, item);
            if (fs.statSync(itemPath).isFile() && itemPath.endsWith('.html')) {
                files.push(itemPath);
            }
        }
    }
    return files;
};

const allFiles = [...getHtmlFiles(rootDir), ...getHtmlFiles(pagesDir)];

const imageMap = {};

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/<img[^>]+src="([^">]+)"/g);
    if (matches) {
        matches.forEach(match => {
            const srcMatch = match.match(/src="([^">]+)"/);
            if (srcMatch) {
                const src = srcMatch[1];
                if (!imageMap[src]) imageMap[src] = [];
                imageMap[src].push(path.basename(file));
            }
        });
    }
}

console.log(JSON.stringify(imageMap, null, 2));
