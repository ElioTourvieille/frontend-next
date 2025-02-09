export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nest-2hsm.onrender.com';

interface SearchResponse {
  id: number;
  name: string;
  buyIn: number;
  startTime: string;
  room: string;
  format: string;
  variant?: string;
  type?: string;
}

export const TournamentService = {
  async getAllTournaments() {
    try {
      // Use searchTournaments without filters to retrieve all tournaments
      const results = await this.searchTournaments({});
      return results.data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des tournois:', error);
      return [];
    }
  },

  async searchTournaments(filters: {
    room?: string;
    minBuyIn?: number;
    maxBuyIn?: number;
    format?: string;
    variant?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${BACKEND_URL}/tournaments/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche des tournois');
      }

      const data = await response.json();
      
      // Utiliser le type approprié au lieu de any
      return data.map((tournament: SearchResponse) => ({
        ...tournament,
        format: this.formatTableSize(tournament.format)
      }));
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  formatTableSize(format: string): string {
    const formatMap: { [key: string]: string } = {
      'FULL_RING': 'Full Ring',
      'SHORT_HANDED': 'Short-Handed',
      'HEADS_UP': 'Heads-Up'
    };
    return formatMap[format] || format;
  }
};