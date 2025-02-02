'use client';

import { useState, useEffect } from 'react';
import { Tournament, Grid } from '@/app/types/grid';
import { GridService } from '@/app/api/grids/service';
import { TournamentService } from '@/app/api/tournaments/service';
import { formatDate } from '@/lib/utils';

export default function SearchPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [grids, setGrids] = useState<Grid[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noData, setNoData] = useState(false);

  const [filters, setFilters] = useState({
    room: '',
    minBuyIn: '',
    maxBuyIn: '',
    format: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        setNoData(false);

        // Retrieve access token from server-side route API
        const authResponse = await fetch('/api/auth');
        if (!authResponse.ok) {
          throw new Error('Failed to fetch access token');
        }
        const { accessToken } = await authResponse.json();

        const [userGrids, allTournaments] = await Promise.all([
          GridService.getAllGrids(accessToken),
          TournamentService.getAllTournaments(),
        ]);

        if (!userGrids || !allTournaments) {
          setNoData(true);
        }

        setGrids(userGrids || []);
        setTournaments(allTournaments || []);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      setNoData(false);

      const validFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== ''),
      );

      const results = await TournamentService.searchTournaments({
        room: filters.room,
        minBuyIn: filters.minBuyIn ? Number(filters.minBuyIn) : undefined,
        maxBuyIn: filters.maxBuyIn ? Number(filters.maxBuyIn) : undefined,
        format: filters.format,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      if (!results || results.length === 0) {
        setNoData(true);
      }

      setTournaments(results || []);
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
      alert('Tournoi ajouté à la grille avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de l\'ajout du tournoi à la grille');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Rechercher des tournois</h1>

      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtres */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Room</label>
            <select
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.room}
              onChange={(e) => setFilters({ ...filters, room: e.target.value })}
            >
              <option value="">Toutes les rooms</option>
              <option value="Winamax">Winamax</option>
              <option value="PokerStars">PokerStars</option>
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
              value={filters.format}
              onChange={(e) => setFilters({ ...filters, format: e.target.value })}
            >
              <option value="">Tous les formats</option>
              <option value="MTT">MTT</option>
              <option value="SNG">SNG</option>
              <option value="SPIN">SPIN</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Date début</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Date fin</label>
            <input
              type="date"
              className="w-full bg-gray-700 text-gray-200 rounded px-3 py-2"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
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
                  <td className="px-4 py-3 text-gray-300">{tournament.format}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {formatDate(tournament.startTime)}
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
                        disabled={!selectedGrid || loading}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                                 text-white rounded-lg text-sm transition-colors"
                      >
                        {loading ? 'Ajout...' : 'Ajouter'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}