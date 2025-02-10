'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tournament, Grid } from '@/app/types/grid';
import { GridService } from '@/app/api/grids/service';
import { TournamentService } from '@/app/api/tournaments/service';
import { formatTime } from '@/lib/utils';

interface Filters {
  room: string;
  minBuyIn: string | number;
  maxBuyIn: string | number;
  tableSize: string;
  variant: string;
  type: string;
}

interface PaginationMeta {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface AddedTournaments {
  [gridId: number]: number[];
}

export default function SearchPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [grids, setGrids] = useState<Grid[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noData, setNoData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [addedTournaments, setAddedTournaments] = useState<AddedTournaments>({});

  const [filters, setFilters] = useState<Filters>({
    room: '',
    minBuyIn: '',
    maxBuyIn: '',
    tableSize: '',
    variant: '',
    type: '',
  });

  // Load the initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        setNoData(false);

        const authResponse = await fetch('/api/auth');
        if (!authResponse.ok) {
          throw new Error('Failed to fetch access token');
        }
        const { accessToken } = await authResponse.json();

        const [userGrids, tournamentsResponse] = await Promise.all([
          GridService.getAllGrids(accessToken),
          TournamentService.searchTournaments(
            {}, // filtres vides
            { page: currentPage, pageSize }
          )
        ]);

        if (!userGrids || !tournamentsResponse?.tournaments) {
          setNoData(true);
          return;
        }

        setGrids(userGrids);
        setTournaments(tournamentsResponse.tournaments);
        setPaginationMeta(tournamentsResponse.pagination);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [currentPage, pageSize]);

