// Import the route file and the library
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { createMocks } from 'node-mocks-http'
import callGMap from 'pages/api/callGMap'
import matrixJson from 'test-mock/matrix.json'
import { tryParseJSONObject } from 'test-utils/try-json-parse'

describe('CallGMap with msw', () => {
  const DISTANCE_MATRIX_ENDPOINT =
    'https://maps.googleapis.com/maps/api/distancematrix/json?nantes=&key=MOCKED_GMAP_KEY'

  test("Doit appeler l'API distanceMatrix", async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })

    // Call the route function with the mock objects
    await callGMap(req, res)

    // Assert the expected behavior
    expect(callsHistory[0]).toStrictEqual({
      pathname: '/maps/api/distancematrix/json',
      method: 'GET',
      body: {},
      searchParams: 'nantes=&key=MOCKED_GMAP_KEY',
    })
  })
  test('Doit retourner la même réponse que la distanceMatrix API', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })

    // Call the route function with the mock objects
    await callGMap(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toStrictEqual(matrixJson)
  })
  test('Si la limite est activée, refuse un appel ne provenant pas du site appelant', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })
    process.env = { ...process.env, LIMIT_API: 'activated' }
    // Call the route function with the mock objects
    await callGMap(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(403)
    expect(res._getData()).toStrictEqual('Not authorized')
  })
  test('Si la limite est activée, accepte un simple appel provenant du site appelant', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
      headers: {
        referer: 'https://example.com/any',
      },
    })
    process.env = { ...process.env, LIMIT_API: 'activated', WEBSITE_URL: 'example' }
    // Call the route function with the mock objects
    await callGMap(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(200)
  })
  //---------
  // STUBBING PART BELOW
  //----------
  // Mock & check HTTP call
  // Using https://mswjs.io/docs/integrations/node
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  // Mock & check HTTP call
  let callsHistory = []
  const server = setupServer(http.get(DISTANCE_MATRIX_ENDPOINT, () => HttpResponse.json(matrixJson)))

  server.events.on('request:start', async ({ request }) => {
    console.log(request.url)
    callsHistory.push({
      body: tryParseJSONObject(await request.clone().text()),
      method: request.method,
      pathname: new URL(request.url).pathname,
      searchParams: new URL(request.url).searchParams.toString(),
    })
  })
  beforeEach(() => (callsHistory = []))
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  // Mocking ENV variables
  const env = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, GMAP_API_KEY: 'MOCKED_GMAP_KEY' }
  })
  afterEach(() => {
    process.env = env
  })
})
