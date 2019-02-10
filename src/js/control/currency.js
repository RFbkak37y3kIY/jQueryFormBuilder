import jsonData from '../../../ISO4217.json';
import control from '../control';
/**
 * Currency class
 * Output a <button>Label</button> form element
 */
export default class currency extends control {
  /**
   * Class configuration - return the icons & label related to this control
   * @returndefinition object
   */
  static get definition()
  {
    return {
      icon: '$',
      i18n: {
        default: 'Currency field'
      }
    };
  }

  /**
   * build a text DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    const { value, currencyValue } = this.config;

    const input = this.markup(
      'input',
      null,
      { class : 'form-control masked', id: this.config.id, value: value || '' },
    );
    const options = currency.CURRENCIES.map(i =>
      this.markup(
        'option',
        i,
        { value: i, ...(i === currencyValue ? { selected: 'selected' } : {})},
      )
    );
    const select = this.markup('select', options, { name: 'currencyValue', class: 'form-control', id: `currencyValue-${this.config.id}`, });
    const colLeft = this.markup('div', [select], {class : ''});
    const colRight = this.markup('div', [input], {class : ''});

    this.dom = this.markup('div', [colLeft, colRight], { class : 'form-group row' });
    return this.dom;
  }

  /**
   * onRender callback
   *
   */
  onRender() {

    if (this.config.userData) {
      $(this.dom).val(this.config.userData[0])
    }

    const params = this.getLocaleParams();
    const mask = '#' + params.groupSeparator + '##0' + params.decimalSeparator + '00';

    $('.masked').mask(mask, { reverse: true });
  }

   /**
   * getLocaleParams get localilzed object
   * @return {object} localized object
   */
  getLocaleParams() {
    const number = 111111111.111111111;
    const numberString = number.toLocaleString();

    let decimalSeparator = '';
    for (let i = numberString.length - 1; i >= 0; i--) {
      const char = numberString.charAt(i);
      if (char !== '1') {
        decimalSeparator = char;
        break;
      }
    }

    let groupSeparator = '';
    for (let i = 0; i < numberString.length; i++) {
      const char = numberString.charAt(i);
      if (char !== '1') {
        groupSeparator = char;
        break;
      }
    }

    return { decimalSeparator, groupSeparator }
  }
}

currency.CURRENCIES = jsonData
  .filter(item => item.AlphabeticCode)
  .map(item => item.AlphabeticCode)
  .filter((v,i,a) => a.indexOf(v) === i)
  .sort();


control.register('currency', currency);


