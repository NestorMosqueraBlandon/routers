import 'dotenv/config';
import { Client } from 'ssh2';

const host = process.env.HOST || '';
const port = parseInt(process.env.PORT || '0', 10);
const username = process.env.USERNAME_D || '';
const password = process.env.PASSWORD || '';
const ip = process.env.IP || '';

const handler = async (action: string, ip: string) => {
    return new Promise<void>((resolve, reject) => {
        const connection = new Client();

        connection.on('ready', () => {
            connection.shell((error, stream) => {
                if (error) {
                    throw new Error(error.message);
                }

                stream.on('data', (data: Buffer) => {
                    const output = data.toString('utf-8');
                    console.log(`OUTPUT: ${output}`)
                });

                stream.on('close', (code: number, signal: string) => {
                    if (code === 0) {
                        console.log(`Acción ${action} exitosa para la dirección IP ${ip}`);
                        resolve();
                    } else {
                        console.error(`Error al ejecutar la acción ${action} para la dirección IP ${ip}`);
                        reject(new Error(`Error al ejecutar la acción ${action} para la dirección IP ${ip}`));
                    }
                    connection.end();
                });

                stream.write(`/ip arp ${action} find address=${ip}\n`);

                stream.end();
            })
        }).connect({
            host,
            port,
            username,
            password,
            readyTimeout: 60000
        })
    })

}


handler('enable',  ip);