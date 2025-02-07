'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

type Settings = {
  defaultView: string;
  autoRefresh: boolean;
  refreshInterval: number;
  showBuyIn: boolean;
  showPrizePool: boolean;
  showStartTime: boolean;
}

type BooleanKeys = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never
}[keyof Settings];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    defaultView: 'list',
    autoRefresh: true,
    refreshInterval: 5,
    showBuyIn: true,
    showPrizePool: true,
    showStartTime: true,
  })

  return (
    <div className="mt-10 p-8 max-w-2xl mx-auto space-y-8">
      <h2 className="mb-20 text-4xl text-gray-300 font-bold tracking-tight sm:text-5xl">
          Paramètres
        </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-300 mb-2">Vue par défaut</h3>
          <select 
            value={settings.defaultView}
            onChange={(e) => setSettings({...settings, defaultView: e.target.value})}
            className="w-full text-gray-300 p-2 rounded border bg-transparent"
          >
            <option  value="list">Liste</option>
            <option value="grid">Grille</option>
            <option value="calendar">Calendrier</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-300">Actualisation automatique</h3>
            <p className="text-sm text-blue-400">Mettre à jour automatiquement les données</p>
          </div>
          <Switch 
            checked={settings.autoRefresh}
            className="data-[state=checked]:bg-blue-400"
            onCheckedChange={(checked) => setSettings({...settings, autoRefresh: checked})}
          />
        </div>

        {settings.autoRefresh && (
          <div>
            <h3 className="font-medium text-gray-300 mb-2">Intervalle d'actualisation (minutes)</h3>
            <input 
              type="number"
              min="1"
              max="60"
              value={settings.refreshInterval}
              onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})}
              className="w-full p-2 text-gray-300 rounded border bg-transparent"
            />
          </div>
        )}

        <div className="space-y-4"> 
          <h3 className="font-medium text-gray-300">Colonnes affichées</h3>
          <div className="space-y-2">
            {(Object.entries({
              showBuyIn: 'Buy-in',
              showPrizePool: 'Prize Pool',
              showStartTime: 'Heure de début'
            }) as [BooleanKeys, string][]).map(([key, label]) => (
              <div key={key} className="flex items-center text-gray-300 justify-between">
                <span>{label}</span>
                <Switch 
                  checked={settings[key]}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={(checked) => setSettings({...settings, [key]: checked})}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="w-full">
        Sauvegarder les préférences
      </Button>
    </div>
  )
} 