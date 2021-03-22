const FnUtils = (function () {
  const compose = (...fns) => args => fns.reduceRight((arg, fn) => fn(arg), args)
  const pipe = (...fns) => args => fns.reduce((arg, fn) => fn(arg), args)
  return { compose, pipe }
})()