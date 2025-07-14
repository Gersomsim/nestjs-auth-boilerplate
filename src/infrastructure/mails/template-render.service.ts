// template-renderer.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { envs } from 'src/config/envs.config';

@Injectable()
export class TemplateRendererService {
  private readonly logger = new Logger(TemplateRendererService.name);
  private readonly templateCache = new Map<
    string,
    handlebars.TemplateDelegate
  >();
  private readonly templatesPath: string;

  constructor() {
    this.templatesPath = path.join(
      process.cwd(),
      'src',
      'infrastructure',
      'mails',
      'templates',
    );
    this.registerHelpers();
    this.registerPartials();
  }

  /**
   * Renderiza un template con los datos proporcionados
   * @param templateName - Nombre del template (sin extensión)
   * @param data - Datos para renderizar en el template
   * @returns HTML renderizado
   */
  async renderTemplate(templateName: string, data: any = {}): Promise<string> {
    try {
      // Verificar si el template está en cache
      let compiledTemplate = this.templateCache.get(templateName);

      if (!compiledTemplate) {
        // Cargar y compilar el template
        compiledTemplate = await this.loadAndCompileTemplate(templateName);

        // Guardar en cache (solo en producción)
        if (envs.api.env === 'production') {
          this.templateCache.set(templateName, compiledTemplate);
        }
      }

      // Agregar datos globales al contexto
      const context = {
        ...data,
        appName: envs.api.name,
        appUrl: envs.api.url,
        supportEmail: envs.api.email,
        currentYear: new Date().getFullYear(),
      };

      return compiledTemplate(context);
    } catch (error) {
      this.logger.error(`Error rendering template ${templateName}:`, error);
      throw new Error(`Failed to render template: ${templateName}`);
    }
  }

  /**
   * Carga y compila un template desde el sistema de archivos
   */
  private async loadAndCompileTemplate(
    templateName: string,
  ): Promise<handlebars.TemplateDelegate> {
    const templatePath = path.join(this.templatesPath, `${templateName}.hbs`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    return handlebars.compile(templateSource);
  }

  /**
   * Registra helpers personalizados de Handlebars
   */
  private registerHelpers(): void {
    // Helper para formatear fechas
    handlebars.registerHelper(
      'formatDate',
      (date: Date | string, format: string = 'es-ES') => {
        if (!date) return '';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString(format);
      },
    );

    // Helper para URLs completas
    handlebars.registerHelper('fullUrl', (path: string) => {
      const baseUrl = envs.api.url;
      return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    });

    // Helper condicional
    handlebars.registerHelper(
      'ifEquals',
      function (arg1: any, arg2: any, options: any) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
      },
    );

    // Helper para texto en mayúsculas
    handlebars.registerHelper('uppercase', (str: string) => {
      return str ? str.toUpperCase() : '';
    });

    // Helper para texto en minúsculas
    handlebars.registerHelper('lowercase', (str: string) => {
      return str ? str.toLowerCase() : '';
    });

    // Helper para capitalizar primera letra
    handlebars.registerHelper('capitalize', (str: string) => {
      return str
        ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        : '';
    });

    // Helper para formatear números
    handlebars.registerHelper(
      'formatNumber',
      (num: number, locale: string = 'es-ES') => {
        return num ? num.toLocaleString(locale) : '0';
      },
    );

    // Helper para formatear moneda
    handlebars.registerHelper(
      'formatCurrency',
      (amount: number, currency: string = 'EUR', locale: string = 'es-ES') => {
        return amount
          ? amount.toLocaleString(locale, {
              style: 'currency',
              currency: currency,
            })
          : '0';
      },
    );

    // Helper para truncar texto
    handlebars.registerHelper(
      'truncate',
      (str: string, length: number = 100) => {
        return str && str.length > length
          ? str.substring(0, length) + '...'
          : str;
      },
    );
  }

  /**
   * Registra partials (templates parciales reutilizables)
   */
  private registerPartials(): void {
    const partialsPath = path.join(this.templatesPath, 'partials');

    if (!fs.existsSync(partialsPath)) {
      this.logger.warn('Partials directory not found, creating it...');
      fs.mkdirSync(partialsPath, { recursive: true });
      return;
    }

    const partialFiles = fs
      .readdirSync(partialsPath)
      .filter((file) => file.endsWith('.hbs'));

    partialFiles.forEach((file) => {
      const partialName = path.basename(file, '.hbs');
      const partialPath = path.join(partialsPath, file);
      const partialSource = fs.readFileSync(partialPath, 'utf8');

      handlebars.registerPartial(partialName, partialSource);
      this.logger.debug(`Registered partial: ${partialName}`);
    });
  }

  /**
   * Limpia el cache de templates (útil en desarrollo)
   */
  clearCache(): void {
    this.templateCache.clear();
    this.logger.debug('Template cache cleared');
  }

  /**
   * Recarga los partials (útil en desarrollo)
   */
  reloadPartials(): void {
    // Limpiar partials existentes
    Object.keys(handlebars.partials).forEach((name) => {
      delete handlebars.partials[name];
    });

    // Volver a registrar partials
    this.registerPartials();
    this.logger.debug('Partials reloaded');
  }

  /**
   * Verifica si un template existe
   */
  templateExists(templateName: string): boolean {
    const templatePath = path.join(this.templatesPath, `${templateName}.hbs`);
    return fs.existsSync(templatePath);
  }

  /**
   * Lista todos los templates disponibles
   */
  getAvailableTemplates(): string[] {
    if (!fs.existsSync(this.templatesPath)) {
      return [];
    }

    return fs
      .readdirSync(this.templatesPath)
      .filter((file) => file.endsWith('.hbs'))
      .map((file) => path.basename(file, '.hbs'));
  }
}
