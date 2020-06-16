/**
 * Delays async function to be resolved not earlier than after given time.
 *
 * @param {Promise} promise - Asynchronous function (promise) to delay
 * @param {number} delay=500 - Minimum time after which the function will be executed (in milliseconds)
 * @returns {Promise} - Rejected or fulfilled promise
 *
 */
const delayResponse = async <T>(
    promise: Promise<T>,
    delay: number = 500
): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        const startTime = new Date().getTime()

        const delayTimeout = (callback: () => void) => {
            const timeDifference = new Date().getTime() - startTime
            if (timeDifference < delay) {
                const timeout = setTimeout(() => {
                    callback()
                    clearTimeout(timeout)
                }, delay - timeDifference)
            } else {
                callback()
            }
        }

        try {
            const result = await promise
            delayTimeout(() => resolve(result))
        } catch (error) {
            delayTimeout(() => reject(error))
        }
    })
}

export default delayResponse