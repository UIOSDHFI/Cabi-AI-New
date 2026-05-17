# TerraMind - AI Nature Explorer

## Concept & Vision

TerraMind is an AI-powered hiking and nature exploration assistant that feels like conversing with a seasoned trail guide. The interface evokes the serenity of standing at a mountain peak — clean, expansive, and deeply connected to the natural world. Every interaction feels organic yet futuristic, blending eco-consciousness with cutting-edge AI technology.

## Design Language

### Aesthetic Direction
**Eco-Futurism meets Nordic Minimalism** — A harmonious fusion where organic shapes meet precise geometry. Inspired by the clean lines of Scandinavian design, the tranquility of Japanese zen gardens, and the technological sophistication of modern AI interfaces like Claude/ChatGPT. The feeling should be: "standing in a glass cabin in an ancient forest."

### Color Palette
```
Primary Colors:
- Forest Deep:     #1B4332  (deep pine green - primary actions, headers)
- Forest Mid:      #2D6A4F  (sage green - secondary elements)
- Forest Light:    #40916C  (moss green - hover states, accents)

Neutral Colors:
- Slate Dark:      #2D3436  (charcoal - primary text)
- Slate Mid:       #636E72  (warm gray - secondary text)
- Slate Light:     #B2BEC3  (muted gray - placeholder, disabled)
- Stone:           #95A5A6  (stone gray - borders, dividers)

Background Colors:
- Mist White:      #F8FAF9  (off-white with green tint - main bg)
- Cloud:            #FFFFFF  (pure white - elevated surfaces)
- Fog:              #EDF4F2  (subtle green-white - cards, panels)

Accent Colors:
- Amber Glow:       #D4A373  (warm amber - highlights, active states)
- Earth Brown:      #8B7355  (terracotta - warm accents)
- Water Blue:       #74B9FF  (stream blue - links, info states)
```

### Typography
- **Headings**: `'DM Serif Display', Georgia, serif` — Elegant, organic serifs that feel timeless like ancient forests
- **Body/UI**: `'Plus Jakarta Sans', system-ui, sans-serif` — Clean, modern, highly readable
- **Monospace**: `'JetBrains Mono', monospace` — For trail data, coordinates, technical info
- **Scale**: 12px / 14px / 16px / 18px / 24px / 32px / 48px

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Border radius: 8px (buttons), 12px (cards), 16px (panels), 24px (large containers)
- Sidebar width: 280px (expanded), 72px (collapsed)
- Max content width: 800px (chat area)

