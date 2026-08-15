import { mem } from 'systeminformation';
import {getCpuInfo,getSystemInfo,getMemoryInfo, getDiskInfo} from '../services/specs.service.ts';
import {type Request, type Response } from 'express';

export class SpecsController {
    async getCpuInfo(req: Request, res: Response) {
        try {
            const cpuInfo = await getCpuInfo();
            return res.status(200).json(cpuInfo);
        } catch (error) {
            console.error('Error fetching CPU info:', error);
            return res.status(500).json({ message: 'Error fetching CPU info' });
        }
    }

    async getMemoryInfo(req: Request, res: Response) {
        try {
            const memoryInfo = await getMemoryInfo();
            const cleanedMemInfo = memoryInfo.map(item => {
                return {
                    size : item.size / 1048576,
                    type : item.type,
                    clockSpeed : item.clockSpeed
                }
            })
            return res.status(200).json(cleanedMemInfo);
        } catch (error) {
            console.error('Error fetching memory info:', error);
            return res.status(500).json({ message: 'Error fetching memory info' });
        }
    }

    async getSystemInfo(req: Request, res: Response) {
        try {
            const systemInfo = await getSystemInfo();
            return res.status(200).json(systemInfo);
        } catch (error) {
            console.error('Error fetching system info:', error);
            return res.status(500).json({ message: 'Error fetching system info' });
        }
    }

    async getDiskInfo(req: Request, res: Response) {
        try {
            const diskInfo = await getDiskInfo();
            const cleanedDiskInfo = diskInfo.map(item => {
                return {
                    fs : item.fs,
                    type : item.type,
                    size : (item.size / 1073741824).toFixed(2),
                    used : (item.used / 1073741824).toFixed(2),
                    use : item.use
                }
            })
            return res.status(200).json(cleanedDiskInfo);
        } catch (error) {
            console.error('Error fetching disk info:', error);
            return res.status(500).json({ message: 'Error fetching disk info' });
        }   
    }
}