# TerraMind - AI Nature Explorer

## Project Overview
- **Type**: Single-page web application (AI chatbot interface)
- **Core Functionality**: AI assistant for hiking and nature exploration with chat interface
- **Target Users**: Hikers, outdoor enthusiasts, nature explorers

## Design System

### Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Forest Deep | `#1B4332` | Primary buttons, user messages |
| Forest Mid | `#2D6A4F` | Secondary elements, hover states |
| Forest Light | `#40916C` | Accents, links |
| Mist White | `#F8FAF9` | Main background |
| Cloud | `#FFFFFF` | Elevated surfaces |
| Fog | `#EDF4F2` | Cards, panels background |
| Amber Glow | `#D4A373` | Highlights, warm accents |

### Typography
- **Display**: DM Serif Display (headings)
- **Body**: Plus Jakarta Sans (UI text)
- **Monospace**: JetBrains Mono (technical info)

### Icons
- Phosphor Icons (thin weight) via CDN

## Architecture
- **Framework**: Vanilla HTML/CSS/JS (single-file)
- **Styling**: CSS custom properties for theming
- **Animations**: CSS keyframes + JS for interactivity

## Key Components

### 1. Collapsible Sidebar
- Width: 280px (expanded) / 72px (collapsed)
- Toggle button with rotation animation
- Tooltips appear when collapsed
- Mobile: overlay drawer pattern

### 2. Chat Interface
- Welcome section with animated logo and prompt cards
- Message bubbles: user (right, green) / AI (left, glassmorphic)
- Typing indicator with bouncing dots
- Auto-scroll on new messages

### 3. Floating Input Box
- Glassmorphic card (backdrop-blur: 20px)
- Auto-expanding textarea (max 160px)
- Pebble-shaped send button with hover effects
- Enter to send, Shift+Enter for newline

### 4. Topographic Background
- SVG pattern with subtle animation
- 30s drift animation cycle
- 5-10% opacity for subtlety

## File Structure
```
/workspace/projects/
├── index.html      # Complete single-file application
├── styles/         # (unused, styles embedded in HTML)
├── SPEC.md         # Design specification
├── .coze          # Project configuration
└── AGENTS.md      # This file
```

## Features Implemented
- [x] Responsive sidebar (desktop/tablet/mobile)
- [x] Welcome section with suggested prompts
- [x] Chat message system (user/AI messages)
- [x] Typing indicator animation
- [x] Auto-expanding input
- [x] Topographic background animation
- [x] Glassmorphism effects
- [x] Navigation with active states
- [x] Scroll-to-bottom button
- [x] Mobile-responsive layout

## Development Commands
- **Dev server**: `python -m http.server 5000 --bind 0.0.0.0`
- **Build**: N/A (static HTML)
- **Deploy**: Static file serving

## External Dependencies
- Google Fonts: DM Serif Display, Plus Jakarta Sans, JetBrains Mono
- Phosphor Icons: @phosphor-icons/web@2.0.3

## Notes
- All animations use GPU-accelerated properties (transform, opacity)
- Scroll behavior is smooth with custom scrollbar styling
- Selection color matches the forest palette
