import UntypedJed from 'jed';
import { logging } from '@superset-ui/core';
import { TranslatorConfig, Locale, Translations, LocaleData } from './types';

const DEFAULT_LANGUAGE_PACK = {
  domain: 'superset',
  locale_data: {
    superset: {
      '': {
        domain: 'superset',
        lang: 'en' as Locale,
        plural_forms: 'nplurals=2; plural=(n != 1)',
      },
    },
  },
};

interface Jed {
  translate(input: string): Jed;
  ifPlural(value: number, plural: string): Jed;
  fetch(...args: unknown[]): string;
  options: {
    // eslint-disable-next-line camelcase
    locale_data: {
      superset: Translations & {
        // eslint-disable-next-line camelcase
        '': typeof DEFAULT_LANGUAGE_PACK.locale_data.superset[''];
      };
    };
  };
}

export default class Translator {
  i18n: Jed;

  locale: Locale;

  constructor(config: TranslatorConfig = {}) {
    const { languagePack = DEFAULT_LANGUAGE_PACK } = config;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.i18n = new UntypedJed(languagePack) as Jed;
    this.locale = this.i18n.options.locale_data.superset[''].lang;
  }

  /**
   * Add additional translations on the fly, used by plugins.
   */
  addTranslation(key: string, texts: string[]) {
    const translations = this.i18n.options.locale_data.superset;
    if (key in translations) {
      logging.warn(`Duplicate translation key "${key}", will override.`);
    }
    translations[key] = texts;
  }

  /**
   * Add a series of translations.
   */
  addTranslations(translations: Translations) {
    if (translations && !Array.isArray(translations)) {
      Object.entries(translations).forEach(([key, vals]) => this.addTranslation(key, vals));
    } else {
      logging.warn('Invalid translations');
    }
  }

  addLocaleData(data: LocaleData) {
    const translations = data?.[this.locale];
    if (translations) {
      this.addTranslations(translations);
    } else {
      logging.warn('Invalid locale data');
    }
  }

  translate(input: string, ...args: unknown[]): string {
    return this.i18n.translate(input).fetch(...args);
  }

  translateWithNumber(key: string, ...args: unknown[]): string {
    const [plural, num, ...rest] = args;
    if (typeof plural === 'number') {
      return this.i18n
        .translate(key)
        .ifPlural(plural, key)
        .fetch(plural, num, ...args);
    }
    return this.i18n
      .translate(key)
      .ifPlural(num as number, plural as string)
      .fetch(...rest);
  }
}
