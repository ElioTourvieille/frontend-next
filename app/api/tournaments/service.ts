export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nest-2hsm.onrender.com';

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
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      return { data: [], meta: {} };
    }
  },
};