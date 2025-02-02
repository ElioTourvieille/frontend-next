'use client';

import { useEffect, useState } from 'react';
import { GridService } from '@/app/api/grids/service';
import { useRouter } from 'next/navigation';
import { Tournament } from '@/app/types/grid';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default function CreateGridPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    tournaments: [] as Tournament[]
  });
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Recover component assembly access token
  useEffect(() => {
    const fetchAccessToken = async () => {
      const { getAccessTokenRaw } = getKindeServerSession();
      const token = await getAccessTokenRaw();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.tournaments.length === 0) {
      setError('Veuillez ajouter au moins un tournoi à votre grille');
      return;
    }

    if (!accessToken) {
      setError('Vous devez être connecté pour créer une grille');
      return;
    }

    try {
      await GridService.createGrid(formData, accessToken);
      router.push('/user/grids');
    } catch {
      setError('Une erreur est survenue lors de la création de la grille');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Créer une nouvelle grille</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-200">
            Nom de la grille
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
            required
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Tournois</h2>
          {formData.tournaments.map((tournament, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-200">{tournament.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newTournaments = formData.tournaments.filter((_, i) => i !== index);
                    setFormData({ ...formData, tournaments: newTournaments });
                  }}
                  className="text-red-500 hover:text-red-400"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => {/* Ajouter logique de recherche de tournois */}}
            className="w-full p-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            + Ajouter un tournoi
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
        >
          Créer la grille
        </button>
      </form>
    </div>
  );
}
