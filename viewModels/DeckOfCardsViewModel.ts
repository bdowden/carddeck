import React, { useState, useEffect } from 'react';
import { DeckOfCardsAPI, DeckResponse, Card } from '../services/DeckOfCardsAPI';

interface DeckViewModel {
  deck: DeckResponse | null;
  drawnCards: Card[];
  isLoading: boolean;
  error: string | null;
}

const useDeckOfCardsViewModel = () => {
  const [viewModel, setViewModel] = React.useState<DeckViewModel>({
    deck: null,
    drawnCards: [],
    isLoading: false,
    error: null,
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
        setViewModel({ deck: shuffledDeck, drawnCards: [], isLoading: false, error: null });
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

  React.useEffect(() => {
    createDeck();
  }, []); // Empty dependency array means this effect runs once on component mount

  return { ...viewModel, createDeck, shuffleDeck, drawCards };
};

export default useDeckOfCardsViewModel;
