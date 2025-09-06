import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  testID?: string;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  className = '',
  textClassName = '',
  testID,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityRole="button"
      activeOpacity={0.8}
      className={`items-center rounded-md bg-blue-600 px-4 py-3 ${disabled ? 'opacity-50' : 'active:bg-blue-700'} ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`font-semibold text-white ${textClassName}`}>{title}</Text>
    </TouchableOpacity>
  );
}