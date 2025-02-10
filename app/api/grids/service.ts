export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

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
  async createGrid(name: string, accessToken: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/grid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData
        });
        throw new Error(errorData);
      }

      return response.json();
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
  },

  async updateGrid(gridId: string, name: string, accessToken: string) {
    try {
      if (!gridId || !name || !accessToken) {
        throw new Error('Missing required parameters');
      }

      const payload = {
        name: name.trim(),
        tournamentIds: []
      };

      console.log('Update grid payload:', {
        url: `${BACKEND_URL}/grid/${gridId}`,
        payload,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken.substring(0, 10)}...`,
        }
      });

      const response = await fetch(`${BACKEND_URL}/grid/${gridId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Update grid error:', {
          status: response.status,
          data,
          gridId,
        });
        throw new Error(`Erreur lors de la mise à jour de la grille: ${data.message || 'Unknown error'}`);
      }

      return data;
    } catch (error) {
      console.error('GridService updateGrid error:', error);
      throw error;
    }
  },

  async deleteGrid(id: string, accessToken: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/grid/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la grille');
      }

      return true;
    } catch (error) {
      console.error('GridService deleteGrid error:', error);
      throw error;
    }
  },

  async removeTournamentFromGrid(gridId: string, tournamentId: number, accessToken: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/grid/${gridId}/remove-tournament/${tournamentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur lors du retrait du tournoi: ${errorData.message || 'Unknown error'}`);
      }

      return response.json();
    } catch (error) {
      console.error('GridService removeTournamentFromGrid error:', error);
      throw error;
    }
  },
};