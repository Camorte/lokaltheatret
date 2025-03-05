import {Stack, Text} from '@sanity/ui'
import {useFormValue} from 'sanity'
import {useEffect, useState} from 'react'

type RGB = {
  r: number
  g: number
  b: number
}

const RED = 0.2126
const GREEN = 0.7152
const BLUE = 0.0722

const GAMMA = 2.4

const luminance = (r: number, g: number, b: number) => {
  var a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA)
  })
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE
}

const contrast = (rgb1: RGB, rgb2: RGB) => {
  var lum1 = luminance(rgb1.r, rgb1.g, rgb1.b)
  var lum2 = luminance(rgb2.r, rgb2.g, rgb2.b)
  var brightest = Math.max(lum1, lum2)
  var darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

const ColorContrastString = () => {
  const playColor = useFormValue(['playColor']) as {rgb: RGB}
  const textColor = useFormValue(['textColor']) as {rgb: RGB}
  const [contrastValue, setContrastValue] = useState<number>()

  useEffect(() => {
    if (playColor && textColor && playColor.rgb && textColor.rgb) {
      const newContrastValue = Number(contrast(playColor.rgb, textColor.rgb).toFixed(2))
      setContrastValue(newContrastValue)
    }
  }, [playColor, textColor])

  return (
    <Stack space={3}>
      {contrastValue ? (
        <>
          <Text size={3}>Kontrastratio er: {contrastValue}</Text>
          {contrastValue < 3 ? (
            <Text style={{color: 'red'}}>
              Denne kontrastratioen er ikke innenfor WCAG standarden
            </Text>
          ) : (
            <Stack space={3}>
              {contrastValue > 3 && (
                <Text style={{color: contrastValue >= 3 ? 'green' : 'red'}}>
                  AA: Kontrasten er bra for store tekster og UI elementer.
                </Text>
              )}
              <Text style={{color: contrastValue >= 4.5 ? 'green' : 'red'}}>
                AA:{' '}
                {contrastValue >= 4.5
                  ? 'Kontrasten er bra for normal tekst.'
                  : 'Kontrasten er ikke bra nok for normal tekst.'}
              </Text>
              <Text style={{color: contrastValue >= 7 ? 'green' : 'red'}}>
                AAA:{' '}
                {contrastValue >= 7
                  ? 'Kontrasten er bra for alle, selv med de som har nedsatt syn.'
                  : 'Kontrasten er ikke bra nok med de som har nedsatt syn.'}
              </Text>
            </Stack>
          )}
        </>
      ) : (
        <Text size={3}>Ikke alle farger er valgt ennå</Text>
      )}
      <p style={{marginBottom: 0}}>
        Les mer om WCAG standarden{' '}
        <a
          href="https://en.wikipedia.org/wiki/Web_Content_Accessibility_Guidelines"
          target="_blank"
        >
          her
        </a>
      </p>
    </Stack>
  )
}

export default ColorContrastString
