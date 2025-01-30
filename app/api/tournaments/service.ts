export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nest-2hsm.onrender.com';

export const TournamentService = {
  // Récupérer tous les tournois
  async getAllTournaments() {
    try {
      const response = await fetch(`${BACKEND_URL}/tournaments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération des tournois');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Rechercher des tournois avec des filtres
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
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`${BACKEND_URL}/tournaments/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erreur lors de la recherche des tournois');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
}; 