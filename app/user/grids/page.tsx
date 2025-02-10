import { GridService } from '@/app/api/grids/service';
import { Grid } from '@/app/types/grid';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { GridCard } from '@/components/grids/GridCard';

export default async function GridsPage() {
  const { getAccessTokenRaw } = getKindeServerSession();
  const accessToken = await getAccessTokenRaw();

  if (!accessToken) {
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  }

  let grids: Grid[] = [];
  let error: string | null = null;

  try {
    grids = await GridService.getAllGrids(accessToken);
  } catch (e) {
    console.warn("Impossible de récupérer les grilles:", e);
    error = "Impossible de récupérer les grilles pour le moment.";
  }

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

      {error ? (
        <div className="p-8 text-center text-amber-400 bg-amber-400/10 rounded-lg border border-amber-400/20">
          {error}
          <br />
          Veuillez réessayer plus tard.
        </div>
      ) : grids.length === 0 ? (
        <div className="p-8 text-center text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700">
          Vous n&apos;avez pas encore créé de grille de tournois.
          <br />
          Commencez par en créer une !
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grids.map((grid: Grid) => (
            <GridCard 
              key={grid.id} 
              grid={grid}
            />
          ))}
        </div>
      )}
    </div>
  );
}