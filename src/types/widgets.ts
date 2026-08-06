export interface WidgetSettings {
  textColor?: string
  containerWidth?: "small" | "default" | "big"
  backgroundColor?: string
  height?: string
  overlayStrength?: string
  // Optional override for the light color scheme, since the light-mode hero
  // background image (a vibrant colorful polygon photo, unlike dark mode's
  // near-black one) generally needs a lighter overlay strength to keep text
  // legible without washing the color out completely.
  overlayStrengthLight?: string
  textAlignment?:
    | "left"
    | "center"
    | "right"
    | "space-around"
    | "space-between"
    | "space-evenly"
  verticalTextAlignment?: "top" | "center" | "bottom"
  textWidth?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeroWidgetSettings extends WidgetSettings {
  // Inherits all properties from WidgetSettings
  // Hero-specific settings can be added here as needed
}

export interface BenefitsSettings extends WidgetSettings {
  sectionTitle?: string
  sectionSubtitle?: string
}

export interface TestimonialsSettings extends WidgetSettings {
  sectionTitle?: string
  sectionSubtitle?: string
}

export interface FeaturePoint {
  id: number
  number: string
  title: string
  description: string
  position: {
    x: number // Procent från vänster
    y: number // Procent från toppen
  }
}

export interface ScreenshotSlide {
  id: number
  title: string
  description?: string
  imageUrl: string
  imageAlt: string
  features: FeaturePoint[]
}

export interface FeatureScreenshotSettings extends WidgetSettings {
  sectionCaption?: string
  sectionTitle?: string
  description?: string
  slides: ScreenshotSlide[]
}
