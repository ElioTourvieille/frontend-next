export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nest-2hsm.onrender.com';

export const GridService = {
  // Get all grids
  async getAllGrids() {
    try {
      const response = await fetch(`${BACKEND_URL}/grids`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération des grilles');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Get a grid by its ID
  async getGridById(id: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/grids/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Grille non trouvée');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Create a new grid
  async createGrid(gridData: any) {
    try {
      const response = await fetch(`${BACKEND_URL}/grids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gridData),
      });

      if (!response.ok) throw new Error('Erreur lors de la création de la grille');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Add a tournament to a grid
  async addTournamentToGrid(gridId: number, tournamentId: number) {
    try {
      const response = await fetch(`${BACKEND_URL}/grids/${gridId}/add-tournament`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tournamentId }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout du tournoi à la grille');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
};
