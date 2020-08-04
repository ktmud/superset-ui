import { Locale } from '@superset-ui/translation';

const en = {
  'page_size.show': ['Show'],
  'page_size.all': ['All'],
  'page_size.entries': ['entries'],
  'search.num_records': ['%s record', '%s records...'],
};

const translations: Partial<Record<Locale, typeof en>> = {
  en,
  fr: {
    'page_size.show': ['Afficher'],
    'page_size.all': ['tous'],
    'page_size.entries': ['entrées'],
    'search.num_records': ['%s enregistrement', '%s enregistrements...'],
  },
  zh: {
    'page_size.show': ['每页显示'],
    'page_size.all': ['全部'],
    'page_size.entries': ['条'],
    'search.num_records': ['%s条记录...'],
  },
};

export default translations;
