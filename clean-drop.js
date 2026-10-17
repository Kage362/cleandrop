// DRS-CleanDrop v2.1 [Clean Prompt & Smart Path Resolver]
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const categorias = {
    'Code': ['.js', '.py', '.c', '.cpp', '.html', '.css', '.json', '.sh', '.md'],
    'Images': ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'],
    'Archives': ['.zip', '.tar', '.gz', '.rar', '.7z', '.iso'],
    'Docs': ['.txt', '.pdf', '.docx', '.odt', '.xlsx', '.csv'],
    'Audio_Video': ['.mp3', '.wav', '.flac', '.mp4', '.mkv', '.avi']
};

console.log("\n==================================================");
console.log("    DRS-CleanDrop v2.1 [Terminal Sanitizer]");
console.log("==================================================\n");

rl.question(`Ruta a organizar (Enter para usar la actual): `, (inputPath) => {
    let targetDir = inputPath.trim();

    // Resolver rutas de forma inteligente
    if (targetDir === '') {
        targetDir = process.cwd();
    } else if (targetDir.startsWith('~/')) {
        targetDir = path.join(os.homedir(), targetDir.slice(2));
    } else if (!path.isAbsolute(targetDir)) {
        // Si escribes solo "Downloads", busca automáticamente en tu home (/home/mint/Downloads)
        const homePath = path.join(os.homedir(), targetDir);
        if (fs.existsSync(homePath)) {
            targetDir = homePath;
        } else {
            targetDir = path.resolve(targetDir);
        }
    }

    if (!fs.existsSync(targetDir)) {
        console.log(`\n[-] Error: La ruta '${targetDir}' no existe.`);
        rl.close();
        return;
    }

    console.log(`\n[*] Sanitizando directorio: ${targetDir}\n`);

    try {
        const archivos = fs.readdirSync(targetDir);
        let movidosCount = 0;

        archivos.forEach(archivo => {
            const rutaCompleta = path.join(targetDir, archivo);

            if (fs.statSync(rutaCompleta).isDirectory() || archivo === 'clean-drop.js') {
                return;
            }

            const ext = path.extname(archivo).toLowerCase();
            let categoriaDestino = 'Others';

            for (const [cat, extensions] of Object.entries(categorias)) {
                if (extensions.includes(ext)) {
                    categoriaDestino = cat;
                    break;
                }
            }

            const dirDestino = path.join(targetDir, categoriaDestino);

            if (!fs.existsSync(dirDestino)) {
                fs.mkdirSync(dirDestino, { recursive: true });
            }

            const nuevaRuta = path.join(dirDestino, archivo);
            fs.renameSync(rutaCompleta, nuevaRuta);
            
            console.log(`[✔] Organizado: ${archivo.padEnd(25)} -> /${categoriaDestino}/`);
            movidosCount++;
        });

        console.log("\n--------------------------------------------------");
        console.log(`[+] ¡Limpieza completada! Archivos ordenados: ${movidosCount}`);
        console.log("==================================================\n");

    } catch (err) {
        console.error("[-] Error durante el proceso:", err.message);
    }

    rl.close();
});
