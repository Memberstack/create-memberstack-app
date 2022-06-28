interface WidgetConfig {
  version: string;
  files: string[];
  source: string;
  main: string;
  module: string;
  scripts: object;
  peerDependencies: object;
}

interface DefaultConfig {
  scripts: object;
}

const getProjectConfig = (
  appName: string
): Record<string, WidgetConfig> | Record<string, DefaultConfig> => ({
  widget: {
    version: '0.1.0',
    files: ['dist'],
    source: 'lib/index.jsx',
    main: `dist/${appName}.js`,
    module: `./dist/${appName}.es.js`,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      watch: 'vite build --mode development',
      preview: 'vite preview',
    },
    peerDependencies: {
      react: '^17.0.2 || ^18.0.0',
      'react-dom': '^17.0.2 || ^18.0.0',
    },
  },
  default: {
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
    },
  },
});

const projectDeps: Record<string, string[]> = {
  widget: ['@vitejs/plugin-react', 'vite'],
  default: [
    'react',
    'react-dom',
    'next',
    'axios',
    '@memberstack/react',
    '@memberstack/admin',
    '@headlessui/react',
    '@heroicons/react',
  ],
};

const projectDevDeps: Record<string, string[]> = {
  widget: [
    '@babel/preset-env',
    '@babel/preset-react',
    'lodash',
    'prop-types',
    'react',
    'react-dom',
  ],
  default: ['tailwindcss', 'autoprefixer', 'postcss'],
};

export const getProjectJson = (template: string, appName: string) => {
  let config = getProjectConfig(appName)[template];
  return {
    name: appName,
    ...config,
  };
};

export const getProjectDeps = (template: string) => projectDeps[template];
export const getProjectDevDeps = (template: string) => projectDevDeps[template];
