/* eslint-disable */
import * as compiler from '../utils/compiler'

async function getCompiledCode(state) {
  const content = state.textBoxContent
  const HTMLPrep = state.HTMLPrep
  const CSSPrep = state.CSSPrep
  const JSPrep = state.JSPrep
  let HTMLCode = '',
    CSSCode = '',
    JSCode = ''

  if (HTMLPrep === 'HTML') {
    HTMLCode = content.HTML
  } else if (HTMLPrep === 'MarkDown') {
    await compiler
      .compileMarkDown(content.HTML)
      .then(code => {
        HTMLCode = code
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (CSSPrep === 'CSS') {
    CSSCode = content.CSS
  } else if (CSSPrep === 'Sass' || CSSPrep === 'Scss') {
    await compiler
      .compileSass(content.CSS)
      .then(code => {
        CSSCode = code
      })
      .catch(err => {
        console.log(err)
      })
  } else if (CSSPrep === 'Less') {
    await compiler
      .compileLess(content.CSS)
      .then(code => {
        CSSCode = code.css
      })
      .catch(err => {
        console.log(err)
      })
  } else if (CSSPrep === 'Stylus') {
    await compiler
      .compileStylus(content.CSS)
      .then(code => {
        CSSCode = code
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (JSPrep === 'JavaScript') {
    JSCode = content.JavaScript
  } else if (JSPrep === 'TypeScript') {
    JSCode = compiler.compileTypeScript(content.JavaScript)
  } else if (JSPrep === 'CoffeeScript') {
    await compiler
      .compileCoffeeScript(content.JavaScript)
      .then(code => {
        JSCode = code
      })
      .catch(err => {
        console.log(err)
      })
  }
  return {
    HTMLCode,
    CSSCode,
    JSCode
  }
}

export default getCompiledCode
