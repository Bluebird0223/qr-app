// components/navigation/TabBarIcon.js
import React from "react";
import { View } from "react-native";
import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const iconSize = 24;

export function TabBarIcon({ name, color, iconType }) {
  let IconComponent;

  switch (iconType) {
    case 'AntDesign':
      IconComponent = AntDesign;
      break;
    case 'FontAwesome5':
      IconComponent = FontAwesome5;
      break;
    case 'MaterialCommunity':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    default:
      IconComponent = MaterialIcons;
      break;
  }

  return (
    <View>
      <IconComponent name={name} size={iconSize} color={color} />
    </View>
  );
}
