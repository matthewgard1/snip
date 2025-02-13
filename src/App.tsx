import React, { useState, useMemo } from 'react';
import { Search, Code2, X } from 'lucide-react';
import { snippets } from './data/snippets';
import { SnippetCard } from './components/SnippetCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = useMemo(() => {
    const uniqueLanguages = new Set(snippets.map(s => s.language));
    return Array.from(uniqueLanguages).sort();
  }, []);

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = 
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-1.5">
          <div className="flex items-center gap-3 h-8">
            <div className="flex items-center gap-1.5 text-white">
              <Code2 size={20} />
              <h1 className="text-base font-bold">Snippets</h1>
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

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {filteredSnippets.map(snippet => (
            <div key={snippet.id} className="p-px first:pt-0 last:pb-0">
              <SnippetCard
                title={snippet.title}
                description={snippet.description}
                language={snippet.language}
                code={snippet.code}
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