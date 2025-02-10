export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export const TournamentService = {
  async searchTournaments(
    filters: {
      room?: string;
      minBuyIn?: number;
      maxBuyIn?: number;
      variant?: string;
      type?: string;
      tableSize?: string;
    },
    pagination: { page: number; pageSize: number }
  ) {
    try {
      const baseUrl = `${BACKEND_URL}/tournaments/search`;
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString(),
        room: filters.room || ''
      });

      if (filters.minBuyIn) params.append('buyInMin', filters.minBuyIn.toString());
      if (filters.maxBuyIn) params.append('buyInMax', filters.maxBuyIn.toString());
      if (filters.tableSize) params.append('tableSize', filters.tableSize);
      if (filters.variant) params.append('variant', filters.variant);
      if (filters.type) params.append('type', filters.type);

      const url = `${baseUrl}?${params.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', {
          status: response.status,
          text: errorText,
          url: url
        });
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      
      // Vérification des données reçues
      if (!responseData || !responseData.data || !responseData.meta) {
        throw new Error('Invalid response format from server');
      }

      return {
        tournaments: responseData.data,
        pagination: {
          totalResults: responseData.meta.totalResults,
          currentPage: responseData.meta.currentPage,
          totalPages: responseData.meta.totalPages,
          pageSize: responseData.meta.pageSize
        }
      };
    } catch (error) {
      console.error('Error fetching tournaments:', error);

      return {
        tournaments: [],
        pagination: {
          totalResults: 0,
          currentPage: pagination.page,
          totalPages: 0,
          pageSize: pagination.pageSize
        }
      };
    }
  }
};