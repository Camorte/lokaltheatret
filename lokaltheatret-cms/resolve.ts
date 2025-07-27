import {defineDocuments, defineLocations} from 'sanity/presentation'

export const resolve = {
  // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type == "landingPage"`,
    },
    {
      route: '/om-oss',
      filter: `_type == "about"`,
    },
    {route: '/bli-med', filter: `_type == "join"`},
    {
      route: '/forestillinger/:slug',
      filter: `_type == "play" && slug.current == $slug`,
    },
  ]),
  // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
  locations: {
    footer: defineLocations({
      locations: [
        {
          title: 'Footer',
          href: '/',
        },
      ],
      message: 'Dette dokumentet brukes i bunnteksten på alle sider',
      tone: 'positive',
    }),
    landingPage: defineLocations({
      locations: [
        {
          title: 'Landigsside',
          href: '/',
        },
      ],
      message: 'Dette dokumentet brukes på forsiden',
    }),
    about: defineLocations({
      locations: [
        {
          title: 'Om oss',
          href: '/om-oss',
        },
      ],
      message: 'Dette dokumentet brukes på Om oss-siden',
    }),
    join: defineLocations({
      locations: [
        {
          title: 'Om oss',
          href: '/bli-med',
        },
      ],
      message: 'Dette dokumentet brukes på Bli med-siden',
    }),
    play: defineLocations({
      select: {
        name: 'playTitle',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || 'Untitled',
            href: `/forestillinger/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
}
