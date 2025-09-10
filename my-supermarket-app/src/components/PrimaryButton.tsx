import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  testID?: string;
  style?: any;
  textStyle?: any;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#2563eb', // blue-600
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGreen: {
    backgroundColor: '#16a34a', // green-600
  },
  buttonRed: {
    backgroundColor: '#dc2626', // red-600
  },
  buttonGray: {
    backgroundColor: '#6b7280', // gray-500
  },
  text: {
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  className = '',
  textClassName = '',
  testID,
  style,
  textStyle,
}: PrimaryButtonProps) {
  // Determine button style based on className
  let buttonStyle: any[] = [styles.button];
  if (disabled) buttonStyle.push(styles.buttonDisabled);
  if (className.includes('bg-green')) buttonStyle.push(styles.buttonGreen);
  if (className.includes('bg-red')) buttonStyle.push(styles.buttonRed);
  if (className.includes('bg-gray')) buttonStyle.push(styles.buttonGray);
  if (style) buttonStyle.push(style);

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityRole="button"
      activeOpacity={0.8}
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}