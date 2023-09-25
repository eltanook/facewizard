const BOTNAME = 'Face Wizard'
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
QRPortalWeb({ name: BOTNAME, port: 3005 })
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['anciano', 'pelado', 'barbudo']).addAnswer(
    ['Aquí tienes tu imágen editada...'],
    {
        media: 'https://i.redd.it/p6ca651s02t71.jpg',
    },
)  

const flowTuto = addKeyword(['info', 'informacion', 'i', 'inf']).addAnswer(
    [
        'Con Face Wizard, puedes transformar la apariencia de cualquier persona en tus fotos con solo unos mensajes sencillos. Ya sea que quieras ver a tus amigos calvos, envejecidos o incluso con una barba magnífica, Face Wizard lo tiene cubierto.',

        '¿Cómo funciona? ¡Es simple! Solo envía la foto que deseas editar a Face Wizard, y luego selecciona el hechizo que le quieres aplicar. En poco tiempo, recibirás una versión modificada de la imagen llena de humor, lista para compartir y disfrutar con tus amigos o familia.',

        'Nuestro objetivo es crear momentos divertidos y sacar sonrisas. Face Wizard está aquí para brindarte risas y entretenimiento sin fin, haciendo que tu experiencia de edición de fotos sea verdaderamente agradable y por sobre todo, Fácil y accesible, ya que no deberás descargar ninguna aplicación para editar tus fotos. ¡Todo lo que necesitas es nuestra mágia dentro de WhatsApp!',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac', 'grax', 'muchas gracias']).addAnswer(
    [
        'A tus ordenes 🧙‍♂️',
        'Si necesitas algo más solo escribe *foto* nuevamente...',
    ],
    null,
    null,
    [flowSecundario]
)

const flowFoto = addKeyword(['foto, ft, photo']).addAnswer(
    ['¿Que hechizo quieres que use en la foto?',
    {
        buttons: [
            { body: '👴 Anciano (escribe anciano)'},
            { body: '👩‍🦲 Pelado (escribe pelado)'},
            { body: '🧔 Barbudo (escribe barbudo)'},
        ]
    }],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'buenas', 'holis', 'h', 'hello', 'hi', ])
    .addAnswer('Hola, mi nombre es *Face Wizard* 🧙‍♂️', {delay:500})
    .addAnswer(
        [
            '👉 Puedo convetir a la persona en *Pelada*', {delay:500},
            '👉 Puedo convertir a la gente en *anciana* ', {delay:500},
            '👉 Puedo convertir a la gente en *barbuda* ', {delay:500},
            'Y pronto tendré más poderes...', {delay:500},
            'Comparteme una foto de un rostro y yo podré hacer magia 🪄',
        ],
        null,
        null,
        [flowGracias, flowTuto, flowFoto]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()