export async function translate(text, from = 'en', to = 'es') {
         console.log(text, from, to)
         const res = await fetch("https://libretranslate.com/translate", {
                  method: "POST",
                  body: JSON.stringify({
                           q: text,
                           source: from,
                           target: to
                  }),
                  headers: { "Content-Type": "application/json" }
         });
         const translatedText = await res.json()


         return translatedText
}