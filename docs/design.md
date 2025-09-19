# Virtual Assets Design Document

## Overview

When testing our Virtual Power Plant, we need to have assets that can act in a predictable way in order to test new features and do regression.

This web applicaiton will act as one or more assets in the system and be able to:

- Send Telemetry
- Receive a setpoint and act on that

## Design System & Theme

### Color Scheme

- **Primary Brand Color**: Custom primary color with variants for different states
- **Theme Support**: Comprehensive dark/light/system theme switching
- **Color Palette**: Semantic color tokens using CSS variables
  - `--background`, `--foreground`
  - `--card`, `--card-foreground`
  - `--muted`, `--muted-foreground`
  - `--border`, `--primary`, `--secondary`

### Typography

- **Font Stack**: System fonts with fallbacks for optimal performance
- **Hierarchy**: Clear heading scales (text-4xl to text-6xl for hero)
- **Readability**: Proper line heights and letter spacing
- **Responsive**: Adaptive font sizes across breakpoints

### Component Design Philosophy

- **Radix UI Foundation**: Built on Radix UI primitives for accessibility
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Consistent Spacing**: 4px grid system for layouts
- **Modern Aesthetics**: Rounded corners, subtle shadows, smooth transitions

## User Experience (UX) Design

### Navigation & Layout

- **Header**: Sticky navigation with logo, navigation links, and user controls
- **Mobile-First**: Responsive design with mobile slide-out menu
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

### Key User Flows

#### Dashboard

- **Asset Selection**: User should be able to select one or more assets from a dropdown list.
- **Send Telemetry**: User should be able to specify one or more telemetry fields with their values
- **Receive a Setpoint**: When a setpoint is received, the asset will act on that setpoint.

### Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators and logical tab order
- **Skip Links**: "Skip to main content" for screen reader users

### Visual Design Patterns

#### Cards & Components

- **Cards**: Hover effects with scale transforms and color transitions
- **Interactive States**: Consistent hover, focus, and active states
- **Shadows**: Subtle elevation with `shadow-sm` and `shadow-lg`
- **Borders**: Soft borders with opacity variations

#### Responsive Design

- **Breakpoints**: Mobile-first with sm, md, lg, xl, 2xl breakpoints
- **Grid Layouts**: Responsive grids (1-5 columns based on screen size)
- **Flexible Typography**: Responsive text sizing
- **Adaptive Spacing**: Container padding adjusts by screen size

#### Animation & Transitions

- **Smooth Transitions**: 200ms duration for micro-interactions
- **Loading Animations**: Shimmer effects for skeleton screens
- **Progress Indication**: NProgress bar for navigation
- **Transform Effects**: Subtle scale and color transitions

### Brand Identity

- **Logo**: Windpark with the logo "Make Testing Great Again"
- **Voice**: Modern, friendly, encouraging saving
- **Visual Style**: Clean, minimal, focus on content
- **Color Psychology**: Primary colors convey trust

### Performance Considerations

- **Lazy Loading**: Images load on demand
- **Optimized Assets**: Proper image sizing and formats
- **Minimal JavaScript**: Server-side rendering with selective hydration
- **Fast Navigation**: Client-side routing with prefetching

### Error Handling & States

- **Error Boundaries**: Graceful error handling with fallbacks
- **Loading States**: Skeleton screens and spinners
- **Empty States**: Encouraging messages with clear CTAs
- **404 Pages**: Custom not found pages with navigation options
