export interface Tournament {
  id: number;
  name: string;
  buyIn: number;
  startTime: Date;
  format: string;  // Heads-up, short-handed, full ring
  variant: string; // PLO, NLH, autres
  type: string;    // KO, Mystery KO, Space KO, standard, freezout
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