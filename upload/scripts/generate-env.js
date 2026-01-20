const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const targetPath = './src/environments/environment.ts';

const envConfigFile = `
export const environment = {
  production: false,
  cloudName: '${process.env.NG_CLOUD_NAME}',
  unsignedPreset: '${process.env.NG_UNSIGNED_PRESET}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`Arquivo environment.ts gerado com sucesso.`);
