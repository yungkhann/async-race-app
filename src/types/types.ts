export type Car = {
  id: number;
  name: string;
  color: string;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Database = {
  garage: Car[];
  winners: Winner[];
};

export type EngineStatus = 'started' | 'stopped' | 'drive';

export type EngineQueryParams = {
  id: string;
  status: EngineStatus;
  speed?: string;
};

export type EngineState = {
  velocity: Record<number, number>;
  blocked: Record<number, boolean>;
};

export type EngineStatusResponse = {
  velocity: number;
  distance: number;
};

export type DriveSuccessResponse = {
  success: true;
};
