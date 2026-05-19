---
name: Aura Subscriptions
colors:
  surface: '#fff8f6'
  surface-dim: '#ead6d0'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ed'
  surface-container: '#fee9e3'
  surface-container-high: '#f9e4de'
  surface-container-highest: '#f3ded8'
  on-surface: '#241916'
  on-surface-variant: '#57423b'
  inverse-surface: '#3a2e2a'
  inverse-on-surface: '#ffede8'
  outline: '#8a726a'
  outline-variant: '#dec0b7'
  surface-tint: '#6d3bd7'
  primary: '#6d3bd7'
  on-primary: '#ffffff'
  primary-container: '#a37eff'
  on-primary-container: '#380089'
  inverse-primary: '#d0bcff'
  secondary: '#006876'
  on-secondary: '#ffffff'
  secondary-container: '#6ee8fe'
  on-secondary-container: '#006775'
  tertiary: '#006c51'
  on-tertiary: '#ffffff'
  tertiary-container: '#37a783'
  on-tertiary-container: '#003526'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#a0efff'
  secondary-fixed-dim: '#5ad7ed'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e59'
  tertiary-fixed: '#8cf7ce'
  tertiary-fixed-dim: '#6fdab3'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#00513c'
  background: '#fff8f6'
  on-background: '#241916'
  surface-variant: '#f3ded8'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is built for a sophisticated subscription management platform that balances financial clarity with a sense of calm and wellness. The aesthetic is **Minimalist with a Warm Editorial touch**, moving away from cold, industrial fintech visuals toward a more approachable, human-centric experience. 

The UI should evoke a sense of organized serenity. It utilizes generous whitespace, intentional focal points, and a high-contrast type scale to ensure users feel in control of their recurring commitments without feeling overwhelmed by data.

## Colors

The palette is anchored by a warm, organic background that differentiates the product from typical white-label software, now energized with a more vibrant and diverse color strategy.

- **Primary (#8B5CF6):** A bold, technical violet used for primary actions and active states. It provides a professional "app" feel while maintaining modern elegance.
- **Secondary (#5EDAF0):** A bright, refreshing cyan used for highlights, accents, and secondary actions to provide visual energy and clarity.
- **Tertiary (#13906E):** A deep, forest emerald used for success states and stable financial categorization.
- **Neutral/Background (#FFF8F6):** A warm, cream-tinted base for all surfaces. It reduces eye strain and provides a premium, paper-like quality.
- **Text/Ink (#241916):** A deep, earthy brown-black used for maximum legibility and high-contrast hierarchy.

Avoid using pure black (#000000) or pure white (#FFFFFF). All "white" surfaces should be tinted with the warm surface-container variables.

## Typography

The typography system relies exclusively on **Inter** to maintain a systematic, utilitarian, and highly legible interface. 

The hierarchy is driven by weight and scale rather than font mixing. Large display titles use a tight letter spacing and bold weights to command attention, while body text maintains a generous line height for maximum readability. Labels should be used sparingly for metadata and navigation, often employing a semi-bold weight and subtle uppercase styling for distinct categorization.

## Layout & Spacing

This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

The spacing logic follows an 8px base unit. Component internals (like button padding) should use smaller increments (4px, 12px), while layout-level containers should use larger steps (24px, 48px, 80px) to create clear visual breathing room. 

- **Desktop:** Fixed max-width of 1280px for content, centered in the viewport.
- **Margins:** 64px on desktop to emphasize the "Aura" of the content; 16px on mobile to maximize screen real estate.
- **Gutters:** Standardized at 24px across all breakpoints to maintain consistent vertical rhythm.

## Elevation & Depth

Depth is communicated through **Ambient Shadows** and **Tonal Layering**. Because the background is cream-based, shadows should not be pure grey; they must include a tiny percentage of the earthy "Ink" hue to feel integrated.

- **Level 0 (Surface):** The warm background (#FFF8F6).
- **Level 1 (Cards):** Slightly lighter surface (Pure White #FFFFFF) with a very soft, diffused shadow (15% opacity, 20px blur, 4px Y-offset).
- **Level 2 (Modals/Popovers):** Standard White surface with a more pronounced shadow and a 1px border using a 5% opacity version of the "Ink" color.

Avoid heavy borders; use subtle shifts in surface color to define boundaries.

## Shapes

The shape language is **Rounded (Level 2)**, creating a friendly and modern silhouette that feels comfortable to interact with.

- **Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Cards & Large Containers:** 1rem (16px) corner radius.
- **Feature Banners:** 1.5rem (24px) corner radius.

This consistency in curvature ensures that even complex data tables or subscription lists feel soft and approachable.

## Components

### Buttons
- **Primary:** Solid #8B5CF6 with white text. High-contrast, rounded-md.
- **Secondary:** Outlined with a 1.5px stroke in #8B5CF6 or #5EDAF0.
- **Ghost:** No background, #241916 text, used for tertiary actions.

### Cards
Cards are the primary container for subscription items. Use a white background against the warm page. Include a subtle 1px border in a lightened version of the Ink color (opacity 5%) to define edges without adding visual weight.

### Input Fields
Inputs should use a subtle background (a slightly darker cream) rather than a white background to clearly indicate interactability. On focus, the border should transition to #8B5CF6.

### Subscription Chips
Use the Secondary color (#5EDAF0) or Tertiary color (#13906E) at low opacity (10-15%) for chip backgrounds, with full-saturation text to denote categories like "Entertainment," "Utility," or "Trial."

### Lists
Subscription lists should feature high horizontal padding (24px) and clear dividers. Use the Ink color at 10% opacity for hair-thin dividers (1px) to maintain a clean, organized flow.