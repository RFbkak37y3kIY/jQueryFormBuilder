import control from '../control';
import layout from '../layout';
import Helpers from '../helpers';
import { Data } from '../data';
import Dom from '../dom';

/**
 * controlPage class
 * 
 */
export default class controlPage extends control {

  /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
  static get definition() {
    return {
      icon: '🗄',
      i18n: {
        default: 'Page'
      }
    };
  }
  
  /**
   * build a paragraph DOM element
   * @return {Object} DOM Element to be injected into the form.
   */
    build() {
    const { values /* , value, placeholder, type, inline, other, toggle, ...data */ } = this.config;

    if (values || this.config) {
      /* build controls from JSON config (formData) */
      // console.log('PAGE::build(): ', this);
    }

    this.localId = 'page-'+(new Date().getTime())+'-'+Math.floor(Math.random()*899+100);
    this.containerId = 'wrapper-' + this.localId;

    const layoutPageBody = $('<div class="LayoutPageBody"></div>')
        .append('<div class="LayoutPageThumbnails"><div><div><span>Page 1</span></div ></div></div>')
        .append('<div></div>')
        .append(`<div class="LayoutPages"><div><div><ul id="${this.containerId}" class="frmb"></ul></div></div></div>`)   
    
    return this.markup('div', layoutPageBody[0], {id: this.localId, class: 'LayoutPage'});
  }
  
  /**
   * onReder - called after build function
   */
  onRender () {
    const _cid = this.containerId;
    // console.log('PAGE::onRender', this)
    $('#' + _cid).sortable({
      cursor: 'move',
      opacity: 0.9,
      revert: 150,
      connectWith: 'ul',
      cancel: ['input', 'select', 'textarea', '.disabled-field', '.form-elements', '.btn', 'button', '.is-locked'].join(', '),
      placeholder: 'frmb-placeholder',
    }).disableSelection().droppable({
      drop: (e, u) => {
        this.update(e, u, _cid);
      }
    });
  }

  /**
   * update after Dragg control to Page
   * @param {*} event 
   * @param {*} ui 
   * @param {*} cid 
   */
  update (event, ui, cid) {
    setTimeout(e => {
    console.log('>>> this.containerId', cid, this.localId)
      
    const data = new Data(cid);
    const d = new Dom(cid);
    const h = new Helpers(cid, new layout(null, true), this);
    data.formID = cid;
    h.editorUI(cid);

    const _stageFb = event.target // $('#' + cid)[0];
    // console.log('_stageFb', _stageFb)
    // console.log('PAGE::update()', event, ui, h);
    console.log('h.prepData()', h.prepData( _stageFb ));
    console.log('h.prepData()', h.getFormData());
    console.log('h.prepData()', this.config);

    }, 0);
  }
}

// register the following controls
control.register('page', controlPage);
control.register('layout', controlPage);
