import fs from 'fs'
import path from 'path'

const projectRoot = process.cwd()
const appDir = path.join(projectRoot, 'app')
const packageJsonPath = path.join(projectRoot, 'package.json')

function getRoutesFromAppDir(): string[] {
  if (!fs.existsSync(appDir)) return []

  const routes: string[] = []

  function walk(dir: string, prefix = '') {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      if (
        file.startsWith('_') ||
        file === 'api' ||
        file === 'layout.tsx' ||
        file === 'template.tsx'
      )
        continue
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath, `${prefix}/${file}`)
      } else if (file === 'page.tsx' || file === 'page.jsx') {
        routes.push(prefix || '/')
      }
    }
  }

  walk(appDir)
  return routes
}

function generateReadme() {
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found.')
    return
  }

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  const name = pkg.name || 'Next.js App'
  const description = pkg.description || 'A Next.js + TypeScript project.'
  const scripts = pkg.scripts || {}
  const routes = getRoutesFromAppDir()

  const readme = `# ${name}

${description}

## 🚀 Getting Started

Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

Run the development server:

\`\`\`bash
${scripts.dev || 'npm run dev'}
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Available Scripts

${Object.entries(scripts)
  .map(([k, v]) => `- \`${k}\`: ${v}`)
  .join('\n')}

## 📁 Routes (from \`app/\` directory)

${
  routes.length > 0
    ? routes.map((route) => `- \`${route}\``).join('\n')
    : 'No routes found.'
}

## 🛠️ Technologies Used

- Next.js (App Router)
- TypeScript
- React

## 📂 Project Structure

\`\`\`
.
├── app/
├── public/
├── styles/
├── components/
└── README.md
\`\`\`

## 📝 License

MIT
`

  fs.writeFileSync('README.md', readme, 'utf-8')
  console.log('✅ README.md generated successfully!')
}

generateReadme()
