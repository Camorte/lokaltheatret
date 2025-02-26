// @ts-expect-error - required for sanity to recognize the file
import {StructureBuilder, StructureToolOptions, ConfigContext} from 'sanity/lib/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

const structure: StructureToolOptions = (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title('Folkearkivet')
    .items([
      S.listItem()
        .title('Landingsside')
        .schemaType('landingPage')
        .child(
          S.document().title('Landingsside').schemaType('landingPage').documentId('landingPage'),
        ),
      orderableDocumentListDeskItem({
        type: 'play',
        title: 'Forestillinger',
        id: 'playOrderList',
        S,
        context,
      }),
      S.listItem()
        .title('Artikler')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Artikler')),
      S.listItem()
        .title('Om oss')
        .schemaType('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Bli med')
        .schemaType('join')
        .child(S.document().schemaType('join').documentId('join')),
      S.listItem()
        .title('Footer')
        .schemaType('footer')
        .child(S.document().schemaType('footer').documentId('footer')),
    ])

export default structure
