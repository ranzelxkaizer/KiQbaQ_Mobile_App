import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  
  const isSmall = width < 375;
  const isMedium = width >= 375 && width < 768;
  const isLarge = width >= 768;
  const isTablet = width >= 768;
  
  return {
    width,
    height,
    isSmall,
    isMedium,
    isLarge,
    isTablet,
    // Responsive values
    spacing: {
      xs: isSmall ? 4 : 8,
      sm: isSmall ? 8 : 12,
      md: isSmall ? 12 : 16,
      lg: isSmall ? 16 : 24,
      xl: isSmall ? 24 : 32,
    },
    fontSize: {
      xs: isSmall ? 10 : 12,
      sm: isSmall ? 12 : 14,
      md: isSmall ? 14 : 16,
      lg: isSmall ? 18 : 20,
      xl: isSmall ? 24 : 28,
      xxl: isSmall ? 28 : 32,
    },
  };
};