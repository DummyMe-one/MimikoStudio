import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { appearanceApi } from '../services/cmsApi';

interface ThemeSettings {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  surface_color: string;
  dark_background: string;
  text_color: string;
  muted_text_color: string;
  border_color: string;
  heading_font: string;
  body_font: string;
  heading_weight: number;
  body_weight: number;
  heading_size_multiplier: number;
  border_radius: number;
  card_radius: number;
  button_radius: number;
  image_style: string;
  shadow_intensity: string;
  animation_intensity: string;
  section_spacing: string;
  header_style: string;
  header_transparent: boolean;
}

const defaultTheme: ThemeSettings = {
  primary_color: '#C6A15B',
  secondary_color: '#EFE6D6',
  accent_color: '#C6A15B',
  background_color: '#F8F4EC',
  surface_color: '#FFFFFF',
  dark_background: '#241C17',
  text_color: '#302821',
  muted_text_color: '#75695C',
  border_color: '#E8D5B5',
  heading_font: 'Cormorant Garamond',
  body_font: 'Inter',
  heading_weight: 600,
  body_weight: 400,
  heading_size_multiplier: 1.0,
  border_radius: 4,
  card_radius: 8,
  button_radius: 4,
  image_style: 'rounded',
  shadow_intensity: 'subtle',
  animation_intensity: 'elegant',
  section_spacing: 'comfortable',
  header_style: 'luxury',
  header_transparent: false,
};

interface ThemeContextType {
  theme: ThemeSettings;
  setTheme: (t: Partial<ThemeSettings>) => void;
  loading: boolean;
  isConfigured: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  loading: true,
  isConfigured: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeSettings>(defaultTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      const res = await appearanceApi.get();
      if (res.success && res.data) {
        setThemeState({ ...defaultTheme, ...res.data });
      }
      setLoading(false);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary_color);
    root.style.setProperty('--color-secondary', theme.secondary_color);
    root.style.setProperty('--color-accent', theme.accent_color);
    root.style.setProperty('--color-bg', theme.background_color);
    root.style.setProperty('--color-surface', theme.surface_color);
    root.style.setProperty('--color-dark-bg', theme.dark_background);
    root.style.setProperty('--color-text', theme.text_color);
    root.style.setProperty('--color-muted', theme.muted_text_color);
    root.style.setProperty('--color-border', theme.border_color);
    root.style.setProperty('--font-heading', "'" + theme.heading_font + "', serif");
    root.style.setProperty('--font-body', "'" + theme.body_font + "', sans-serif");
    root.style.setProperty('--radius-sm', theme.border_radius + 'px');
    root.style.setProperty('--radius-md', theme.card_radius + 'px');
    root.style.setProperty('--radius-btn', theme.button_radius + 'px');
    root.style.setProperty('--heading-weight', String(theme.heading_weight));
    root.style.setProperty('--body-weight', String(theme.body_weight));
    root.style.setProperty('--heading-scale', String(theme.heading_size_multiplier));

    const imageRadius = theme.image_style === 'sharp' ? '0px' :
                        theme.image_style === 'rounded' ? theme.card_radius + 'px' :
                        theme.image_style === 'organic' ? '24px 4px 24px 4px' :
                        theme.image_style === 'capsule' ? '999px' :
                        theme.image_style === 'arch' ? '50% 50% 4px 4px / 30% 30% 4px 4px' :
                        theme.card_radius + 'px';
    root.style.setProperty('--image-radius', imageRadius);

    const shadow = theme.shadow_intensity === 'none' ? 'none' :
                   theme.shadow_intensity === 'subtle' ? '0 4px 20px rgba(36, 28, 23, 0.06)' :
                   theme.shadow_intensity === 'medium' ? '0 10px 40px rgba(36, 28, 23, 0.1)' :
                   '0 20px 60px rgba(36, 28, 23, 0.15)';
    root.style.setProperty('--shadow', shadow);

    const spacing = theme.section_spacing === 'compact' ? '3rem' :
                    theme.section_spacing === 'comfortable' ? '5rem' :
                    theme.section_spacing === 'spacious' ? '8rem' : '5rem';
    root.style.setProperty('--section-spacing', spacing);

    document.body.style.backgroundColor = theme.background_color;
    document.body.style.color = theme.text_color;
    document.body.style.fontFamily = "'" + theme.body_font + "', sans-serif";
    document.body.style.fontWeight = String(theme.body_weight);
  }, [theme]);

  const setTheme = (updates: Partial<ThemeSettings>) => {
    setThemeState(prev => ({ ...prev, ...updates }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, loading, isConfigured: !loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
