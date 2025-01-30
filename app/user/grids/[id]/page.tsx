import { GridService } from '@/app/api/grids/service';
import { Grid, Tournament } from '@/app/types/grid';
import { formatDate } from '@/lib/utils';

export default async function GridDetailPage({ params }: { params: { id: string } }) {
  try {
    const grid = await GridService.getGridById(params.id);
    
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

          <div className="bg-gray-800/30 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-200">Tournoi</th>
                  <th className="px-4 py-3 text-left text-gray-200">Room</th>
                  <th className="px-4 py-3 text-left text-gray-200">Buy-in</th>
                  <th className="px-4 py-3 text-left text-gray-200">Format</th>
                  <th className="px-4 py-3 text-left text-gray-200">Début</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {grid.tournaments.map((tournament: Tournament) => (
                  <tr key={tournament.id} className="hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-gray-200">{tournament.name}</td>
                    <td className="px-4 py-3 text-gray-300">{tournament.room}</td>
                    <td className="px-4 py-3 text-gray-300">{tournament.buyIn}€</td>
                    <td className="px-4 py-3 text-gray-300">{tournament.format}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {formatDate(tournament.startTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Une erreur est survenue lors du chargement de la grille.
      </div>
    );
  }
}
