import si from "systeminformation";

export async function getCpuInfo() {
    return await si.cpu();
}

export async function getMemoryInfo() {
    return await si.memLayout();
}

export async function getSystemInfo() {
    return await si.osInfo();
}
export async function getDiskInfo() {
    return await si.fsSize();
}