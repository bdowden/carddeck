import '@testing-library/jest-native/extend-expect';
import useDeckOfCardsViewModel from '../viewModels/DeckOfCardsViewModel';
import { DeckOfCardsAPI } from '../services/DeckOfCardsAPI';

jest.mock('../services/DeckOfCardsAPI', () => ({
  DeckOfCardsAPI: jest.fn(),
}));

const mockDeckAPI = new DeckOfCardsAPI() as jest.Mocked<DeckOfCardsAPI>;

describe('DeckOfCardsViewModel', () => {
  beforeEach(() => {
    console.log(JSON.stringify(mockDeckAPI));
    mockDeckAPI.createDeck.mockClear();
    mockDeckAPI.shuffleDeck.mockClear();
    mockDeckAPI.drawCards.mockClear();
  });

  it('should create a new deck', async () => {
    const { createDeck } = useDeckOfCardsViewModel();

    await createDeck();

    expect(mockDeckAPI.createDeck).toHaveBeenCalledTimes(1);
  });

  it('should shuffle the deck', async () => {
    const { shuffleDeck, deck } = useDeckOfCardsViewModel();
    if (deck) {
      await shuffleDeck();
      expect(mockDeckAPI.shuffleDeck).toHaveBeenCalledTimes(1);
      expect(mockDeckAPI.shuffleDeck).toHaveBeenCalledWith(deck.deck_id);
    } else {
      throw new Error('Deck is null');
    }
  });

  it('should draw cards', async () => {
    const { drawCards, deck } = useDeckOfCardsViewModel();
    if (deck) {
      const count = 5;
      await drawCards(count);
      expect(mockDeckAPI.drawCards).toHaveBeenCalledTimes(1);
      expect(mockDeckAPI.drawCards).toHaveBeenCalledWith(deck.deck_id, 5);
    } else {
      throw new Error('Deck is null');
    }
  });
});
