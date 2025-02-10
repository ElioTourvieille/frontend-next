import React from 'react';
import AnimatedTitle from '@/components/AnimatedTitle';
import { Trophy, Users, TrendingUp, Calendar } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean | null;
}

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface NewsCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
}

export default function MainPage() {
  return (
    <div className="flex-1 space-y-12 p-8 pt-6 max-w-7xl mx-auto 
      bg-white/10 backdrop-blur-xl backdrop-filter 
      border border-white/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 to-purple-900 p-8">
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Bienvenue sur votre Dashboard
          </h1>
          <p className="text-lg text-blue-100">
            Trouvez et analysez les meilleurs tournois de poker en ligne
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tournois En Ligne"
          value="1,248"
          subtext="+24 aujourd'hui"
          icon={<Trophy className="h-6 w-6" />}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Prize Pools"
          value="€850K"
          subtext="Garantis aujourd'hui"
          icon={<Users className="h-6 w-6" />}
          trend="+5%"
          trendUp={true}
        />
        <StatsCard
          title="Buy-in Moyen"
          value="€22"
          subtext="Cette semaine"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="-3%"
          trendUp={false}
        />
        <StatsCard
          title="Rooms Actives"
          value="12"
          subtext="Connectées"
          icon={<Calendar className="h-6 w-6" />}
          trend="Stable"
          trendUp={null}
        />
      </section>

      {/* Quick Actions */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <AnimatedTitle

            title="Actions Rapides"
            containerClass="text-left !text-2xl"
          />
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Voir tout →
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Créer une Grille"
            description="Optimisez votre session avec notre outil d'analyse"
            href="/user/grids/create"
            icon={<span className="text-2xl">🎯</span>}
          />
          <QuickActionCard

            title="Explorer les Tournois"
            description="Filtrez parmi +1000 tournois quotidiens"
            href="/user/tournaments"
            icon={<span className="text-2xl">🔍</span>}
          />
          <QuickActionCard
            title="Vos Statistiques"
            description="Suivez vos performances en temps réel"
            href="/user/stats"
            icon={<span className="text-2xl">📊</span>}
          />
        </div>
      </section>

      {/* News Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">

          <AnimatedTitle
            title="Actualités Poker"
            containerClass="text-left !text-2xl"
          />
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Toutes les news →
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <NewsCard
            title="Nouveau Record MTT"
            description="Le Sunday Million atteint 2M€ de prize pool"
            date="2024-03-15"
            category="Online"
          />
          <NewsCard
            title="Mise à Jour Platform"
            description="Nouveau système d'analyse des variance"
            date="2024-03-10"
            category="Platform"
          />
          <NewsCard
            title="Promotion Winamax"
            description="Double reload bonus cette semaine"
            date="2024-03-05"
            category="Promo"
          />
        </div>
      </section>
    </div>
  );
}

// Modernised components
const StatsCard = ({ title, value, subtext, icon, trend, trendUp }: StatsCardProps) => (
  <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:bg-gray-500/50 transition-colors">
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-lg bg-gray-800 text-blue-400">{icon}</div>
      <div className={`px-2 py-1 rounded-full text-xs ${
        trendUp === null ? 'bg-gray-800 text-gray-400' :
        trendUp ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
      }`}>
        {trend}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-3xl font-bold text-gray-100">{value}</h3>
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{subtext}</p>
    </div>
  </div>
);

const QuickActionCard = ({ title, description, href, icon }: QuickActionCardProps) => (
  <a
    href={href}
    className="group block p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800/50 transition-all hover:scale-[1.02] duration-200"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <p className="mt-1 text-sm text-gray-400">{description}</p>
      </div>
    </div>
  </a>
);

const NewsCard = ({ title, description, date, category }: NewsCardProps) => (
  <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:bg-gray-800/50 transition-colors">
    <div className="flex items-center gap-2 mb-4">
      <span className="px-2 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs">
        {category}
      </span>
      <time className="text-xs text-gray-500">{date}</time>
    </div>
    <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
    <p className="mt-2 text-sm text-gray-400">{description}</p>
  </div>
);

