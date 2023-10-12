import React, { useState, useEffect } from 'react';
import { DeckOfCardsAPI, DeckResponse, Card } from '../services/DeckOfCardsAPI';
import DeckOfCardsView from '../views/DeckOfCardsView';

/*
  I'm using response data types in my view which I usually don't do
  I'd rather have an intermediary domain layer for these objects
  but this isn't supposed to be a production app
  I'll gladly talk about what I'd change/do better in this code, at least architecturally
*/

export interface DeckViewModel {
  deck: DeckResponse | null;
  drawnCards: Card[];
  currentCards: Card[];
  isLoading: boolean;
  error: string | null;
  drawnButtonText: string;
  showDrawnCards: boolean;
}

const useDeckOfCardsViewModel = () => {
  const [viewModel, setViewModel] = React.useState<DeckViewModel>({
    deck: null,
    drawnCards: [],
    currentCards: [],
    isLoading: false,
    error: null,
    showDrawnCards: false,
    drawnButtonText: 'Show Drawn Cards',
  });

  const deckAPI = new DeckOfCardsAPI();

  const createDeck = async () => {
    try {
      setViewModel((prevViewModel) => ({ ...prevViewModel, isLoading: true }));

      const deck = await deckAPI.createDeck();
      setViewModel({ deck, drawnCards: [], isLoading: false, error: null });
    } catch (error) {
      setViewModel((prevViewModel) => ({
        ...prevViewModel,
        isLoading: false,
        error: 'Error creating deck.',
      }));
    }
  };

  const shuffleDeck = async () => {
    try {
      if (viewModel.deck) {
        setViewModel((prevViewModel) => ({ ...prevViewModel, isLoading: true }));

        const shuffledDeck = await deckAPI.shuffleDeck(viewModel.deck.deck_id);
        setViewModel({ deck: shuffledDeck, currentCards: [], drawnCards: [], isLoading: false, error: null });
      }
    } catch (error) {
      setViewModel((prevViewModel) => ({
        ...prevViewModel,
        isLoading: false,
        error: 'Error shuffling deck.',
      }));
    }
  };

  const drawCards = async (count: number) => {
    try {
      if (viewModel.deck) {
        setViewModel((prevViewModel) => ({ ...prevViewModel, isLoading: true }));

        const drawnCards = await deckAPI.drawCards(viewModel.deck.deck_id, count);
        setViewModel((prevViewModel) => ({
          ...prevViewModel,
          drawnCards: [...prevViewModel.drawnCards, ...drawnCards],
          currentCards: [...drawnCards],
          isLoading: false,
          error: null,
        }));
      }
    } catch (error) {
      setViewModel((prevViewModel) => ({
        ...prevViewModel,
        isLoading: false,
        error: 'Error drawing cards.',
      }));
    }
  };

  const toggleShowDrawnCards = () => {
    setViewModel((prevViewModel) => ({
      ...prevViewModel,
      showDrawnCards: !prevViewModel.showDrawnCards,
      drawnButtonText: (!prevViewModel.showDrawnCards ? 'Show Drawn Cards' : 'Hide Drawn Cards'),
    }));
  };

  React.useEffect(() => {
    createDeck();
  }, []); // Empty dependency array means this effect runs once on component mount

  return { ...viewModel, createDeck, shuffleDeck, drawCards, toggleShowDrawnCards };
};

export default useDeckOfCardsViewModel;
