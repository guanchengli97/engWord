import {mkdir,copyFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist/data',{recursive:true});
for(const name of ['index.html','app.js','sync.js','map-layout.js','style.css','data/vocabulary.js','data/SOURCES.md','data/ECDICT-LICENSE.txt']) await copyFile(name,`dist/${name}`);
console.log('Built public assets only; server code and credentials excluded.');
