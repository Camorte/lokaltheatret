// @ts-ignore
import {StructureBuilder, StructureToolOptions} from 'sanity/lib/structure'

const structure: StructureToolOptions = (S: StructureBuilder) =>
  S.list()
    .title('Folkearkivet')
    .items([
      S.listItem()
        .title('Hovedbanner')
        .schemaType('mainBanner')
        .child(S.document().title('Hovedbanner').schemaType('mainBanner').documentId('mainBanner')),
      S.listItem()
        .title('Artikler')
        .schemaType('article')
        .child(S.documentList().title('Future projects').filter('_type == "article"')),
      S.listItem()
        .title('Om oss')
        .schemaType('about')
        .child(S.document().schemaType('about').documentId('about')),
    ])

export default structure
