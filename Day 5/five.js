const fs = require('fs');

const args = process.argv.slice(2);
const filePath = args[0];

fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error("Error reading file:", err.message);
        return;
    }
    
    console.log(`File Size: ${stats.size} bytes`);
    console.log(`Creation Date: ${stats.birthtime}`);
    console.log(`Last Modified Date: ${stats.mtime}`);
});
