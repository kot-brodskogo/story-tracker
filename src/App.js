import React, { useState, useMemo } from 'react';
import { Calendar, Users, BookOpen, Search, Filter, Clock, MapPin, Tag, Plus, Edit2, User, Eye, Play, Pause, Square } from 'lucide-react';

const StoryTracker = () => {
  // Sample data - in real app this would come from a database
  const [episodes] = useState([
    {
      id: 1,
      title: "Встреча в таверне",
      description: "Главные герои впервые встречаются в портовой таверне 'Золотой якорь'",
      date: "2024-01-15",
      status: "completed",
      currentTurn: null,
      characters: ["Элара", "Торин", "Миранда"],
      location: "Портовый город",
      tags: ["знакомство", "таверна", "начало"],
      genre: "fantasy"
    },
    {
      id: 2,
      title: "Тайна старого маяка",
      description: "Герои исследуют заброшенный маяк и находят древнюю карту",
      date: "2024-01-20",
      status: "active",
      currentTurn: "Элара",
      characters: ["Элара", "Торин"],
      location: "Маяк",
      tags: ["тайна", "исследование", "карта"],
      genre: "mystery"
    },
    {
      id: 3,
      title: "Дорога в горы",
      description: "Путешествие через опасный горный перевал",
      date: "2024-01-25",
      status: "active",
      currentTurn: "Торин",
      characters: ["Элара", "Торин", "Миранда"],
      location: "Горный перевал",
      tags: ["путешествие", "опасность", "горы"],
      genre: "adventure"
    },
    {
      id: 4,
      title: "Секреты библиотеки",
      description: "Поиски древних знаний в магической библиотеке",
      date: "2024-02-01",
      status: "paused",
      currentTurn: "Миранда",
      characters: ["Миранда", "Элара"],
      location: "Магическая библиотека",
      tags: ["знания", "магия", "исследование"],
      genre: "fantasy"
    }
  ]);

  const [characters] = useState([
    {
      id: 1,
      name: "Элара",
      description: "Эльфийская следопытка с острым умом",
      avatar: "🧝‍♀️",
      relationships: ["Торин - союзник", "Миранда - наставница"]
    },
    {
      id: 2,
      name: "Торин",
      description: "Дварфийский воин с добрым сердцем",
      avatar: "⚔️",
      relationships: ["Элара - союзник", "Миранда - друг"]
    },
    {
      id: 3,
      name: "Миранда",
      description: "Мудрая волшебница и хранительница знаний",
      avatar: "🔮",
      relationships: ["Элара - ученица", "Торин - друг"]
    }
  ]);

  const [activeTab, setActiveTab] = useState('timeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [characterFilter, setCharacterFilter] = useState('all');

  // Filter episodes based on search and filters
  const filteredEpisodes = useMemo(() => {
    return episodes.filter(episode => {
      const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           episode.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || episode.status === statusFilter;
      
      const matchesCharacter = characterFilter === 'all' || 
                              episode.characters.includes(characterFilter);
      
      return matchesSearch && matchesStatus && matchesCharacter;
    });
  }, [episodes, searchTerm, statusFilter, characterFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Play className="w-3 h-3" />;
      case 'completed': return <Square className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'completed': return 'Завершён';
      case 'paused': return 'Приостановлен';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Story Tracker</h1>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Новый эпизод</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-6">
          {[
            { id: 'timeline', label: 'Хронология', icon: Calendar },
            { id: 'episodes', label: 'Эпизоды', icon: BookOpen },
            { id: 'characters', label: 'Персонажи', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        {(activeTab === 'timeline' || activeTab === 'episodes') && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Поиск по названию, описанию, тегам..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Все статусы</option>
                <option value="active">Активные</option>
                <option value="completed">Завершённые</option>
                <option value="paused">Приостановленные</option>
              </select>

              <select
                value={characterFilter}
                onChange={(e) => setCharacterFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Все персонажи</option>
                {characters.map(char => (
                  <option key={char.id} value={char.name}>{char.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Хронология эпизодов</span>
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200"></div>
              
              <div className="space-y-8">
                {filteredEpisodes.map((episode, index) => (
                  <div key={episode.id} className="relative flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-4 h-4 rounded-full border-2 ${
                      episode.status === 'active' ? 'bg-green-500 border-green-500' :
                      episode.status === 'completed' ? 'bg-blue-500 border-blue-500' :
                      'bg-yellow-500 border-yellow-500'
                    }`}></div>
                    
                    {/* Episode card */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{episode.title}</h3>
                          <p className="text-sm text-gray-500">{episode.date}</p>
                        </div>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(episode.status)}`}>
                          {getStatusIcon(episode.status)}
                          <span>{getStatusText(episode.status)}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{episode.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center space-x-1 text-purple-600">
                          <Users className="w-4 h-4" />
                          <span>{episode.characters.join(', ')}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{episode.location}</span>
                        </div>
                        
                        {episode.currentTurn && (
                          <div className="flex items-center space-x-1 text-orange-600 font-medium">
                            <Edit2 className="w-4 h-4" />
                            <span>Ход: {episode.currentTurn}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {episode.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'episodes' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>База эпизодов</span>
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEpisodes.map(episode => (
                <div key={episode.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{episode.title}</h3>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(episode.status)}`}>
                      {getStatusIcon(episode.status)}
                      <span>{getStatusText(episode.status)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{episode.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{episode.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{episode.characters.join(', ')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{episode.location}</span>
                    </div>
                    
                    {episode.currentTurn && (
                      <div className="flex items-center space-x-2">
                        <Edit2 className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-600 font-medium">Ход: {episode.currentTurn}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-4">
                    {episode.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {episode.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{episode.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>Просмотр</span>
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Персонажи</span>
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {characters.map(character => (
                <div key={character.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{character.avatar}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{character.name}</h3>
                      <p className="text-sm text-gray-600">{character.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Связи:</h4>
                    {character.relationships.map((rel, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>{rel}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Участвует в {episodes.filter(ep => ep.characters.includes(character.name)).length} эпизодах
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryTracker;
