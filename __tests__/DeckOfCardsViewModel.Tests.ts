import '@testing-library/jest-native/extend-expect';
import useDeckOfCardsViewModel, { DeckViewModel, } from '../viewModels/DeckOfCardsViewModel';
import { DeckOfCardsAPI, DeckResponse } from '../services/DeckOfCardsAPI';
import React, { useState, useEffect } from 'react';

const mockCreateDeck = jest.fn().mockImplementation(() => {
  const mockDeck: DeckResponse = {
    deck_id: '123',
    success: true,
    shuffled: false,
    remaining: 0,
  };
  return mockDeck;
});
const mockShuffleDeck = jest.fn();
const mockDrawCards = jest.fn();

jest.mock('../services/DeckOfCardsAPI', () => {
  return {
    DeckOfCardsAPI: jest.fn().mockImplementation(() => {
      return {
        createDeck: mockCreateDeck,
        shuffleDeck: mockShuffleDeck,
        drawCards: mockDrawCards,
      };
    }),
  };
});

const mockDeckAPI = jest.mocked(DeckOfCardsAPI);

const useStateMock = jest.fn().mockImplementation(() => {
  return useState<DeckViewModel>();
  //return [mockDeckAPI, mockSetViewModel];
});

const useEffectMock = jest.fn().mockImplementation(() => {
  return (fn: () => void) => {
    fn();
  };
});

React.useState = useStateMock;

React.useEffect = useEffectMock;

/*
jest.mock('../services/DeckOfCardsAPI', () => ({
  DeckOfCardsAPI: jest.fn(),
}));
*/

describe('DeckOfCardsViewModel', () => {
  beforeEach(() => {
    mockDeckAPI.mockClear();
    mockCreateDeck.mockClear();
    mockShuffleDeck.mockClear();
    mockDrawCards.mockClear();
    useEffectMock.mockClear();
    useStateMock.mockClear();
  });

  it('should create a new deck', async () => {
    const { createDeck } = useDeckOfCardsViewModel();

    await createDeck();

    expect(mockCreateDeck).toHaveBeenCalledTimes(1);
  });

  it('should shuffle the deck', async () => {
    const { createDeck, shuffleDeck, deck } = useDeckOfCardsViewModel();

    await createDeck();

    if (deck) {
      await shuffleDeck();
      expect(mockShuffleDeck).toHaveBeenCalledTimes(1);
      //expect(mockShuffleDeck).toHaveBeenCalledWith(deck.deck_id);
    } else {
      throw new Error('Deck is null');
    }
  });

  it('should draw cards', async () => {
    const { drawCards, deck } = useDeckOfCardsViewModel();
    if (deck) {
      const count = 5;
      await drawCards(count);

      expect(mockDrawCards).toHaveBeenCalledTimes(1);
      //expect(mockDrawCards).toHaveBeenCalledWith(deck.deck_id, 5);
    } else {
      throw new Error('Deck is null');
    }
  });
});
