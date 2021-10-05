const fs = require('fs');

const nodeTypesPath = './lib/index.d.ts';

if (fs.existsSync(nodeTypesPath)) fs.rmSync(nodeTypesPath);
