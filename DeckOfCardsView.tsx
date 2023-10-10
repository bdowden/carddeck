import React from 'react';
import { View, Text, Button } from 'react-native';
import useDeckOfCardsViewModel from './DeckOfCardsViewModel';

const DeckOfCardsView: React.FC = () => {
  const {
    deck,
    drawnCards,
    isLoading,
    error,
    createDeck,
    shuffleDeck,
    drawCards,
  } = useDeckOfCardsViewModel();

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {deck && (
        <>
          <Text>Deck ID: {deck.deck_id}</Text>
          <Button title="Shuffle Deck" onPress={shuffleDeck} />
          <Button title="Draw Cards" onPress={() => drawCards(5)} />
          <Text>Drawn Cards:</Text>
          {drawnCards.map((card) => (
            <Text key={card.code}>
              {card.value} of {card.suit}
            </Text>
          ))}
        </>
      )}
      <Button title="Create New Deck" onPress={createDeck} />
    </View>
  );
};

export default DeckOfCardsView;
