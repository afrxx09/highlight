/*! Highlight - v0.1.0 - 2015-05-22
* https://github.com/Andreas/highlight
* Copyright (c) 2015 Andreas Fridlund; Licensed MIT */
(function($, window, document, undefined) {

  var highlight = {
    init: function(config){
      return this.each(function(){
        this.config = $.extend({}, $.fn.highlight.defaultConfig, config);
        $(this).addClass('highlight');
        $(this).append('<div class="highlight-buttons hide"><span class="on">on</span><span class="off">off</span></div>');
        _attachEvents.call(this);
      });
    },
    showButtons: function(){
      return this.each(function(){
        _showButtons.call(this);
      });
    },
    hideButtons: function(){
      return this.each(function(){
        _hideButtons.call(this);
      });
    },
    setColor: function(color){
      return this.each(function(){
        this.config.highlightColor = color;
      });
    }
  };

  var _attachEvents = function(){
    var self = this;
    if(!this.config.disableHover){
      $(this).on('mouseenter', function(){
        _showButtons.call(self);
      });
      $(this).on('mouseleave', function(){
        _hideButtons.call(self);
      });
    }

    $(this).find('.on').on('click', function(){
      _highlightOn.call(self);
    });
    $(this).find('.off').on('click', function(){
      _highlightOff.call(self);
    });
  };

  var _highlightOn = function(){
    $(this).addClass('glow');
    $(this).css({'backgroundColor': this.config.highlightColor});
  };

  var _highlightOff = function(){
    $(this).removeClass('glow');
    $(this).css({'backgroundColor': ''});
  };

  var _showButtons = function(){
    $(this).find('div').addClass('show').removeClass('hide');
  };

  var _hideButtons = function(){
    $(this).find('div').addClass('hide').removeClass('show');
  };

  $.fn.highlight = function(method){
    if(highlight[method]){
      return highlight[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else{
      if(typeof method === 'object' || method === undefined){
        return highlight.init.apply(this, arguments);
      }
      else{
        $.error('Method ' + method + ' does not exist on jQuery.highlight');
      }
    }
  };

  $.fn.highlight.defaultConfig = {
    disableHover: false,
    highlightColor: '#afa'
  };

}(jQuery, window, document));