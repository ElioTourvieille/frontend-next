export interface Tournament {
  id: number;
  name: string;
  buyIn: number;
  startTime: Date;
  format: string;
  room: string;
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
  tournaments: Tournament[];
} 