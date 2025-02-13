interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export const snippets: Snippet[] = [
  {
    id: 'chrome-new-tab',
    title: 'Chrome New Tab',
    description: 'Open a new tab in Chrome using AppleScript',
    language: 'applescript',
    code: `tell application "Google Chrome"
  make new tab
end tell`
  },
  {
    id: 'chrome-close-tab',
    title: 'Chrome Close Current Tab',
    description: 'Close the active tab in Chrome',
    language: 'applescript',
    code: `tell application "Google Chrome"
  close active tab of front window
end tell`
  },
  {
    id: 'chrome-duplicate-tab',
    title: 'Chrome Duplicate Tab',
    description: 'Duplicate the current tab in Chrome',
    language: 'applescript',
    code: `tell application "Google Chrome"
  duplicate active tab of front window
end tell`
  },
  {
    id: 'python-http-server',
    title: 'Python HTTP Server',
    description: 'Start a simple HTTP server in current directory',
    language: 'bash',
    code: 'python3 -m http.server 8000'
  },
  {
    id: 'node-http-server',
    title: 'Node HTTP Server',
    description: 'Start a simple HTTP server using npx',
    language: 'bash',
    code: 'npx http-server . -p 8000'
  },
  {
    id: 'git-undo-commit',
    title: 'Git Undo Last Commit',
    description: 'Undo the last commit but keep the changes',
    language: 'bash',
    code: 'git reset --soft HEAD~1'
  },
  {
    id: 'git-branch-cleanup',
    title: 'Git Branch Cleanup',
    description: 'Delete all local branches that have been merged into main',
    language: 'bash',
    code: 'git branch --merged main | grep -v "^[ *]*main" | xargs git branch -d'
  },
  {
    id: 'git-sync-fork',
    title: 'Git Sync Fork',
    description: 'Sync a fork with the upstream repository',
    language: 'bash',
    code: `git remote add upstream https://github.com/original/repository.git
git fetch upstream
git checkout main
git merge upstream/main`
  },
  {
    id: 'node-inline-js',
    title: 'Node.js Inline Script',
    description: 'Run JavaScript code directly from command line',
    language: 'bash',
    code: 'node -e "console.log(process.versions)"'
  },
  {
    id: 'python-inline-script',
    title: 'Python Inline Script',
    description: 'Run Python code directly from command line',
    language: 'bash',
    code: 'python3 -c "import sys; print(sys.version)"'
  },
  {
    id: 'npx-run-package',
    title: 'NPX Run Package',
    description: 'Run a npm package without installing it globally',
    language: 'bash',
    code: 'npx cowsay "Hello from npx!"'
  },
  {
    id: 'docker-container-cleanup',
    title: 'Docker Container Cleanup',
    description: 'Remove all stopped containers',
    language: 'bash',
    code: 'docker rm $(docker ps -a -q)'
  },
  {
    id: 'docker-image-cleanup',
    title: 'Docker Image Cleanup',
    description: 'Remove all unused Docker images',
    language: 'bash',
    code: 'docker rmi $(docker images -q)'
  },
  {
    id: 'react-useeffect',
    title: 'React useEffect Template',
    description: 'Basic useEffect hook setup with cleanup',
    language: 'typescript',
    code: `useEffect(() => {
  console.log('Component mounted');

  return () => {
    console.log('Component will unmount');
  };
}, []);`
  }
];