import { GridService } from '@/app/api/grids/service';
import { Tournament } from '@/app/types/grid';
import { formatDate } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TournamentTable } from '@/components/grids/TournamentTable';

export default async function GridDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
    const { getAccessTokenRaw } = getKindeServerSession();
    const accessToken = await getAccessTokenRaw();

    if (!accessToken) {
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
    }
    const grid = await GridService.getGridById(id, accessToken);
    
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">{grid.name}</h1>
          <p className="text-gray-400 mt-2">
            Créée le {formatDate(grid.createdAt)}
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-400">Nombre de tournois</h3>
              <p className="text-2xl font-bold text-gray-100">{grid.tournaments.length}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-400">Buy-in total</h3>
              <p className="text-2xl font-bold text-gray-100">
                {grid.tournaments.reduce((acc: number, t: Tournament) => acc + t.buyIn, 0)}€
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-400">Dernière mise à jour</h3>
              <p className="text-2xl font-bold text-gray-100">{formatDate(grid.updatedAt)}</p>
            </div>
          </div>

          
        </div>

        <div className="mt-8">
          <TournamentTable tournaments={grid.tournaments} gridId={id} />
        </div>
      </div>
    );
}
