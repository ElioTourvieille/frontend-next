import { CreateGridData, Grid } from "@/app/types/grid";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nest-2hsm.onrender.com';

export const GridService = {
  // Get all grids
  async getAllGrids(accessToken : string) {
    try {
      const response = await fetch(`${BACKEND_URL}/grid`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        throw new Error('Non autorisé. Veuillez vous reconnecter.');
      }

      // If the answer is not OK, raise an error
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      // Check that the answer is a table
      if (!Array.isArray(data)) {
        console.warn("La réponse de l'API n'est pas un tableau:", data);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des grilles:', error);
      // Return an empty array on error
      return [];
    }
  },

  // Get a grid by its ID
  async getGridById(id: string, token: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/grid/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
  async createGrid(gridData: CreateGridData, token: string): Promise<Grid> {
    try {
      const response = await fetch(`${BACKEND_URL}/grid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(gridData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(errorText || 'Erreur lors de la création de la grille');
      }

      return await response.json();
    } catch (error) {
      console.error('GridService createGrid error:', error);
      throw error;
    }
  },

  // Add a tournament to a grid
  async addTournamentToGrid(gridId: number, tournamentId: number, token: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/grid/${gridId}/add-tournament`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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