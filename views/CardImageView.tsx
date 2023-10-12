import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card } from '../services/DeckOfCardsAPI';

interface CardImageViewProps {
  card: Card;
}

const CardImageView: React.FC<CardImageViewProps> = ({ card }) => {
  return (
    <Image key={card.code} source={{ uri: card.image }} style={styles.cardImage} />
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
});

export default CardImageView;
