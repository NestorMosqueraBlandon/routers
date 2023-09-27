import 'dotenv/config';
import { Client } from 'ssh2';

const host = process.env.HOST || '';
const port = parseInt(process.env.PORT || '0', 10);
const username = process.env.USERNAME_D || '';
const password = process.env.PASSWORD || '';

export const handler = async (action: string, ip: string) => {
    return new Promise<void>((resolve, reject) => {
        //const connection = new Client();
        const enable = action=='enable'? true: false;
        const ssh = new Client();

        ssh.on('ready', () => {
        console.log('Conexión SSH establecida.');

        // Comando para habilitar o deshabilitar la dirección IP
        const command = enable ? `/ip arp enable [find address=10.20.50.25]` : `/ip arp disable [find address=10.20.50.25]`;

        ssh.exec(command, (err, stream) => {
            if (err) throw err;
            stream
            .on('close', (code: number, signal: string) => {
                console.log(`Comando ejecutado con código de salida: ${code}`);
                ssh.end();
            })
            .on('data', (data: Buffer) => {
                console.log(data.toString());
            });
        });
        });

        ssh.on('error', (err) => {
        console.error(`Error de conexión SSH: ${err.message}`);
        });

        ssh.connect({
        host: host,
        port: port,
        username: username,
        password: password,
        });
    })

}
