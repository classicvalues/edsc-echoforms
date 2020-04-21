import React from 'react'
import * as ReactDOM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'
import { configure, mount } from 'enzyme'

import { EchoFormsContext } from '../../../../src/context/EchoFormsContext'
import { Checkbox } from '../../../../src/components/Checkbox/Checkbox'
import { DateTime } from '../../../../src/components/DateTime/DateTime'
import { FormElement } from '../../../../src/components/FormElement/FormElement'
import { Group } from '../../../../src/components/Group/Group'
import { Output } from '../../../../src/components/Output/Output'
import { parseXml } from '../../../../src/util/parseXml'
import { Range } from '../../../../src/components/Range/Range'
import { SecretField } from '../../../../src/components/SecretField/SecretField'
import { Select } from '../../../../src/components/Select/Select'
import { TextArea } from '../../../../src/components/TextArea/TextArea'
import { TextField } from '../../../../src/components/TextField/TextField'
import {
  checkboxXml,
  datetimeXml,
  groupXml,
  multiSelectXml,
  notRelevantXml,
  outputXml,
  rangeXml,
  readOnlyXml,
  secretXml,
  selectXml,
  textareaXml,
  textfieldXml,
  urlOutputXml
} from '../../../mocks/FormElement'

window.ReactDOM = ReactDOM

chai.use(chaiEnzyme())
configure({ adapter: new Adapter() })

function readXml(file) {
  const doc = parseXml(file)
  const uiResult = document.evaluate('//*[local-name()="ui"]', doc)
  const ui = uiResult.iterateNext()
  const modelResult = document.evaluate('//*[local-name()="instance"]/*', doc)
  const model = modelResult.iterateNext()

  return { doc, model, ui }
}

function setup(doc, props) {
  const onUpdateModel = cy.spy().as('onUpdateModel')
  const enzymeWrapper = mount(
    <EchoFormsContext.Provider value={{ doc, onUpdateModel }}>
      <FormElement {...props} />
    </EchoFormsContext.Provider>
  )

  return {
    enzymeWrapper,
    props,
    onUpdateModel
  }
}

