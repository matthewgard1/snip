import React, { useState, useMemo, useEffect } from 'react';
import { Search, Code2, X, Tag } from 'lucide-react';
import { snippets } from './data/snippets';
import { SnippetCard } from './components/SnippetCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  // Watch for URL changes
  useEffect(() => {
    const checkUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const tag = params.get('tag');
      setTagFilter(tag);
    };

    // Check immediately
    checkUrl();

    // Set up an interval to check the URL
    const interval = setInterval(checkUrl, 100);
    return () => clearInterval(interval);
  }, []);

  const languages = useMemo(() => {
    const uniqueLanguages = new Set(snippets.map(s => s.language));
    return Array.from(uniqueLanguages).sort();
  }, []);

  const tags = useMemo(() => {
    const uniqueTags = new Set(snippets.flatMap(s => s.tags || []));
    return Array.from(uniqueTags).sort();
  }, []);

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = 
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;
    const matchesTag = !tagFilter || snippet.tags?.includes(tagFilter);
    
    return matchesSearch && matchesLanguage && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-3xl ml-auto mr-4">
          <div className="flex items-center gap-3 h-8">
            <div className="flex items-center gap-1.5 text-white">
              <Code2 size={20} />
              <h1 className="text-base font-bold">Dev Snippets</h1>
            </div>
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search snippets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-7 pr-3 h-6 text-sm rounded border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-1.5">
              {languages.map(language => (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(selectedLanguage === language ? null : language)}
                  className={`px-2 h-6 text-xs rounded border transition-colors ${
                    selectedLanguage === language
                      ? 'bg-blue-500 text-white border-blue-400'
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {selectedLanguage === language && (
                    <X size={12} className="inline-block mr-1 -mt-px" />
                  )}
                  {language}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {tagFilter && (
        <div className="max-w-3xl ml-auto mr-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Tag size={12} />
            <span>Filtered by tag:</span>
            <span className="text-blue-400">{tagFilter}</span>
            <a href="?" className="hover:text-blue-300">
              <X size={12} />
            </a>
          </div>
        </div>
      )}

      <main className="max-w-3xl ml-auto mr-4 mt-2">
        <div className="flex flex-col gap-px">
          {filteredSnippets.map(snippet => (
            <div key={snippet.id}>
              <SnippetCard
                title={snippet.title}
                description={snippet.description}
                language={snippet.language}
                code={snippet.code}
                tags={snippet.tags}
              />
            </div>
          ))}
        </div>
        
        {filteredSnippets.length === 0 && (
          <div className="text-center text-gray-400 py-6">
            <p>No snippets found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;