import os

def fix_symbols():
    replacements = {
        'â€¢': '•',
        'â€“': '–',
        'â€”': '—',
        'â€™': '’',
        'â€œ': '“',
        'â€': '”',
        'Â·': '·'
    }
    
    directory = r'c:\Users\LOKII_1526\Desktop\Stitch Craft\stitchcraft'
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                modified = False
                for old, new in replacements.items():
                    if old in content:
                        content = content.replace(old, new)
                        modified = True
                        
                if modified:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {file}")

if __name__ == '__main__':
    fix_symbols()
