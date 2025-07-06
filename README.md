# Tarkov Hideout Item Checker

A React-TypeScript web application that helps Escape from Tarkov players track their Hideout progression and calculate required materials.

## Features

- **Real-time Material Tracking**: Calculate exactly what items you need for your next hideout upgrades
- **Game Edition Support**: Automatic configuration for Standard, Left Behind, Prepare for Escape, and Edge of Darkness editions
- **PMC Level Integration**: Hideout restrictions based on your PMC level and trader availability
- **Offline Functionality**: Works without internet connection using static fallback data
- **Persistent Progress**: Your hideout levels are saved locally between sessions
- **Japanese UI**: Native Japanese interface with English item names

## Live Demo

Visit the live application: [https://naorespawn.github.io/tarkov-hideout-item-checker/](https://naorespawn.github.io/tarkov-hideout-item-checker/)

## Development Setup

### Prerequisites

- Node.js 16+ 
- npm

### Installation

```bash
git clone https://github.com/naorespawn/tarkov-hideout-item-checker.git
cd tarkov-hideout-item-checker
npm install
```

### Available Scripts

#### Development
```bash
npm start          # Start development server at http://localhost:3000
npm run build      # Create production build
npm test          # Run tests in watch mode
```

#### Testing
```bash
npx playwright test           # Run end-to-end tests
npx playwright test --ui      # Run tests with Playwright UI
npx playwright test --headed  # Run tests in headed mode
```

#### Deployment
```bash
npm run deploy    # Deploy to GitHub Pages
```

## Architecture

### Core Services
- **HideoutDataService**: API integration with tarkov.dev GraphQL endpoint and 24-hour caching
- **HideoutPrerequisiteService**: Complex dependency calculations between hideout modules
- **TraderLevelService**: PMC level to trader level mappings and restrictions
- **GameEditionService**: Game edition configurations and initial state management

### Data Flow
1. App loads immediately with static fallback data
2. Async API call fetches fresh data from tarkov.dev
3. User progress persisted to localStorage
4. Real-time material calculations with useMemo optimization

### Key Features
- **Smart Caching**: 24-hour localStorage cache with graceful API fallback
- **Complex Dependencies**: Handles prerequisite chains between hideout modules
- **PMC Level Restrictions**: Certain modules require specific trader levels
- **Material Aggregation**: Combines requirements from all buildable modules

## Technical Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with utility-first approach
- **Build**: CRACO (Create React App Configuration Override)
- **Testing**: Playwright for E2E testing
- **API**: tarkov.dev GraphQL integration
- **Deployment**: GitHub Pages

## Data Sources

- **Hideout Data**: [tarkov.dev API](https://api.tarkov.dev/graphql)
- **Item Icons**: tarkov.dev
- **Game Information**: [Escape from Tarkov Wiki](https://escapefromtarkov.fandom.com/wiki/Hideout)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npx playwright test`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).