import type { Socket } from 'socket.io';
import si from 'systeminformation';
import type { ClientToServerEvents, ServerToClientEvents } from '../types.ts';

export function registerOsInfoHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  let intervalId: NodeJS.Timeout | null = null;

  const getSystemStats = async () => {
    try {
      const [cpuLoad, cpuFreq, mem] = await Promise.all([
        si.currentLoad(),
        si.cpuCurrentSpeed(),
        si.mem(),
      ]);

      return {
        timestamp: new Date().toISOString(),
        cpuUptime: si.time().uptime,
        cpu: {
          usagePercent: cpuLoad.currentLoad.toFixed(2),
          avgFrequencyGHz: cpuFreq.avg,
          coresUsage: cpuLoad.cpus.map((c) => c.load.toFixed(2)),
        },
        ram: {
          totalGB: (mem.total / 1024 ** 3).toFixed(2),
          usedGB: (mem.active / 1024 ** 3).toFixed(2),
          usagePercent: ((mem.active / mem.total) * 100).toFixed(2),
        },
      };
    } catch (error) {
      console.error('Error fetching system stats:', error);
      return undefined;
    }
  };

  const startSystemStatsInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(async () => {
      if (socket.connected) {
        try {
          const data = await getSystemStats();
          if (data) {
            socket.emit('systemStats', data);
          }
          // console.log(`Emitted systemStats to ${socket.id}`);
        } catch (error) {
          console.error(`Error emitting systemStats for ${socket.id}:`, error);
        }
      }
    }, 1000);
  };

  startSystemStatsInterval();

  socket.on('disconnect', () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });
}
