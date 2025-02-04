'use client';

import { useState } from 'react';
import { GridService } from '@/app/api/grids/service';
import { useRouter } from 'next/navigation';

interface CreateGridFormProps {
  token: string;
}

export default function CreateGridForm({ token }: CreateGridFormProps) {
  const router = useRouter();
  const [gridName, setGridName] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsCreating(true);

    try {
      const gridData = {
        name: gridName.trim()
      };

      if (!gridData.name) {
        setError('Le nom de la grille est requis');
        return;
      }

      await GridService.createGrid(gridData, token);
      router.push('/user/tournaments');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la création de la grille');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="gridName" className="block text-sm text-gray-400 font-medium mb-2">
          Nom de la grille
        </label>
        <input
          id="gridName"
          type="text"
          value={gridName}
          onChange={(e) => setGridName(e.target.value)}
          placeholder="Ex: Session du Jeudi"
          className="w-full p-3 rounded-lg text-gray-200 bg-gray-800 border border-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder:text-gray-500"
          required
          minLength={1}
          maxLength={100}
        />
        <p className="mt-2 text-sm text-gray-400">
          Vous pourrez ajouter des tournois à votre grille depuis la page de recherche.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isCreating || !gridName.trim()}
          className="flex-1 px-4 py-3 text-gray-200 bg-blue-600 rounded-lg font-medium
                   hover:bg-blue-700 transition-colors disabled:opacity-50
                   disabled:cursor-not-allowed"
        >
          {isCreating ? 'Création...' : 'Créer la grille'}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-3 bg-gray-800 text-gray-200 rounded-lg font-medium
                   hover:bg-gray-700 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
} 