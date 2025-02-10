export interface Tournament {
  id: number;
  name: string;
  buyIn: number;
  startTime: string;
  format: 'Heads-up' | 'Short-handed' | 'Full ring';
  variant: string;
  type: string;
  room: string;
  tableSize: string;
}

export interface Grid {
  id: number;
  name: string;
  userId: number;
  tournaments: Tournament[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGridData {
  name: string;
} 