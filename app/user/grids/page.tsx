import { GridService } from '@/app/api/grids/service';
import { Grid } from '@/app/types/grid';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function GridsPage() {
  try {
    const grids = await GridService.getAllGrids();
    
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-100">Mes Grilles</h1>
          <Link 
            href="/user/grids/create"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Créer une grille
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grids.map((grid: Grid) => (
            <Link 
              href={`/user/grids/${grid.id}`}
              key={grid.id} 
              className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-100">{grid.name}</h2>
                <span className="text-sm text-gray-400">
                  {grid.tournaments.length} tournois
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  Créée le {formatDate(grid.createdAt)}
                </p>
                <p className="text-sm text-gray-400">
                  Buy-in total: {grid.tournaments.reduce((acc, t) => acc + t.buyIn, 0)}€
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Une erreur est survenue lors du chargement des grilles.
      </div>
    );
  }
}