### Motion Philosophy
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` — Smooth, natural deceleration like a falling leaf
- **Durations**: 150ms (micro), 250ms (standard), 400ms (emphasis), 600ms (dramatic)
- **Principles**:
  - Subtle depth through layered shadows
  - Organic "breathing" animations on idle states
  - Smooth reveals like morning mist clearing
  - Gentle scaling on interactions like pebbles in water

### Visual Assets
- **Icons**: Phosphor Icons (thin weight) — organic, hand-drawn feel
- **Background**: Custom SVG topographic map lines with subtle animation
- **Decorative**: Organic blob shapes, gradient meshes suggesting terrain
- **Imagery**: Abstract nature patterns, topographic textures

## Layout & Structure

### Desktop Layout (1200px+)
```
┌──────────────────────────────────────────────────────────────────┐
│ ┌─────────┐ ┌──────────────────────────────────────────────────┐ │
│ │         │ │                                                  │ │
│ │ SIDEBAR │ │              TOPOGRAPHIC BACKGROUND              │ │
│ │         │ │                                                  │ │
│ │ [Logo]  │ │   ┌─────────────────────────────────────────┐    │ │
│ │ [Toggle]│ │   │                                         │    │ │
│ │         │ │   │         WELCOME MESSAGE AREA            │    │ │
│ │ ─────── │ │   │    (Centered, with suggested prompts)    │    │ │
│ │         │ │   │                                         │    │ │
│ │ Nav     │ │   └─────────────────────────────────────────┘    │ │
│ │ Items   │ │                                                  │ │
│ │         │ │                                                  │ │
│ │ ─────── │ │                                                  │ │
│ │         │ │                                                  │ │
│ │ Recent  │ │                                                  │ │
│ │ Chats   │ │                                                  │ │
│ │         │ │                                                  │ │
│ │ ─────── │ │                                                  │ │
│ │         │ │                                                  │ │
│ │ Settings│ │   ┌─────────────────────────────────────────┐    │ │
│ │ [Theme] │ │   │  ┌─────────────────────────────────────┐│    │ │
│ │ [Lang]  │ │   │  │     FLOATING INPUT BOX             ││    │ │
│ └─────────┘ │   │  │  [Icon] Type your message...  [Send]││    │ │
│             │   │  └─────────────────────────────────────┘│    │ │
│             │   └─────────────────────────────────────────┘    │ │
└──────────────────────────────────────────────────────────────────┘
```

### Visual Pacing
1. **Sidebar (Left)**: Dense navigation, vertical rhythm, collapsible to icon-only mode
2. **Main Chat Area**: Expansive, breathable, topographic background creates depth
3. **Welcome Section**: Generous whitespace, centered focal point, invitation to explore
4. **Input Area**: Floating card with glassmorphism, anchored to bottom with breathing room

### Responsive Strategy
- **Desktop (1200px+)**: Full layout, sidebar visible
- **Tablet (768-1199px)**: Sidebar collapses to icon-only by default
- **Mobile (<768px)**: Sidebar becomes overlay drawer

## Features & Interactions

### 1. Collapsible Sidebar
- **Toggle behavior**: Click hamburger icon or swipe edge gesture
- **Animation**: Width transitions from 280px to 72px over 300ms
- **Collapsed state**: Shows only icons with tooltips on hover
- **Expanded state**: Full labels with subtle icons
- **Active indicator**: Left border accent + background tint

### 2. Chat Interface
- **Message bubbles**: 
  - User: Right-aligned, Forest Deep bg, white text, rounded corners (18px, 18px, 4px, 18px)
  - AI: Left-aligned, glassmorphic card with subtle border, avatar with glow effect
- **Typing indicator**: Three dots with staggered bounce animation
- **Scroll behavior**: Smooth auto-scroll on new message, scroll-to-bottom FAB appears when scrolled up

### 3. Floating Input Box
- **Position**: Centered, bottom of chat area, 24px from edges
- **Style**: Glassmorphic card (backdrop-blur: 20px, bg: rgba(255,255,255,0.8))
- **Height**: Auto-expand up to 160px
- **Border**: Subtle gradient border (forest green to amber)
- **Send button**: Pebble-shaped, transforms on hover (scale 1.05)
- **Keyboard shortcuts**: Enter to send, Shift+Enter for newline

### 4. Welcome Experience
- **Logo animation**: Gentle fade-in with slight upward drift
- **Suggested prompts**: 3 cards with nature-themed suggestions, staggered reveal
- **Quick actions**: Recent conversations, favorite trails, weather check

### 5. Navigation Items
- **Home**: Mountain icon, returns to welcome
- **Explore**: Compass icon, discover new trails
- **My Trails**: Footprint icon, saved hiking plans
- **Weather**: Cloud icon, current conditions
- **Gear**: Backpack icon, equipment suggestions
- **Settings**: Gear icon, preferences

### Edge Cases & States
- **Empty state**: Illustrated nature scene with "Start your journey" CTA
- **Loading state**: Pulsing topographic lines animation
- **Error state**: Warm amber notification with retry action
- **Offline state**: Cached responses indicator, sync when online

## Component Inventory

### 1. Sidebar Panel
- **Default**: Semi-transparent white, subtle left shadow
- **Hover on items**: Background shifts to Fog color
- **Active item**: Left border accent (4px Forest Deep), background Fog
- **Collapsed**: Icon-only, tooltips on hover

### 2. Message Bubble (User)
- **Background**: Forest Deep (#1B4332)
- **Text**: White, 15px Plus Jakarta Sans
- **Border-radius**: 18px 18px 4px 18px
- **Max-width**: 70% of chat area
- **Animation**: Slide-up + fade-in on appear

### 3. Message Bubble (AI)
- **Background**: rgba(255,255,255,0.7) with backdrop-blur
- **Border**: 1px solid rgba(27,67,50,0.1)
- **Avatar**: Circular, Forest Mid bg, mountain icon, subtle glow
- **Timestamp**: Slate Light, 11px, appears on hover

### 4. Input Card
- **Background**: rgba(255,255,255,0.85), backdrop-blur: 20px
- **Border**: 1px solid rgba(27,67,50,0.15)
- **Shadow**: 0 8px 32px rgba(27,67,50,0.1)
- **Border-radius**: 24px
- **Focus state**: Border color transitions to Forest Mid

### 5. Pebble Button (Send)
- **Shape**: Rounded rectangle (pebble-shaped), aspect ratio ~1.5:1
- **Background**: Forest Deep gradient
- **Icon**: Arrow-up, white, 18px
- **Hover**: Scale 1.05, shadow intensifies, background brightens
- **Active**: Scale 0.98
- **Disabled**: Opacity 0.5, cursor not-allowed

### 6. Navigation Item
- **Default**: Slate Mid icon + text, no background
- **Hover**: Fog background, Forest Mid text
- **Active**: Fog background, Forest Deep text, left accent border
- **Collapsed**: Icon only, centered

### 7. Suggested Prompt Card
- **Background**: White with subtle gradient
- **Border**: 1px solid Stone with hover transition to Forest Light
- **Icon**: Phosphor icon in Forest Mid
- **Text**: Slate Dark, 14px
- **Hover**: Lift effect (translateY -2px), shadow increases

### 8. Topographic Background
- **Pattern**: SVG path lines resembling contour maps
- **Color**: Forest Light (#40916C) at 5-10% opacity
- **Animation**: Slow drift animation (20s cycle), subtle parallax on scroll
- **Density**: Sparse in chat area, denser in sidebar region

## Technical Approach

### Stack
- **Framework**: Vanilla HTML/CSS/JS (single-file for maximum portability)
- **Icons**: Phosphor Icons via CDN
- **Fonts**: Google Fonts (DM Serif Display, Plus Jakarta Sans, JetBrains Mono)
- **Animations**: CSS animations + minimal JS for interactivity

### Architecture
- Single HTML file with embedded CSS and modular JS
- CSS custom properties for theming
- Semantic HTML5 structure
- Progressive enhancement approach

### Key Implementation Details
1. **Glassmorphism**: `backdrop-filter: blur(20px)` with fallback
2. **Topographic pattern**: Inline SVG with CSS animation
3. **Sidebar collapse**: CSS transform + JS toggle class
4. **Input auto-expand**: JS textarea height adjustment
5. **Message animation**: CSS keyframes with animation-delay for stagger
6. **Responsive**: CSS Grid + Flexbox with mobile-first media queries

### Performance Considerations
- Hardware-accelerated animations (transform, opacity only)
- Lazy-load non-critical resources
- Efficient SVG patterns (no unnecessary paths)
- Minimal DOM manipulation
