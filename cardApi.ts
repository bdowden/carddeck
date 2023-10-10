import axios, { AxiosResponse } from 'axios';

interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

interface DeckResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

class DeckOfCardsAPI {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://deckofcardsapi.com/api/deck';
  }

  async shuffleDeck(deckId: string): Promise<DeckResponse> {
    const url = `${this.baseUrl}/${deckId}/shuffle/`;
    const response = await axios.get<DeckResponse>(url);
    return response.data;
  }

  async drawCards(deckId: string, count: number): Promise<Card[]> {
    const url = `${this.baseUrl}/${deckId}/draw/?count=${count}`;
    const response = await axios.get<AxiosResponse<Card[]>>(url);
    return response.data.data;
  }

  async createDeck(shuffled: boolean = true): Promise<DeckResponse> {
    const url = `${this.baseUrl}/new/?shuffle=${shuffled ? 'true' : 'false'}`;
    const response = await axios.get<DeckResponse>(url);
    return response.data;
  }
}