import 'dotenv/config';
import { Client, ConnectConfig } from 'ssh2';

const host = process.env.HOST || '';
const port = parseInt(process.env.PORT || '0', 10);
const username = process.env.USERNAME_D || '';
const password = process.env.PASSWORD || '';
const ip = process.env.IP || '';

const sshConfig: ConnectConfig = {
    host: '191.102.96.11', // Cambia esto por la dirección IP de tu router
    port: 22, // Puerto SSH por defecto
    username: 'admintest', // Cambia esto por tu nombre de usuario
    password: 'Passwordz1000*', // Cambia esto por tu contraseña
  };

  const targetIp = '10.20.50.21';

// Comando para habilitar la IP (ajusta esto según tu configuración)
const enableIpCommand = `/ip arp enable [find address="${targetIp}"]`;

// Comando para deshabilitar la IP (ajusta esto según tu configuración)
const disableIpCommand = `/ip arp disable [find address="${targetIp}"]`;

function executeSshCommand(command: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const conn = new Client();

    conn.on('ready', () => {
      conn.exec(command, (err, stream) => {
        if (err) {
          reject(err);
        } else {
          stream
            .on('close', (code: any, signal: any) => {
              conn.end();
              resolve();
            })
            .on('data', (data: any) => {
              console.log(`Comando ejecutado: ${data}`);
            });
        }
      });
    });

    conn.on('error', (err) => {
      reject(err);
    });

    conn.connect(sshConfig);
  });
}

async function main() {
  try {
    console.log('Habilitando la IP...');
    await executeSshCommand(enableIpCommand);
    console.log('IP habilitada con éxito.');

    // Puedes agregar un retardo aquí si es necesario

    console.log('Deshabilitando la IP...');
    await executeSshCommand(disableIpCommand);
    console.log('IP deshabilitada con éxito.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();