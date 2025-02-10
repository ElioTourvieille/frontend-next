'use client';

import { Tournament } from '@/app/types/grid';
import { formatTime } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GridService } from '@/app/api/grids/service';
import { ConfirmDialog } from "@/components/ui/AlertDialog";

interface TournamentTableProps {
  tournaments: Tournament[];
  gridId: string;
}

export function TournamentTable({ tournaments, gridId }: TournamentTableProps) {
  const router = useRouter();
  const [deletingTournamentId, setDeletingTournamentId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleRemoveTournament = async () => {
    if (!deletingTournamentId) return;

    try {
      const authResponse = await fetch('/api/auth');
      if (!authResponse.ok) throw new Error('Failed to fetch access token');
      const { accessToken } = await authResponse.json();

      await GridService.removeTournamentFromGrid(gridId, deletingTournamentId, accessToken);
      toast.success('Tournoi retiré de la grille');
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression du tournoi');
    } finally {
      setShowDeleteDialog(false);
      setDeletingTournamentId(null);
    }
  };

  return (
    <div className="bg-gray-800/30 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-800">
          <tr className="border-b border-gray-700">
            <th className="px-4 py-3 text-left text-gray-200">Nom</th>
            <th className="px-4 py-3 text-left text-gray-200">Buy-in</th>
            <th className="px-4 py-3 text-left text-gray-200">Room</th>
            <th className="px-4 py-3 text-left text-gray-200">Type</th>
            <th className="px-4 py-3 text-left text-gray-200">Début</th>
            <th className="px-4 py-3 text-left text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {tournaments.map((tournament) => (
            <tr key={tournament.id} className="hover:bg-gray-800/50">
              <td className="px-4 py-3 text-gray-200">{tournament.name}</td>
              <td className="px-4 py-3 text-gray-300">{tournament.buyIn}€</td>
              <td className="px-4 py-3 text-gray-300">{tournament.room}</td>
              <td className="px-4 py-3 text-gray-300">{tournament.type}</td>
              <td className="px-4 py-3 text-gray-300">
                {formatTime(tournament.startTime)}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => {
                    setDeletingTournamentId(tournament.id);
                    setShowDeleteDialog(true);
                  }}
                  className="p-1 text-gray-400 hover:text-red-400 transition-colors rounded-full 
                           hover:bg-red-500/10"
                  title="Retirer de la grille"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>

      {/* Confirm dialog to delete a tournament */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setDeletingTournamentId(null);
        }}
        onConfirm={handleRemoveTournament}
        title="Retirer le tournoi"
        description="Êtes-vous sûr de vouloir retirer ce tournoi de la grille ?"
        confirmText="Retirer"
        cancelText="Annuler"
      />
    </div>
  );
} 