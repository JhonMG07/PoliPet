// api-gateway/src/proxy/proxy.controller.ts
import { Controller, All, Req, Res, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller()
export class ProxyController {
  private readonly logger = new Logger(ProxyController.name);
  constructor(private readonly httpService: HttpService) {}

  // --- LÓGICA DE ENRUTAMIENTO MEJORADA ---
  private getServiceUrl(path: string): string | null {
    if (path.startsWith('/api/users') || path.startsWith('/api/auth')) {
      return 'https://polipet-users-service.onrender.com';
    }
    if (path.startsWith('/api/pets')) {
      return 'https://polipet-pets-service.onrender.com';
    }
    if (path.startsWith('/api/adoptions')) {
      return 'https://polipet-adoptions-service.onrender.com';
    }
    return null;
  }

  @All('/api/*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const { method, path, body } = req as { method: string; path: string; body: unknown };
    this.logger.log(`Petición entrante: ${method} ${path}`);

    const targetServiceUrl = this.getServiceUrl(path);

    if (!targetServiceUrl) {
      this.logger.warn(`Servicio no encontrado para la ruta: ${path}`);
      return res.status(404).json({ message: 'Ruta no encontrada en el gateway' });
    }

    const newUrl = `${targetServiceUrl}${path.replace('/api', '')}`;
    this.logger.log(`Redirigiendo a: ${newUrl}`);

    try {
      // Extraemos la respuesta completa de Axios
      const axiosResponse = await firstValueFrom(
        this.httpService.request({
          method,
          url: newUrl,
          data: body,
          headers: {
            'Content-Type': req.headers['content-type'] || 'application/json',
            'Authorization': req.headers['authorization'],
          },
          timeout: 5000,
        }),
      );

      // Reenviamos el status code, las cabeceras y el body de la respuesta
      return res.status(axiosResponse.status).set(axiosResponse.headers).send(axiosResponse.data);

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.logger.error(`Error al contactar el servicio [${method} ${newUrl}]: ${error.message}`);
        const status = error.response?.status || 502;
        const data = error.response?.data || { message: 'Error en el servicio de destino.' };
        return res.status(status).json(data);
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error inesperado en el gateway: ${errorMessage}`);
      return res.status(500).json({ message: 'Error interno en el API Gateway' });
    }
  }
}