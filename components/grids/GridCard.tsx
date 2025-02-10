'use client';

import { Grid, Tournament } from '@/app/types/grid';
import { formatDate, formatTime } from '@/lib/utils';
import { GridService } from '@/app/api/grids/service';
import { toast } from 'sonner';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ui/AlertDialog";

interface GridCardProps {
  grid: Grid;
}

// Helper function to obtain the time slot
const getTimeRange = (tournaments: Tournament[]) => {
  if (!tournaments.length) return 'Aucun tournoi';
  
  const sortedTournaments = [...tournaments].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
  
  const firstTime = formatTime(sortedTournaments[0].startTime);
  const lastTime = formatTime(sortedTournaments[sortedTournaments.length - 1].startTime);
  
  return `${firstTime} - ${lastTime}`;
};

export function GridCard({ grid }: GridCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const authResponse = await fetch('/api/auth');
      if (!authResponse.ok) throw new Error('Failed to fetch access token');
      const { accessToken } = await authResponse.json();

      await GridService.deleteGrid(grid.id.toString(), accessToken);
      toast.success('Grille supprimée avec succès');
      router.refresh();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression de la grille');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="relative p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700/50 transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push(`/user/grids/${grid.id}/edit`)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)} 
              disabled={isDeleting}
              className="text-red-500 focus:text-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href={`/user/grids/${grid.id}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-100">{grid.name}</h2>
              <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded-full">
                {grid.tournaments.length} tournois
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              Créée le {formatDate(grid.createdAt)}
            </p>
            <p className="text-sm text-gray-400">
              Plage horaire: {getTimeRange(grid.tournaments)}
            </p>
          </div>
        </Link>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Supprimer la grille"
        description="Êtes-vous sûr de vouloir supprimer cette grille ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </>
  );
} 