describe('FormElement component', () => {
  it('renders a Checkbox component', () => {
    const { doc, model, ui } = readXml(checkboxXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const checkbox = enzymeWrapper.find(Checkbox)

    expect(checkbox).to.have.lengthOf(1)
    expect(checkbox.props()).to.have.property('checked', 'true')
    expect(checkbox.props()).to.have.property('label', 'Bool input')
    expect(checkbox.props()).to.have.property('modelRef', 'prov:boolreference')
    expect(checkbox.props()).to.have.property('readOnly', false)
    expect(checkbox.props()).to.have.property('required', false)
  })

  it('renders a TextField component', () => {
    const { doc, model, ui } = readXml(textfieldXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const textfield = enzymeWrapper.find(TextField)

    expect(textfield).to.have.lengthOf(1)
    expect(textfield.props()).to.have.property('value', 'test value')
    expect(textfield.props()).to.have.property('label', 'Text input')
    expect(textfield.props()).to.have.property('modelRef', 'prov:textreference')
    expect(textfield.props()).to.have.property('readOnly', false)
    expect(textfield.props()).to.have.property('required', false)
  })

  it('renders a secret TextField component', () => {
    const { doc, model, ui } = readXml(secretXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const secretfield = enzymeWrapper.find(SecretField)

    expect(secretfield).to.have.lengthOf(1)
    expect(secretfield.props()).to.have.property('value', 'test value')
    expect(secretfield.props()).to.have.property('label', 'Secret')
    expect(secretfield.props()).to.have.property('modelRef', 'prov:textreference')
    expect(secretfield.props()).to.have.property('readOnly', false)
    expect(secretfield.props()).to.have.property('required', false)
  })

  it('renders a TextArea component', () => {
    const { doc, model, ui } = readXml(textareaXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const textarea = enzymeWrapper.find(TextArea)

    expect(textarea).to.have.lengthOf(1)
    expect(textarea.props()).to.have.property('value', 'test value')
    expect(textarea.props()).to.have.property('label', 'Textarea input')
    expect(textarea.props()).to.have.property('modelRef', 'prov:textreference')
    expect(textarea.props()).to.have.property('readOnly', false)
    expect(textarea.props()).to.have.property('required', false)
  })

  it('renders a Select component', () => {
    const { doc, model, ui } = readXml(selectXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const select = enzymeWrapper.find(Select)

    expect(select).to.have.lengthOf(1)
    expect(select.props().value).to.eql(['value 1', 'value 2'])
    expect(select.props()).to.have.property('label', 'Select input')
    expect(select.props()).to.have.property('modelRef', 'prov:selectreference')
    expect(select.props()).to.have.property('multiple', false)
    expect(select.props()).to.have.property('readOnly', false)
    expect(select.props()).to.have.property('required', false)
    expect(select.props()).to.have.property('valueElementName', 'value')
  })

  it('renders a multi-Select component', () => {
    const { doc, model, ui } = readXml(multiSelectXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const select = enzymeWrapper.find(Select)

    expect(select).to.have.lengthOf(1)
    expect(select.props().value).to.eql(['value 1', 'value 2'])
    expect(select.props()).to.have.property('label', 'Select input')
    expect(select.props()).to.have.property('modelRef', 'prov:selectreference')
    expect(select.props()).to.have.property('multiple', true)
    expect(select.props()).to.have.property('readOnly', false)
    expect(select.props()).to.have.property('required', false)
    expect(select.props()).to.have.property('valueElementName', 'value')
  })

  it('renders a DateTime component', () => {
    const { doc, model, ui } = readXml(datetimeXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const datetime = enzymeWrapper.find(DateTime)

    expect(datetime).to.have.lengthOf(1)
    expect(datetime.props()).to.have.property('value', '2020-01-01T00:00:00')
    expect(datetime.props()).to.have.property('label', 'DateTime input')
    expect(datetime.props()).to.have.property('modelRef', 'prov:datetimereference')
    expect(datetime.props()).to.have.property('readOnly', false)
    expect(datetime.props()).to.have.property('required', false)
  })

  it('renders an Output component', () => {
    const { doc, model, ui } = readXml(outputXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const output = enzymeWrapper.find(Output)

    expect(output).to.have.lengthOf(1)
    expect(output.props()).to.have.property('value', 'test value')
    expect(output.props()).to.have.property('label', 'Output')
    expect(output.props()).to.have.property('required', false)
  })

  it('renders an URL Output component', () => {
    const { doc, model, ui } = readXml(urlOutputXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const output = enzymeWrapper.find(Output)

    expect(output).to.have.lengthOf(1)
    expect(output.props()).to.have.property('value', 'test value')
    expect(output.props()).to.have.property('label', 'URL Output')
    expect(output.props()).to.have.property('required', false)
  })

  it('does not render a field that is not relevant', () => {
    const { doc, model, ui } = readXml(notRelevantXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[1],
      model
    })

    expect(enzymeWrapper.find(TextField)).to.have.lengthOf(0)
  })

  it('renders a readonly field as readonly', () => {
    const { doc, model, ui } = readXml(readOnlyXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[1],
      model
    })

    const textfield = enzymeWrapper.find(TextField)
    expect(textfield).to.have.lengthOf(1)
    expect(textfield.props()).to.have.property('readOnly', true)
  })

  it('renders a Group component', () => {
    const { doc, model, ui } = readXml(groupXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const group = enzymeWrapper.find(Group)

    expect(group).to.have.lengthOf(1)
    expect(group.props()).to.have.property('id', 'group')
    expect(group.props()).to.have.property('label', 'Group')
    expect(group.props()).to.have.property('modelRef', 'prov:groupreference')
    expect(group.props()).to.have.property('readOnly', false)
  })

  it('handles parent props', () => {
    const { doc, model, ui } = readXml(textfieldXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model,
      parentModelRef: 'prov:groupreference',
      parentReadOnly: true
    })

    const textfield = enzymeWrapper.find(TextField)

    expect(textfield).to.have.lengthOf(1)
    expect(textfield.props()).to.have.property('value', 'test value')
    expect(textfield.props()).to.have.property('label', 'Text input')
    expect(textfield.props()).to.have.property('modelRef', 'prov:groupreference/prov:textreference')
    expect(textfield.props()).to.have.property('readOnly', true)
  })

  it.only('renders a Range component', () => {
    const { doc, model, ui } = readXml(rangeXml)

    const { enzymeWrapper } = setup(doc, {
      element: ui.children[0],
      model
    })

    const range = enzymeWrapper.find(Range)

    expect(range).to.have.lengthOf(1)
    expect(range.props()).to.have.property('value', '5')
    expect(range.props()).to.have.property('min', '1')
    expect(range.props()).to.have.property('max', '10')
    expect(range.props()).to.have.property('step', '1')
    expect(range.props()).to.have.property('label', 'Range')
    expect(range.props()).to.have.property('modelRef', 'prov:rangeReference')
    expect(range.props()).to.have.property('readOnly', false)
    expect(range.props()).to.have.property('required', false)
  })
})
