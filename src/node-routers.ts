import 'dotenv/config';
import { RouterOSAPI as  MikroRouter} from 'node-routeros';

const main = async () => {
    const conn = new MikroRouter({
      host: '191.102.96.11', 
      user: 'admintest',    
      password: 'Passwordz1000*', 
      port: 8729,           
    });
  
    const clientIP = '10.20.50.21'; 
  
    try {
      await conn.connect();
  
      const disableCommand = '/ip/arp/disable';
      const disableParams = [
        `=address=${clientIP}`,
      ];
  
      const enableCommand = '/ip/arp/enable';
      const enableParams = [
        `=address=${clientIP}`,
      ];
  
      const disableResponse = await conn.write(disableCommand, disableParams);
      console.log(`${clientIP} deshabilitada!`, disableResponse);

      const enableResponse = await conn.write(enableCommand, enableParams);
      console.log(`${clientIP} habilitada!`, enableResponse);
  
      conn.close();
    } catch (error) {
      console.error(error);
    }
  }
  
  main();