import React from 'react';
import { View } from 'react-native';

export const ViewSeperator = ({ spacing }:{ spacing?: number }) => (
    <View style={{ marginVertical: spacing ?? 8 }} />
)
