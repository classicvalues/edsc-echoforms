/**
 * Returns the field value from the XML model based on the ref xpath
 * @param {String} ref model ref xpath
 * @param {Object} model XML model
 */
export const getNodeValue = (ref, model, doc) => {
  // If the node value is 'true' or 'false', we don't need to run xpath
  if (ref === 'true' || ref === 'false') {
    return ref === 'true'
  }
  if (ref === 'true()' || ref === 'false()') {
    return ref === 'true()'
  }

  let modelRef = `//${ref}`

  if (ref.startsWith('//')) modelRef = ref

  const result = doc.evaluate(
    modelRef,
    model,
    document.createNSResolver(model),
    XPathResult.ANY_TYPE,
    null
  )

  let value
  switch (result.resultType) {
    case XPathResult.NUMBER_TYPE:
      value = result.numberValue
      break
    case XPathResult.STRING_TYPE:
      value = result.stringValue
      break
    case XPathResult.BOOLEAN_TYPE:
      value = result.booleanValue
      break
    default: {
      const next = result.iterateNext()
      const { children = [] } = next

      // If children is empty get the text content of the node
      if (children.length === 0) {
        value = next.textContent
      } else {
        // If children has values then we need to get the text content of the children
        value = Array.from(children).map(child => child.textContent)
      }
      break
    }
  }

  return value
}
