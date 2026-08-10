export type ServerToClientEvents = {
  connected: (data: {
    type: 'connected';
    message: string;
  }) => void;
  systemStats: (data: {
    timestamp: string;
    cpu: {
      usagePercent: string;
      avgFrequencyGHz: number;
      coresUsage: string[];
    };
    ram: {
      totalGB: string;
      usedGB: string;
      usagePercent: string;
    };
  }) => void;
  tick: (data: {
    type: 'tick';
    timestamp: string;
    data: {
      message: string;
      random: number;
    };
  }) => void;
};

export type ClientToServerEvents = {
  ping: () => void;
};