// @ts-expect-error - required for sanity to recognize the file
import {StructureBuilder, StructureToolOptions} from 'sanity/lib/structure'

const structure: StructureToolOptions = (S: StructureBuilder) =>
  S.list()
    .title('Folkearkivet')
    .items([
      S.listItem()
        .title('Landingsside')
        .schemaType('landingPage')
        .child(
          S.document().title('Landingsside').schemaType('landingPage').documentId('landingPage'),
        ),
      S.listItem()
        .title('Forestillinger')
        .schemaType('play')
        .child(S.documentList().title('Forestilling').filter('_type == "play"')),
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
