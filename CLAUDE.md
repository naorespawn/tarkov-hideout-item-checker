# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-TypeScript web application that helps Escape from Tarkov players track their Hideout progression and calculate required materials. The app integrates with the tarkov.dev GraphQL API for real-time data while maintaining offline functionality through static fallback data.

## Development Commands

### Building and Running
- `npm start` - Start development server (uses CRACO for Tailwind CSS support)
- `npm run build` - Create production build
- `npm test` - Run tests in watch mode

### Testing
- `npx playwright test` - Run end-to-end tests
- `npx playwright test --ui` - Run tests with Playwright UI
- `npx playwright test --headed` - Run tests in headed mode

## Architecture Overview

### Service Layer Pattern
The application uses a clean service-oriented architecture:

**Core Services:**
- `HideoutDataService` - Primary data management with API integration and 24-hour caching
- `HideoutPrerequisiteService` - Manages module dependencies and prerequisite calculations  
- `TraderLevelService` - Handles PMC level to trader level mappings from tarkov.dev API
- `TarkovApiService` - GraphQL API client for tarkov.dev integration

**Data Flow:**
1. App loads immediately with static fallback data
2. Async API call fetches fresh data from tarkov.dev GraphQL endpoint
3. On success: updates state with API data and caches for 24 hours
4. On failure: continues with fallback data seamlessly
5. User progress persisted to localStorage via custom `useLocalStorage` hook

### State Management
- **No external state library** - Uses React's built-in state with custom hooks
- **Persistent State** - `useLocalStorage` hook for user progress and PMC level
- **Real-time Updates** - useMemo hooks ensure efficient recalculation when dependencies change

### Key Data Structures
- `userProgress: { [moduleId: string]: number }` - Current hideout module levels
- `pmcLevel: number` - Player's PMC level (1-79) for trader access calculations
- Module identification uses `module.id` internally, `module.name` for prerequisite checks

## Critical Implementation Details

### ID vs Name Consistency
**Important:** The codebase uses different identifiers in different contexts:
- `userProgress` uses `module.id` as keys
- `HideoutPrerequisiteService` expects `module.name` as keys
- Always convert between these formats when crossing service boundaries

### API Integration
- **Primary API:** tarkov.dev GraphQL endpoint at `https://api.tarkov.dev/graphql`
- **Caching Strategy:** 24-hour localStorage cache with timestamp validation
- **Fallback Data:** Static JSON files in `/src/data/` for offline functionality
- **Error Handling:** Graceful degradation - API failures don't break the app

### PMC Level Dependencies
The app implements complex dependency chains:
1. PMC level determines available trader levels
2. Trader levels gate certain hideout modules (Air Filtering Unit, Solar Power)
3. Hideout modules have prerequisite relationships (e.g., Rest Space requires Vents Lv.1)
4. MaterialSummary component aggregates requirements only for currently buildable modules

### Testing Setup
- **E2E Testing:** Playwright configured for Chromium with automatic dev server startup
- **Test Location:** `/tests/` directory
- **Base URL:** `http://localhost:3000` (auto-started during tests)

## Technical Stack Specifics

### Build Configuration
- **CRACO** overrides Create React App to support Tailwind CSS without ejecting
- **PostCSS** processes Tailwind directives
- **TypeScript** in strict mode with comprehensive type coverage

### Styling Approach
- **Tailwind CSS** with utility-first methodology
- **Tailwind Forms Plugin** for consistent form styling
- **Responsive Design** with mobile-first breakpoints
- **Japanese Language UI** with English item names

### Performance Considerations
- **Immediate Loading:** Static data prevents loading delays
- **Efficient Re-renders:** useMemo prevents unnecessary recalculations
- **API Caching:** Reduces tarkov.dev API calls and improves offline experience
- **Bundle Size:** Current gzipped main bundle ~82KB

## Common Development Patterns

### Adding New Hideout Requirements
1. Update `hideoutPrerequisiteService.ts` with new prerequisite mappings
2. Ensure module name mappings in `getStationIdByName()` are complete
3. Test both PMC level restrictions and module prerequisite chains

### API Data Integration
1. Add new fields to TypeScript interfaces in `/src/types/hideout.ts`
2. Update GraphQL queries in services
3. Implement fallback data compatibility in static JSON files

### Component State Updates
- Use `userProgress[module.id]` for getting current levels
- Convert to `userProgressByName` when calling HideoutPrerequisiteService
- Always trigger re-renders through proper React state updates

## Key Files for Understanding

- `/src/components/HideoutTracker.tsx` - Main application logic and state management
- `/src/components/MaterialSummary.tsx` - Complex aggregation logic with real-time updates
- `/src/services/hideoutDataService.ts` - Data fetching strategy and caching implementation
- `/src/services/hideoutPrerequisiteService.ts` - Business logic for module dependencies
- `/src/types/hideout.ts` - Core type definitions for the entire application