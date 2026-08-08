import { WebSocket } from 'ws';
import si from 'systeminformation'


console.log('WebSocket Server đang chạy tại ws://localhost:8080');

export function registerOsInfoHandler(ws: WebSocket) {
  ws.send(
    JSON.stringify({
      type: 'connected',
      message: 'WebSocket connected',
    }),
  );
   // Lấy data từ OS
  const getSystemStats = async () => {
    try {
      // Đọc song song các thông số để tối ưu hiệu năng
      const [cpuLoad, cpuFreq, mem] = await Promise.all([
        si.currentLoad(), // CPU % usage (tổng và từng core)
        si.cpuCurrentSpeed(), // Tần số CPU (GHz)
        si.mem() // Bộ nhớ RAM (Bytes)
      ]);

      const data = {
        timestamp: new Date().toISOString(),
        cpu: {
          usagePercent: cpuLoad.currentLoad.toFixed(2), // % CPU đang dùng
          avgFrequencyGHz: cpuFreq.avg, // Xung nhịp trung bình
          coresUsage: cpuLoad.cpus.map(c => c.load.toFixed(2)) // % từng core
        },
        ram: {
          totalGB: (mem.total / 1024 ** 3).toFixed(2),
          usedGB: (mem.active / 1024 ** 3).toFixed(2),
          usagePercent: ((mem.active / mem.total) * 100).toFixed(2)
        }
      };
      // Gửi data sang client qua WebSocket
      return data;
    } catch (error) {
      console.error('Lỗi khi lấy thông số:', error);
    }
  };

  const intervalId = setInterval(async () => {
    if (ws.readyState === WebSocket.OPEN) {
    const data = await getSystemStats();
      ws.send(
        JSON.stringify({
          data: data,
        }),
      );
    }
  }, 1000);

  ws.on('close', () => {
    clearInterval(intervalId);
  });
}
