'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GridService } from '@/app/api/grids/service';
import { toast } from 'sonner';

type Props = {
  gridId: string;
  initialName: string;
}

export default function EditGridForm({ gridId, initialName }: Props) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authResponse = await fetch('/api/auth');
      if (!authResponse.ok) {
        throw new Error('Erreur d\'authentification');
      }
      const { accessToken } = await authResponse.json();

      if (!accessToken) {
        throw new Error('Token manquant');
      }

      await GridService.updateGrid(gridId, name, accessToken);
      toast.success('Grille mise à jour avec succès');
      router.push('/user/grids');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la mise à jour de la grille');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200">
          Nouveau nom
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 
                   text-gray-200 shadow-sm p-2"
          placeholder="Nouveau nom de la grille"
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 disabled:bg-gray-600"
        >
          {loading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </div>
    </form>
  );
} 