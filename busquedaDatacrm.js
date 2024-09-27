// busquedaDatacrm.js

const fs = require('fs');

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function buscarDatacrm() {
    // Configura las opciones de Chrome para modo headless
    let options = new chrome.Options();
    options.addArguments('--headless'); // Ejecuta Chrome en modo headless
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    // Inicia el navegador (Chrome en este caso)
    let driver = await new Builder()
        .forBrowser('bing')
        .setChromeOptions(options)
        .build();

    try {
        // Navega a Google
        await driver.get('https://www.bing.com');

        // Acepta las cookies si es necesario
        try {
            let aceptarCookies = await driver.findElement(By.id('L2AGLb'));
            await aceptarCookies.click();
        } catch (e) {
            // Si no aparece el botón, continúa
        }

        // Encuentra el campo de búsqueda
        let cajaBusqueda = await driver.findElement(By.name('q'));

        // Ingresa "datacrm" y presiona Enter
        await cajaBusqueda.sendKeys('maria gomez', Key.RETURN);

        // Espera a que se carguen los resultados
        await driver.wait(until.titleContains('maria gomez'), 10000);
      

        console.log('Búsqueda completada exitosamente.');
        const resultadoHTML = driver.execute_script("return document.body.innerHTML;");
        print(resultadoHTML);
        fs.writeFileSync('index.html', resultadoHTML);
    } catch (error) {
        console.error('Ocurrió un error:', error);
        process.exit(1); // Asegura que GitHub Actions detecte el error
    } finally {
        // Cierra el navegador
        await driver.quit();
    }


}

buscarDatacrm();
