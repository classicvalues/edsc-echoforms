export const checkboxXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:boolreference>true</prov:boolreference></prov:options></instance></model><ui><input id="boolinput" label="Bool input" ref="prov:boolreference" type="xs:boolean"><help>Helpful text</help></input></ui></form>'

export const textfieldXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:groupreference><prov:textreference>test value</prov:textreference></prov:groupreference></prov:options></instance></model><ui><input id="textinput" label="Text input" ref="prov:textreference" type="xs:string"><help>Helpful text</help></input></ui></form>'

export const secretXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:textreference>test value</prov:textreference></prov:options></instance></model><ui><secret id="secret" label="Secret" ref="prov:textreference"></secret></ui></form>'

export const textareaXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:textreference>test value</prov:textreference></prov:options></instance></model><ui><textarea id="textinput" label="Textarea input" ref="prov:textreference" type="xs:string"><help>Helpful text</help></textarea></ui></form>'

export const outputXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:textreference>test value</prov:textreference></prov:options></instance></model><ui><output id="output" label="Output" ref="prov:textreference"></output></ui></form>'

export const urlOutputXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:textreference>test value</prov:textreference></prov:options></instance></model><ui><output type="xs:anyURI" id="output" label="URL Output" ref="prov:textreference"></output></ui></form>'

export const notRelevantXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:boolreference>false</prov:boolreference><prov:textreference>test value</prov:textreference></prov:options></instance></model><ui><input id="boolinput" label="Bool input" ref="prov:boolreference" type="xs:boolean"></input><input id="textinput" label="Relevant based on checkbox" ref="prov:textreference" relevant="prov:boolreference=\'true\'" type="xs:string"></input></ui></form>'

export const readOnlyXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:boolreference>true</prov:boolreference><prov:textreference>test value</prov:textreference></prov:options></instance></model><ui><input id="boolinput" label="Bool input" ref="prov:boolreference" type="xs:boolean"></input><input id="textinput" label="Relevant based on checkbox" ref="prov:textreference" readonly="prov:boolreference=\'true\'" type="xs:string"></input></ui></form>'

export const selectXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:selectreference><prov:value>value 1</prov:value><prov:value>value 2</prov:value></prov:selectreference></prov:options></instance></model><ui><select id="selectinput" label="Select input" ref="prov:selectreference" valueElementName="value"><help>Helpful text</help></select></ui></form>'

export const multiSelectXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:selectreference><prov:value>value 1</prov:value><prov:value>value 2</prov:value></prov:selectreference></prov:options></instance></model><ui><select multiple="true" id="selectinput" label="Select input" ref="prov:selectreference" valueElementName="value"><help>Helpful text</help></select></ui></form>'

export const datetimeXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:datetimereference>2020-01-01T00:00:00</prov:datetimereference></prov:options></instance></model><ui><input id="datetimeinput" label="DateTime input" ref="prov:datetimereference" type="xs:datetime"><help>Helpful text</help></input></ui></form>'

export const rangeXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:rangeReference>5</prov:rangeReference></prov:options></instance></model><ui><range id="range" label="Range" start="1" stop="10" step="1" type="xs:int" ref="prov:rangeReference"><help>Helpful text</help></range></ui></form>'

export const groupXml = '<form><model><instance><prov:options xmlns:prov="http://www.example.com/orderoptions"><prov:groupreference><prov:textreference>test value</prov:textreference></prov:groupreference></prov:options></instance></model><ui><group id="group" label="Group" ref="prov:groupreference"><input id="textinput" label="Text input" ref="prov:textreference" type="xs:string"><help>Helpful text</help></input></group></ui></form>'
