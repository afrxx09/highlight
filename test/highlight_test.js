(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */
  module('jquery#highlight', {
    setup: function(){
      this.header = $('#header');
      this.paragraph = $('#qunit-fixture').find('p');
      this.listItems = $('#qunit-fixture').find('li');
    }
  });

  test('is available on the jquery object', function(){
    ok($.fn.highlight, 'Should be accessable on jquery object');
  });

  test('is chainable, i.e. returns a jquery object', function(){
    strictEqual(this.listItems.highlight(), this.listItems);
  });

  test('adds a plugin class on the element', function(){
    this.listItems.highlight();
    ok(this.listItems.hasClass('highlight'));
  });

  test('adds a plugin class on jquery collection of multiple elements', function(){
    this.listItems.highlight();
    ok(this.listItems.hasClass('highlight'));
  });

  test('Element gets a container div with two span tags', function(){
    this.listItems.highlight();

    ok(this.listItems.find('div').length);
    equal(this.listItems.find('div span').length, 8);
  });

  test('Container div is hidden as default', function(){
    this.listItems.highlight();

    equal(this.listItems.find('div').is(':visible'), false);
  });

  test('Container div can be shown', function(){
    this.listItems.highlight();
    this.listItems.highlight('showButtons');

    ok(this.listItems.find('div').is(':visible'));
  });

  test('Container div can be hidden', function(){
    this.listItems.highlight();
    this.listItems.highlight('showButtons');
    this.listItems.highlight('hideButtons');

    equal(this.listItems.find('div').is(':visible'), false);
  });

  test('Mouse enter event should display buttons', function(){
    this.listItems.highlight();
    this.listItems.trigger('mouseenter');

    ok(this.listItems.find('div').is(':visible'));
  });

  test('Mouse leave event should hide buttons', function(){
    this.listItems.highlight();
    this.listItems.highlight('showButtons');
    this.listItems.trigger('mouseleave');

    equal(this.listItems.find('div').is(':visible'), false);
  });

  test('Mouseenter and mouseleave can be disabled through options', function(){
    var options = {disableHover: true};
    this.listItems.highlight(options);
    this.listItems.trigger('mouseenter');
    equal(this.listItems.find('div').is(':visible'), false);
  });

  test('Plugin informs user if an invalid argument was passed to the pugin', function(){
    throws(function(){
      this.listItems.highlight('anInvalidMethod');
    });
    throws(function(){
      this.listItems.highlight(123);
    });
    throws(function(){
      this.listItems.highlight(true);
    });
    throws(function(){
      this.listItems.highlight(false);
    });
    throws(function(){
      this.listItems.highlight(function(){
        return 'hehehe';
      });
    });
  });

  test('clicking the on button highlights the element', function(){
    this.listItems.highlight();
    this.listItems.find('span.on').trigger('click');
    ok(this.listItems.hasClass('glow'));
  });

  test('clicking the off buttons removes highlight from the element', function(){
    this.listItems.highlight();
    this.listItems.find('span.on').trigger('click');
    this.listItems.find('span.off').trigger('click');
    equal(this.listItems.hasClass('glow'), false);
  });

  test('Make sure that clicking multiple times does not interfere with behaviour', function(){
    this.listItems.highlight();
    this.listItems.find('span.on').trigger('click');
    this.listItems.find('span.on').trigger('click');
    this.listItems.find('span.on').trigger('click');
    this.listItems.find('span.off').trigger('click');
    equal(this.listItems.hasClass('glow'), false);
  });

  test('Adding eventhandlers to buttons is a private method', function(){
    this.listItems.highlight();
    throws(function(){
      this.listItems.highlight('_attachEvents');
    });
  });

  test('highlight color can be changed through public method', function(){
    this.listItems.highlight();
    this.listItems.highlight('setColor', '#00f');

    var dummyElem = $('<div></div>');
    dummyElem.css({'backgroundColor': '#00f'});
    this.listItems.find('.on').trigger('click');

    equal(this.listItems.css('backgroundColor'), dummyElem.css('backgroundColor'));
  });

}(jQuery));
