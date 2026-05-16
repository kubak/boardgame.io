const shell = require('shelljs');

shell.rm('-rf', 'dist');
const packResult = shell.exec('npm pack --silent', { silent: true });
const packed = packResult.stdout.trim().split('\n').pop();

shell.mv(packed, 'integration');
shell.cd('integration');
shell.rm('-rf', 'node_modules');
shell.exec('pnpm install');
shell.exec(`pnpm add ${packed}`);
shell.rm(packed);

shell.set('-e');

// Test
shell.exec('pnpm test');
shell.exec('pnpm run build');
