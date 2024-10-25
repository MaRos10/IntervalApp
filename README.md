# Interval Timer App ⏱️

## Beskrivning

Detta är en **Interval Timer App** som är byggd med React och använder sig av biblioteket `easy-timer.js` för att hantera tidräkning. Appen tillåter användare att starta en timer, ställa in intervaller och ta pauser mellan intervallerna. Funktionerna inkluderar möjligheten att välja mellan olika vyer för att visa timer (analog, digital och text), samt att lägga till pausperioder efter varje intervall.

### Huvudfunktioner

- **Timer-funktionalitet:** Starta en nedräkningstimer och visa tiden i olika format (analog, digital, text)
- **Hamburgermeny:** Användare kan enkelt växla mellan de olika visningslägena utan att avbryta timern
- **Intervallstöd:** Användare kan ställa in ett intervall som startar om automatiskt när tiden är ute
- **Pausläge:** När ett intervall slutar och pausläget är aktiverat, skickas användaren till en pausvy i fem minuter innan intervallet börjar om
- **Alarmsida:** Om varken intervall eller paus är aktiverat, skickas användaren till en alarmvy

## Teknisk översikt

### Stack

- **Frontend:** React.js
- **State management:** Context API
- **Timer-bibliotek:** [`easy-timer.js`](https://albert-gonzalez.github.io/easytimer.js/)
