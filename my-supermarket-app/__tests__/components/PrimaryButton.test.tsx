import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from '../../src/components/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders the provided title', () => {
    const { getByText } = render(<PrimaryButton title="Save" />);
    expect(getByText('Save')).toBeTruthy();
  });

  it('invokes onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <PrimaryButton title="Tap" onPress={onPress} testID="primary-btn" />
    );
    fireEvent.press(getByTestId('primary-btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});