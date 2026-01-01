import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

let _builder: ImageUrlBuilder | null = null

function getBuilder(): ImageUrlBuilder {
  if (!_builder) {
    _builder = imageUrlBuilder(client)
  }
  return _builder
}

export function urlFor(source: SanityImageSource) {
  const builder = getBuilder()
  return builder.image(source)
}
