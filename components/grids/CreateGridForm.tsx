'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GridService } from '@/app/api/grids/service';

export default function CreateGridForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const authResponse = await fetch('/api/auth');
      if (!authResponse.ok) {
        throw new Error('Failed to fetch access token');
      }
      const { accessToken } = await authResponse.json();

      await GridService.createGrid(name, accessToken);
      router.push('/user/grids');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      setError('Erreur lors de la création de la grille');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200">
          Nom de la grille
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 
                     text-gray-200 shadow-sm p-2"
          placeholder="Ma nouvelle grille"
          required
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md 
                 hover:bg-blue-700 disabled:bg-gray-600"
      >
        {loading ? 'Création...' : 'Créer la grille'}
      </button>
    </form>
  );
} 