import Translator from '../src/Translator';
import {
  configure,
  t,
  tn,
  addLocaleData,
  addTranslation,
  addTranslations,
} from '../src/TranslatorSingleton';
import languagePackZh from './languagePacks/zh';
import languagePackEn from './languagePacks/en';

configure({
  languagePack: languagePackEn,
});

describe('Translator', () => {
  describe('new Translator(config)', () => {
    it('initializes when config is not specified', () => {
      expect(new Translator()).toBeInstanceOf(Translator);
    });
    it('initializes when config is an empty object', () => {
      expect(new Translator({})).toBeInstanceOf(Translator);
    });
    it('initializes when config is specified', () => {
      expect(
        new Translator({
          languagePack: languagePackZh,
        }),
      ).toBeInstanceOf(Translator);
    });
  });
  describe('.translate(input, ...args)', () => {
    const translator = new Translator({
      languagePack: languagePackZh,
    });
    it('returns original text for unknown text', () => {
      expect(translator.translate('abc')).toEqual('abc');
    });
    it('translates simple text', () => {
      expect(translator.translate('second')).toEqual('秒');
    });
    it('translates template text with an argument', () => {
      expect(translator.translate('Copy of %s', 1)).toEqual('1 的副本');
      expect(translator.translate('Copy of %s', 2)).toEqual('2 的副本');
    });
    it('translates template text with multiple arguments', () => {
      expect(translator.translate('test %d %d', 1, 2)).toEqual('test 1 2');
    });
  });
  describe('.translateWithNumber(singular, plural, num, ...args)', () => {
    const translator = new Translator({
      languagePack: languagePackZh,
    });
    it('returns original text for unknown text', () => {
      expect(translator.translateWithNumber('fish', 'fishes', 1)).toEqual('fish');
    });
    it('uses 0 as default value', () => {
      expect(translator.translateWithNumber('box', 'boxes')).toEqual('boxes');
    });
    it('translates simple text', () => {
      expect(translator.translateWithNumber('second', 'seconds', 1)).toEqual('秒');
    });
    it('translates template text with an argument', () => {
      expect(translator.translateWithNumber('Copy of %s', 'Copies of %s', 12, 12)).toEqual(
        '12 的副本',
      );
    });
    it('translates template text with multiple arguments', () => {
      expect(translator.translateWithNumber('%d glass %s', '%d glasses %s', 3, 3, 'abc')).toEqual(
        '3 glasses abc',
      );
    });
  });
  describe('.translateWithNumber(key, num, ...args)', () => {
    const translator = new Translator({
      languagePack: languagePackEn,
    });
    it('translates template text with an argument', () => {
      expect(translator.translateWithNumber('%s copies', 1)).toEqual('1 copy');
      expect(translator.translateWithNumber('%s copies', 2)).toEqual('2 copies');
    });
  });

  // Extending language pack
  describe('.addTranslation(...)', () => {
    addTranslation('haha', ['Hahaha']);
    expect(t('haha', 'Hahaha'));
  });
  describe('.addTranslations(...)', () => {
    addTranslations({
      foo: ['bar', '%s bars'],
      bar: ['foo'],
    });
    expect(() => addTranslations(undefined as never)).toThrowError('Invalid translations');
    expect(t('haha')).toEqual('Hahaha');
    expect(tn('foo', 1)).toEqual('bar');
    expect(tn('foo', 2)).toEqual('2 bars');
    expect(tn('bar', 2)).toEqual('bar');
    expect(tn('bar', '2 foo', 2)).toEqual('2 foo');
  });
  describe('.addTranslations(...)', () => {
    expect(() => {
      addTranslations({
        haha: ['this is duplciate'],
      });
    }).toThrowError('Duplicate translation key "haha"');
    expect(t('haha')).toEqual('Hahaha');
  });
  describe('.addLocaleData(...)', () => {
    addLocaleData({
      en: {
        yes: ['ok'],
      },
    });
    expect(t('yes')).toEqual('ok');
    // expect and error because zh is not current locale
    expect(() => {
      addLocaleData({
        zh: {
          haha: ['yes'],
        },
      });
    }).toThrowError('Invalid locale data');
  });
});
