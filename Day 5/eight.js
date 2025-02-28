const fs = require('fs');
const path = require('path');

function traverseDirectory(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err.message);
            return;
        }
        
        files.forEach(file => {
            const fullPath = path.join(dir, file.name);
            console.log(fullPath);
            
            if (file.isDirectory()) {
                traverseDirectory(fullPath);
            }
        });
    });
}

const args = process.argv.slice(2);
const directoryPath = args[0] || __dirname;
traverseDirectory(directoryPath);
