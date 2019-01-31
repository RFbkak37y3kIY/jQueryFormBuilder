import control from '../control';

/**
 * Button class
 * Output a <button>Label</button> form element
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
        default: 'Page Control'
      }
    };
  }
  
  /**
   * build a paragraph DOM element
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    const localId = 'page-'+Math.floor(Math.random()*1000000);
    this.containerId = 'wrapper-' + localId;
    const domElementSpan = $(`<ul id="${this.containerId}" class="frmb" style="background-color: #eee;padding: 1rem;"></ul>`)[0];
    
    return this.markup('span', domElementSpan, {id: localId});
  }
  
  /**
   * onReder - called after build function
   */
  onRender () {
    // const h = window.helperStageInstance;
    // const h = window.formBuilderSortableEvents;
    // console.log(this.dom)
    $('#' + this.containerId).sortable({
      cursor: 'move',
      opacity: 0.9,
      revert: 150,
      connectWith: 'ul',
      // beforeStop: (evt, ui) => h.beforeStop.call(h, evt, ui),
      // start: (evt, ui) => h.startMoving.call(h, evt, ui),
      // stop: (evt, ui) => h.stopMoving.call(h, evt, ui),
     // beforeStop: h.beforeStop,
     // start: h.start,
     // stop: h.stop,
      cancel: ['input', 'select', 'textarea', '.disabled-field', '.form-elements', '.btn', 'button', '.is-locked'].join(', '),
      placeholder: 'frmb-placeholder',
    }).disableSelection();
  }
}

// register the following controls
control.register('page', controlPage);
control.register(['page', 'ol'], controlPage, 'page');
