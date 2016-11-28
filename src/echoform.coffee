$ = require 'jquery'
util = require './util.coffee'
controls = require './controls/index.coffee'
FormControl = require './controls/form.coffee'

jQuery.expr[':'].hasNoValue = (obj) ->
  jQuery.trim(jQuery(obj).text()).length ==0;

defaultControls = controls.matchList.concat()

defaults =
  controls: []

class EchoForm
  @registerControl = (controlClass, options={}) ->
    defaultControls.unshift(controlClass)

  constructor: (@root, options) ->
    try
      @options = $.extend({}, defaults, options)
      @form = form = @options['form']
      @controlClasses = controlClasses = @options['controls'].concat(defaultControls)

      unless form?
        util.error "You must specify a 'form' option when creating a new ECHO Forms instance"

      @resolver = resolver = util.buildXPathResolverFn(form)
      @doc = doc = $(util.parseXML(form))

      @model = model = doc.find('form > model > instance')

      prepopulate = @options.prepopulate
      if prepopulate
        expressionsFirefox = doc.find('form > model > extension[name="pre:prepopulate"] pre\\:expression')
        expressionsAllOthers = doc.find('form > model > extension[name="pre:prepopulate"] expression')
        if expressionsFirefox.length > expressionsAllOthers.length
          expressions = expressionsFirefox;
        else
          expressions = expressionsAllOthers;
        for expression in expressions
          source = expression.getAttribute('source')
          if prepopulate.hasOwnProperty(source)
            ref = expression.getAttribute('ref')
            $(util.execXPath(model.children(), ref, resolver)).text(prepopulate[source])

      @ui = ui = doc.find('form > ui')

      @control = new FormControl(ui, model, controlClasses, resolver)
      @root.append(@control.element())
      @control.addedToDom()
      timer = false
      $('.jstree').on 'keyup', '#band-filter', ->
        clearTimeout(timer) if timer
        timer = setTimeout (->
          text = $('#band-filter').val()
          $('.jstree').jstree(true).search(text)), 250
      $('.jstree').prepend("<input id='band-filter' placeholder='Filter bands here'></input>")
      $('.jstree').jstree('close_all')
    catch exception
      util.error(exception)
      throw exception

  destroy: ->
    @root.empty()

  isValid: ->
    @control.isValid()

  serialize: (options) ->
    @control.serialize(options)

module.exports = EchoForm
