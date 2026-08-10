import {getCpuInfo,getSystemInfo,getMemoryInfo} from '../services/specs.service.ts';
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
            return res.status(200).json(memoryInfo);
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
}