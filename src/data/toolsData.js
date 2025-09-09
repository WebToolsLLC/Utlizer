// src/data/toolsData.js
export const tools = [
  // PRODUCTIVITY AND TIME MANAGEMENT
  {
    id: 'online-timer',
    name: 'Online Timer',
    category: 'productivity',
    description: 'Set countdown timers for your tasks and activities with customizable alerts',
    keywords: 'timer, countdown, alarm, productivity tool, online timer, stopwatch',
    metaTitle: 'Online Timer - Free Countdown Tool | Utlizer',
    metaDescription: 'Use our free online timer to set countdowns for cooking, workouts, meetings, and more. Simple, customizable, and easy to use.',
    component: 'TimerComponent',
    featured: true,
    popularity: 95,
    icon: 'timer.svg',
    slug: 'online-timer',
    difficulty: 'easy',
    estimatedTime: '1 min',
    useCases: ['Cooking', 'Workouts', 'Meetings', 'Study sessions', 'Breaks']
  },
  {
    id: 'online-stopwatch',
    name: 'Online Stopwatch',
    category: 'productivity',
    description: 'Track elapsed time for events, exercises, or speeches with precision',
    keywords: 'stopwatch, timer, elapsed time, tracking, precision timing',
    metaTitle: 'Online Stopwatch - Free Time Tracking Tool | Utlizer',
    metaDescription: 'Track time with our free online stopwatch. Perfect for timing events, exercises, speeches, and any activity.',
    component: 'StopwatchComponent',
    featured: true,
    popularity: 88,
    icon: 'stopwatch.svg',
    slug: 'online-stopwatch',
    difficulty: 'easy',
    estimatedTime: '1 min',
    useCases: ['Exercise timing', 'Speech timing', 'Event tracking', 'Performance measurement']
  },
  {
    id: 'online-alarm-clock',
    name: 'Online Alarm Clock',
    category: 'productivity',
    description: 'Set audible alarms at specific times with customizable sounds',
    keywords: 'alarm clock, alarm, reminder, notification, time alert',
    metaTitle: 'Online Alarm Clock - Free Alarm Tool | Utlizer',
    metaDescription: 'Set alarms with our free online alarm clock. Customizable sounds and precise timing for your daily reminders.',
    component: 'AlarmClockComponent',
    featured: true,
    popularity: 82,
    icon: 'alarm.svg',
    slug: 'online-alarm-clock',
    difficulty: 'easy',
    estimatedTime: '1 min',
    useCases: ['Daily reminders', 'Meeting alerts', 'Medication reminders', 'Break notifications']
  },
  {
    id: 'world-clock',
    name: 'World Clock',
    category: 'productivity',
    description: 'View current time in different time zones around the world',
    keywords: 'world clock, time zone, international time, global time, timezone converter',
    metaTitle: 'World Clock - Free Time Zone Converter | Utlizer',
    metaDescription: 'Check current time in any timezone with our free world clock. Essential for coordinating with international contacts.',
    component: 'WorldClockComponent',
    featured: true,
    popularity: 90,
    icon: 'world-clock.svg',
    slug: 'world-clock',
    difficulty: 'easy',
    estimatedTime: '30 sec',
    useCases: ['International meetings', 'Travel planning', 'Global coordination', 'Time zone reference']
  },
  {
    id: 'online-notes',
    name: 'Online Notes',
    category: 'productivity',
    description: 'Quick online notepad for jotting down thoughts without needing an account',
    keywords: 'notes, notepad, text editor, quick notes, online writing',
    metaTitle: 'Online Notes - Free Text Editor | Utlizer',
    metaDescription: 'Write and save notes instantly with our free online notepad. No account required, works offline.',
    component: 'NotesComponent',
    featured: false,
    popularity: 75,
    icon: 'notes.svg',
    slug: 'online-notes',
    difficulty: 'easy',
    estimatedTime: '30 sec',
    useCases: ['Quick notes', 'Meeting minutes', 'Ideas capture', 'Temporary text storage']
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    category: 'productivity',
    description: 'Create shorter, more manageable links for sharing on social media',
    keywords: 'url shortener, link shortener, short url, bitly alternative, link management',
    metaTitle: 'URL Shortener - Free Link Shortening Tool | Utlizer',
    metaDescription: 'Shorten long URLs instantly with our free URL shortener. Perfect for social media sharing and link management.',
    component: 'UrlShortenerComponent',
    featured: true,
    popularity: 85,
    icon: 'url-shortener.svg',
    slug: 'url-shortener',
    difficulty: 'easy',
    estimatedTime: '30 sec',
    useCases: ['Social media sharing', 'Email links', 'Print materials', 'QR code generation']
  },
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'productivity',
    description: 'Generate random numbers for lotteries, contests, or statistical purposes',
    keywords: 'random number, generator, lottery, contest, random picker',
    metaTitle: 'Random Number Generator - Free Random Tool | Utlizer',
    metaDescription: 'Generate random numbers instantly with our free tool. Perfect for lotteries, contests, and statistical sampling.',
    component: 'RandomNumberComponent',
    featured: false,
    popularity: 70,
    icon: 'random-number.svg',
    slug: 'random-number-generator',
    difficulty: 'easy',
    estimatedTime: '30 sec',
    useCases: ['Lottery numbers', 'Contest winners', 'Statistical sampling', 'Random selection']
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'productivity',
    description: 'Create QR codes from text, URLs, or contact information',
    keywords: 'qr code, generator, barcode, quick response, mobile scanning',
    metaTitle: 'QR Code Generator - Free QR Code Creator | Utlizer',
    metaDescription: 'Generate QR codes instantly from text, URLs, or contact info. Free, customizable, and easy to use.',
    component: 'QrCodeComponent',
    featured: true,
    popularity: 80,
    icon: 'qr-code.svg',
    slug: 'qr-code-generator',
    difficulty: 'easy',
    estimatedTime: '30 sec',
    useCases: ['Contact sharing', 'Website promotion', 'WiFi sharing', 'Event information']
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    category: 'productivity',
    description: 'Productivity technique using timed work intervals to improve focus',
    keywords: 'pomodoro, productivity, focus, work intervals, time management',
    metaTitle: 'Pomodoro Timer - Free Focus Tool | Utlizer',
    metaDescription: 'Boost productivity with our free Pomodoro timer. Work in focused 25-minute intervals with built-in breaks.',
    component: 'PomodoroComponent',
    featured: true,
    popularity: 92,
    icon: 'pomodoro.svg',
    slug: 'pomodoro-timer',
    difficulty: 'easy',
    estimatedTime: '1 min',
    useCases: ['Work focus', 'Study sessions', 'Task completion', 'Productivity improvement']
  }
];

