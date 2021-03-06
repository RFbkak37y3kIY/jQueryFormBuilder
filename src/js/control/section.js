import control from '../control';

/**
 * controlSaction class
 * 
 */
export default class controlSaction extends control {

  /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
  static get definition() {
    return {
      i18n: {
        default: 'Section'
      }
    };
  }
  
  /**
   * build a paragraph DOM element
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    
    /* this.icons = this.markup('div', icons, {
            id: 'inlineGroup-icons'
        });
    */ 
   
    const localId = 'saction-'+(new Date().getTime())+'-'+Math.floor(Math.random()*899+100);
    this.containerId = 'wrapper-' + localId;
    const domElementSpan = $(`<ul id="${this.containerId}" class="frmb" style="background-color: #eee;padding: 0.3rem;"></ul>`)[0];
    
    return this.markup('span', domElementSpan, {id: localId});
  }
  
  /**
   * onReder - called after build function
   */
  onRender () {
    $('#' + this.containerId).sortable({
      cursor: 'move',
      opacity: 0.9,
      revert: 150,
      connectWith: 'ul',
      cancel: ['input', 'select', 'textarea', '.disabled-field', '.form-elements', '.btn', 'button', '.is-locked'].join(', '),
      placeholder: 'frmb-placeholder',
    }).disableSelection();
  }
}

// register the following controls
control.register('section', controlSaction);
control.register(['section', 'ol'], controlSaction, 'section');
