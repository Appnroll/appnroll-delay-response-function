import { delayResponse } from "../index"

const fakePromise = async (callback: () => void, forceReject?: boolean) =>
  await new Promise((resolve, reject) => {
    if (forceReject) {
      reject("rejected")
      return
    }
    setTimeout(() => {
      callback()
      resolve("resolved")
    }, 500)
  })

test("Response is resolved properly", async () => {
  const fn = jest.fn()

  await delayResponse(fakePromise(fn)).then((response) => {
    expect(response).toBe("resolved")
  })
  expect(fn).toBeCalled()
})

test("Response is rejected properly", async () => {
  const fn = jest.fn()

  await delayResponse(fakePromise(fn, true)).catch((error) => {
    expect(error).toBe("rejected")
  })
  expect(fn).not.toBeCalled()
})

test("Delaying response works properly", async () => {
  const fn = jest.fn()

  let startTime = new Date().getTime()

  await delayResponse(fakePromise(fn)).then(() => {
    const endTime = new Date().getTime()
    expect(endTime - startTime).toBeGreaterThanOrEqual(500)
    expect(endTime - startTime).toBeLessThan(550)
  })

  startTime = new Date().getTime()

  await delayResponse(fakePromise(fn), 1000).then(() => {
    const endTime = new Date().getTime()
    expect(endTime - startTime).toBeGreaterThanOrEqual(1000)
    expect(endTime - startTime).toBeLessThan(1050)
  })
})