// Tool categories
export const categories = [
  {
    id: 'productivity',
    name: 'Productivity & Time Management',
    description: 'Tools to boost productivity and manage time effectively',
    icon: 'productivity.svg',
    color: '#3B82F6',
    tools: tools.filter(tool => tool.category === 'productivity')
  }
];

// Utility functions
export const getToolData = (category, toolSlug) => {
  return tools.find(tool => tool.category === category && tool.slug === toolSlug);
};

export const getToolsByCategory = (category) => {
  return tools.filter(tool => tool.category === category);
};

export const getAllToolPaths = () => {
  return tools.map(tool => ({
    params: {
      category: tool.category,
      tool: tool.slug
    }
  }));
};

export const getFeaturedTools = () => {
  return tools.filter(tool => tool.featured);
};

export const getPopularTools = (limit = 10) => {
  return tools
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const searchTools = (query) => {
  const searchTerm = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.keywords.toLowerCase().includes(searchTerm) ||
    tool.useCases.some(useCase => useCase.toLowerCase().includes(searchTerm))
  );
};

export const getRelatedTools = (currentTool, limit = 5) => {
  return tools
    .filter(tool => 
      tool.category === currentTool.category && 
      tool.id !== currentTool.id
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getCategoryData = (categoryId) => {
  return categories.find(cat => cat.id === categoryId);
};

export const getAllCategories = () => {
  return categories;
};

export const getCategoryPaths = () => {
  return categories.map(category => ({
    params: {
      category: category.id
    }
  }));
};
