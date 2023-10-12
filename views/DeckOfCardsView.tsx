import React from 'react';
import { View, Text, Button,  StyleSheet, ScrollView } from 'react-native';
import useDeckOfCardsViewModel from '../viewModels/DeckOfCardsViewModel';
import CardImageView from './CardImageView';

const DeckOfCardsView: React.FC = () => {
  const {
    deck,
    drawnCards,
    currentCards,
    isLoading,
    error,
    showDrawnCards,
    drawnButtonText,
    createDeck,
    shuffleDeck,
    drawCards,
    toggleShowDrawnCards,
  } = useDeckOfCardsViewModel();

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {deck && (
        <>
          <Text>Deck ID: {deck.deck_id}</Text>
          {currentCards && (
            <>
            <Text>Current Hand:</Text>
            <ScrollView horizontal contentContainerStyle={styles.container}>
            {currentCards.map(card => (
              <CardImageView card={card} />
            ))}
            </ScrollView>
            </>
          )}
          {showDrawnCards && (
            <>
            <Text>Drawn Cards:</Text>
              {drawnCards.map(card => (
                <Text key={card.code}>
                  {card.value} of {card.suit}
                </Text>
              ))}
            </>
          )

          }

          <Button title="Shuffle Deck" onPress={shuffleDeck} />
          <Button title="Draw Cards" onPress={() => drawCards(5)} />
          <Button title="Toggle Drawn Cards" onPress={toggleShowDrawnCards} />
        </>
      )}
      <Button title="Create New Deck" onPress={createDeck} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  containerVert: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default DeckOfCardsView;
