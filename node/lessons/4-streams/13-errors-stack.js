function c() {
  throw Error('error c')
}

function b() {
  c()
}

function a() {
  b()
}

a()
