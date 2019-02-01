import control from '../control';

/**
 * Button class
 * Output a <button>Label</button> form element
 */
export default class controlInlineGroup extends control {

  /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
  static get definition() {
    const icons = '<svg viewBox="0 0 40 40"><rect x="1" y="1" width="10" height="10" stroke="#ccc" fill="transparent" stroke-dasharray="2 1"></rect><rect x="11" y="1" width="10" height="10" stroke="#ccc" fill="transparent" stroke-dasharray="2 1"></rect></svg>';
    return {
      icons: $(icons)[0],
      i18n: {
        default: 'Inline Group'
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
   
    const localId = 'page-'+Math.floor(Math.random()*1000000);
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
control.register('inlineGroup', controlInlineGroup);
control.register(['inlineGroup', 'ol'], controlInlineGroup, 'inlineGroup');
