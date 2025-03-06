import fs from "fs";
import path from "path";

function updateImports(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            updateImports(fullPath);
        } else if (fullPath.endsWith(".ts")) {
            let content = fs.readFileSync(fullPath, "utf8");
            content = content.replace(/from\s+['"](\..*?)['"]/g, (match, p1) => `from '${p1}.js'`);
            fs.writeFileSync(fullPath, content, "utf8");
        }
    });
}

updateImports("./src");
console.log("✅ All imports updated with .js extension!");
