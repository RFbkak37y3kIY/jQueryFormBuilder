import control from '../control';

/**
 * controlTableLayout class
 * 
 */
export default class controlTableLayout extends control {

  /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
  static get definition() {
    return {
      i18n: {
        default: 'Table Layout'
      }
    };
  }
  
  /**
   * build a paragraph DOM element
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    const localId = 'table-layout-'+(new Date().getTime())+'-'+Math.floor(Math.random()*899+100);
    this.containerId = 'wrapper-' + localId;
    const domElementSpan = $(`<ul id="${this.containerId}" class="frmb" style="background-color: #eee;padding: 1rem; display: flex; flex-direction: row;"></ul>`)[0];
    
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
control.register('TableLayout', controlTableLayout);
control.register(['TableLayout', 'ol'], controlTableLayout, 'TableLayout');
