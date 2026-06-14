/*
 * Copyright 2019 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

const subpackages = require('../subpackages');
const path = require('node:path');
const { mkdirSync, writeFileSync, existsSync } = require('node:fs');
const pkg = require('../package.json');

function PackageJson(name, { mainDir, esmDir } = {}) {
  const root = '../dist';
  const p = {
    name: `${pkg.name}/${name}`,
    private: true,
    types: `../dist/types/packages/${name}.d.ts`,
    main: path.join(root, mainDir, `${name}.js`),
  };
  if (esmDir) {
    p.module = path.join(root, esmDir, `${name}.js`);
  }
  return JSON.stringify(p, null, 2) + '\n';
}

function makeSubpackage(name, opts) {
  const dir = path.resolve(__dirname, `../${name}`);
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  writeFileSync(`${dir}/package.json`, PackageJson(name, opts));
}

subpackages.forEach((name) => {
  makeSubpackage(name, { mainDir: 'cjs', esmDir: 'esm' });
});

makeSubpackage('server', { mainDir: 'cjs' });