  // Load the tournaments of the grids
  useEffect(() => {
    const loadGridTournaments = async () => {
      try {
        const authResponse = await fetch('/api/auth');
        if (!authResponse.ok) return;
        const { accessToken } = await authResponse.json();

        const gridTournaments: AddedTournaments = {};
        
        for (const grid of grids) {
          const gridData = await GridService.getGridById(grid.id.toString(), accessToken);
          gridTournaments[grid.id] = gridData.tournaments.map((t: Tournament) => t.id);
        }
        
        setAddedTournaments(gridTournaments);
      } catch (error) {
        console.error('Erreur lors du chargement des tournois des grilles:', error);
      }
    };

    if (grids.length > 0) {
      loadGridTournaments();
    }
  }, [grids]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      setNoData(false);

      const validFilters = Object.fromEntries(
        Object.entries(filters).filter(([ value]) => value !== '')
      );

      if (validFilters.minBuyIn) validFilters.minBuyIn = Number(validFilters.minBuyIn);
      if (validFilters.maxBuyIn) validFilters.maxBuyIn = Number(validFilters.maxBuyIn);

      const response = await TournamentService.searchTournaments(validFilters, {
        page: currentPage,
        pageSize
      });

      if (!response?.tournaments || response.tournaments.length === 0) {
        setNoData(true);
        return;
      }

      setTournaments(response.tournaments);
      setPaginationMeta(response.pagination);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToGrid = async (tournamentId: number, gridId: number) => {
    try {
      setLoading(true);
      setError(null);

      const authResponse = await fetch('/api/auth');
      if (!authResponse.ok) {
        throw new Error('Failed to fetch access token');
      }
      const { accessToken } = await authResponse.json();

      await GridService.addTournamentToGrid(gridId, tournamentId, accessToken);
      
      setAddedTournaments(prev => ({
        ...prev,
        [gridId]: [...(prev[gridId] || []), tournamentId]
      }));

      toast.success('Tournoi ajouté à la grille avec succès !', {
        description: 'Vous pouvez le retrouver dans votre grille',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'ajout du tournoi', {
        description: 'Veuillez réessayer plus tard',
      });
    } finally {
      setLoading(false);
    }
  };

  const Pagination = () => (
    <div className="mt-4 flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="bg-gray-700 text-gray-200 rounded px-3 py-2"
        >
          <option value="10">10 par page</option>
          <option value="25">25 par page</option>
          <option value="50">50 par page</option>
          <option value="100">100 par page</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="px-3 py-1 text-gray-200">
            Page {paginationMeta?.currentPage || 1} sur {paginationMeta?.totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, paginationMeta?.totalPages || 1))}
            disabled={currentPage === (paginationMeta?.totalPages || 1) || loading}
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
      {paginationMeta && (
        <div className="text-gray-400 text-sm">
          Total: {paginationMeta.totalResults} tournois
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Rechercher des tournois</h1>

      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filters section */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Room</label>
            <select
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.room}
              onChange={(e) => setFilters({ ...filters, room: e.target.value })}
            >
              <option value="">Toutes les rooms</option>
              <option value="Winamax">Winamax</option>
              <option value="GGPoker">GGPoker</option>
              <option value="PMU">PMU</option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Buy-in min</label>
            <input
              type="number"
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.minBuyIn}
              onChange={(e) => setFilters({ ...filters, minBuyIn: e.target.value })}
              placeholder="Min €"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Buy-in max</label>
            <input
              type="number"
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.maxBuyIn}
              onChange={(e) => setFilters({ ...filters, maxBuyIn: e.target.value })}
              placeholder="Max €"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Format</label>
            <select
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.tableSize}
              onChange={(e) => setFilters({ ...filters, tableSize: e.target.value })}
            >
              <option value="">Tous les formats</option>
              <option value="HEADS_UP">Heads-up</option>
              <option value="SHORT_HANDED">Short-handed</option>
              <option value="FULL_RING">Full ring</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Variante</label>
            <select
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.variant}
              onChange={(e) => setFilters({ ...filters, variant: e.target.value })}
            >
              <option value="">Toutes les variantes</option>
              <option value="NO_LIMIT_HOLDEM">No Limit Hold&apos;em</option>
              <option value="POT_LIMIT_OMAHA">Pot Limit Omaha</option>
              <option value="OTHER">Autres</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Type</label>
            <select
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Tous les types</option>
              <option value="STANDARD">Standard</option>
              <option value="KNOCKOUT">KO</option>
              <option value="MYSTERY_KNOCKOUT">Mystery KO</option>
              <option value="SPACE_KNOCKOUT">Space KO</option>
              <option value="FREEZOUT">Freezout</option>
              <option value="SATELLITE">Satellite</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Data display */}
      <div className="bg-gray-800/30 rounded-lg overflow-hidden">
      {loading ? (
        <div className="p-8 text-center text-gray-400">Chargement en cours...</div>
      ) : noData || tournaments.length === 0 ? (
        <div className="p-8 text-center text-gray-400">Aucun tournoi disponible pour le moment.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-gray-200">Tournoi</th>
                <th className="px-4 py-3 text-left text-gray-200">Room</th>
                <th className="px-4 py-3 text-left text-gray-200">Buy-in</th>
                <th className="px-4 py-3 text-left text-gray-200">Format</th>
                <th className="px-4 py-3 text-left text-gray-200">Variante</th>
                <th className="px-4 py-3 text-left text-gray-200">Type</th>
                <th className="px-4 py-3 text-left text-gray-200">Début</th>
                <th className="px-4 py-3 text-left text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {tournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-gray-200">{tournament.name}</td>
                  <td className="px-4 py-3 text-gray-300">{tournament.room}</td>
                  <td className="px-4 py-3 text-gray-300">{tournament.buyIn}€</td>
                  <td className="px-4 py-3 text-gray-300">{tournament.tableSize}</td>
                  <td className="px-4 py-3 text-gray-300">{tournament.variant}</td>
                  <td className="px-4 py-3 text-gray-300">{tournament.type}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {formatTime(tournament.startTime)}

                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        className="bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                        onChange={(e) => setSelectedGrid(Number(e.target.value))}
                        value={selectedGrid || ''}
                      >
                        <option value="">Sélectionner une grille</option>
                        {grids.map((grid) => (
                          <option key={grid.id} value={grid.id}>
                            {grid.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => selectedGrid && handleAddToGrid(tournament.id, selectedGrid)}
                        disabled={
                          !selectedGrid || 
                          loading || 
                          Boolean(selectedGrid && addedTournaments[selectedGrid]?.includes(tournament.id))
                        }
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                                 text-white rounded-lg text-sm transition-colors"
                      >
                        {loading ? 'Ajout...' : 
                          Boolean(selectedGrid && addedTournaments[selectedGrid]?.includes(tournament.id))
                            ? 'Déjà ajouté' 
                            : 'Ajouter'
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination />
    </div>
  );
}