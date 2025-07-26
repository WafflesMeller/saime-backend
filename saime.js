import { chromium } from 'playwright'

export async function scrapeCedula(nacionalidad, cedula) {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://controlfronterizo.saime.gob.ve/index.php?r=dregistro/dregistro/cedula', { waitUntil: 'networkidle' })

  await page.selectOption('#Dregistro_letra', nacionalidad)
  await page.fill('#Dregistro_num_cedula', cedula)
  await page.click('#yt0')
  await page.waitForLoadState('networkidle')

  // Extraer contenido de los datos (ajusta los selectores reales)
  const bodyText = await page.locator('#content').innerText()

  // Aquí debes ajustar a la estructura real que tenga SAIME.
  // Simulación de respuesta (esto debes scrapear con base al HTML real que se muestra)
  const datos = {
    cedula,
    primer_nombre: "JUAN",
    segundo_nombre: "CARLOS",
    primer_apellido: "PÉREZ",
    segundo_apellido: "RODRÍGUEZ",
    sexo: "M",
    fecha_nacimiento: "1990-01-01"
  }

  await browser.close()
  return datos
}
