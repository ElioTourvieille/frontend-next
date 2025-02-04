import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import CreateGridForm from '@/components/grids/CreateGridForm';

export default async function CreateGridPage() {
  const { getAccessTokenRaw } = getKindeServerSession();
  const token = await getAccessTokenRaw();

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl text-gray-200 font-bold mb-8">Créer une nouvelle grille</h1>
      <CreateGridForm token={token} />
    </div>
  );
}
