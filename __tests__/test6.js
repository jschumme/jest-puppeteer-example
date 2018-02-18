const timeout = 5000

function createWindow () {
  Ext.create('Ext.window.Window', { title: 'hallo', width: 200, height: 200 }).show()
}


describe('/ (Home Page)', () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()

      const timeout = 30000;
      const networkIdleTimeout = 500;
      await Promise.all([
        page.waitForNavigation({ timeout, waitUntil: 'load' }),
        page.waitForNavigation({ timeout, waitUntil: 'networkidle0' }),
        page.goto('http://localhost:1841')
      ]);
      page.on('console', msg => { console.log(msg); });
      var handle = await page.evaluateHandle(() => Ext.create('Ext.window.Window', { title: 'hallo', width: 200, height: 200 }).show())
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should load without error', async () => {
      let text = await page.evaluate(() => document.body.textContent)
    })
  },
  timeout
)
