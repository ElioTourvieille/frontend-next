import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { GridService } from '@/app/api/grids/service';
import EditGridForm from '@/components/grids/EditGridForm';

export default async function EditGridPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { getAccessTokenRaw } = getKindeServerSession();
  const accessToken = await getAccessTokenRaw();


  if (!accessToken) {
    throw new Error('Non autorisé');
  }

  const grid = await GridService.getGridById(id, accessToken);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Modifier la grille</h1>
      <EditGridForm gridId={id} initialName={grid.name} />
    </div>

  );
} 