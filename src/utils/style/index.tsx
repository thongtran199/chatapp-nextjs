export const applyConditionalStyle = ({
  condition,
  baseStyle = {},
  enhancedStyle,
}: {
  condition: boolean;
  baseStyle?: object;
  enhancedStyle: object;
}) => (condition ? { ...baseStyle, ...enhancedStyle } : baseStyle);
