<p align="center">
  <a href="https://appnroll.com">
    <img alt="App'n'roll" src="https://appnroll.com/img/appnroll-logotype.svg" width="160" />
  </a>
</p>
<h1 align="center">
  Delay response function
</h1>

A function that delays async function to be resolved not earlier than after given time.

## Install

```
npm install @appnroll/appnroll-delay-response-function

# or

yarn add @appnroll/appnroll-delay-response-function
```
## Usage
```TS
await delayResponse(somePromise, timeToResolve)
```
