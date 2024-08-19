import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { VitePlugin } from '@electron-forge/plugin-vite';
import type { ForgeConfig } from '@electron-forge/shared-types';

const config: ForgeConfig = {
  // Can't override dir, arch, platform, out or electronVersion options in packagerConfig (https://www.electronforge.io/config/configuration#electron-packager-config)
  // https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html
  packagerConfig: {},
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  // publishers: [],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'main.ts',
          config: './packages/main/vite.main.config.ts',
        },
        {
          entry: 'preload.ts',
          config: './packages/preload/vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: './packages/renderer/vite.renderer.config.ts',
        },
      ],
    }),
  ],
  // hooks: {},
  // buildIdentifier: 'my-build',
};

export default config;
