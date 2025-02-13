import type { Snippet, TagMapping } from '../types';

// Import all JSON files from the json directory and its subdirectories
const jsonModules = import.meta.glob<Snippet[]>('./json/**/*.json', { eager: true });
const tagModules = import.meta.glob<TagMapping[]>('./json-tags/**/*.json', { eager: true });

// Convert the static snippets array to a const to ensure type safety
const staticSnippets: Snippet[] = [
  {
    id: 'complex-log-parser',
    title: 'Complex Log Parser',
    description: 'Parse and analyze Apache logs with sed and awk, grouping by IP and counting requests',
    language: 'bash',
    code: `cat access.log | sed -E 's/([0-9]{1,3}\.){3}[0-9]{1,3}/\0/g' | awk '{ip=$1; req=$6" "$7; status=$9; bytes=$10; print ip,req,status,bytes}' | sort | awk '{ip=$1; reqs[ip]++; bytes[ip]+=$4} END {for (i in reqs) printf "IP: %s, Requests: %d, Total Bytes: %d, Avg Bytes/Req: %.2f\\n", i, reqs[i], bytes[i], bytes[i]/reqs[i]}' | sort -k4 -nr`
  },
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
    code: 'npx http-server . -p 8000',
    tags: ['sue']
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
    code: 'git branch --merged main | grep -v "^[ *]*main" | xargs git branch -d',
    _v: 1
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

// Load and merge tag mappings
const tagMappings = Object.values(tagModules).flatMap(module => {
  if (module && Array.isArray(module.default)) {
    return module.default;
  }
  return [];
});

// Create a map of id to tags from tag mappings
const tagMap = new Map<string, Set<string>>();
tagMappings.forEach(mapping => {
  const existingTags = tagMap.get(mapping.id) || new Set<string>();
  mapping.tags.forEach(tag => existingTags.add(tag));
  tagMap.set(mapping.id, existingTags);
});

// Merge all JSON snippets with static snippets and deduplicate
const jsonSnippets = Object.values(jsonModules).flatMap(module => {
  if (module && Array.isArray(module.default)) {
    return module.default;
  }
  return [];
});

// Create a Map to store the latest version of each snippet
const snippetMap = new Map<string, Snippet>();

// Process all snippets and keep the highest version or last seen
[...staticSnippets, ...jsonSnippets].forEach(snippet => {
  const existing = snippetMap.get(snippet.id);
  if (!existing || 
      (snippet._v && (!existing._v || snippet._v > existing._v)) ||
      (!snippet._v && !existing._v)) {
    // Merge tags from tag mappings if they exist
    const mappedTags = tagMap.get(snippet.id);
    if (mappedTags) {
      const allTags = new Set([...(snippet.tags || []), ...mappedTags]);
      snippet.tags = Array.from(allTags);
    }
    snippetMap.set(snippet.id, snippet);
  }
});

// Export all snippets
export const snippets = Array.from(snippetMap.values());