import si from "systeminformation";
import { ClientToServerEvents, ServerToClientEvents } from "../types.ts";
import { Socket } from "socket.io";


export function registerNetworkHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
    let intervalId: NodeJS.Timeout | null = null;

    const getNetworkStats = async () => {
        const data = await si.networkStats();
        return data.map(iface => {
            return {
                uploadSpeed: ( iface.tx_sec / 1024 ).toFixed(2),
                downloadSpeed: ( iface.rx_sec / 1024 ).toFixed(2),
            };
        });
    }

    const startNetworkInfoInterval = () =>{
        if(intervalId){
            clearInterval(intervalId);
        }
        intervalId = setInterval(async () =>{
            if(socket.connected){
                try{
                    const data = await getNetworkStats();
                    if (data) {
                        socket.emit('networkStats', data);
                    }
                    console.log(`Emitted networkStats to ${socket.id}`);
                }catch(error) {
                    console.error(`Error emitting networkStats for ${socket.id}:`, error);
                }
            }
        }, 1000)
    }

    startNetworkInfoInterval();

    socket.on('disconnect', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    });

}


