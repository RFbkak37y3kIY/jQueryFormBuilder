import control from '../control';

/**
 * controlTableLayout class
 *
 */
export default class controlTable extends control {

  /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
  static get definition() {
    return {
      i18n: {
        default: 'Table'
      }
    };
  }

  /**
   * build a paragraph DOM element
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    let { columnsCount, rowsCount, bordered } = this.config;

    columnsCount = columnsCount || 1;
    rowsCount = rowsCount || 1;

    const tableRows = [];
    const flexBasis = 100 / columnsCount;
    const cellClassName = 'wrapper-' +  'table-'+(new Date().getTime())+'-'+Math.floor(Math.random()*899+100);

    this.cellClassName = cellClassName;

    for (let i = 0; i < rowsCount; i += 1) {
      const columns = [];

      for (let j = 0; j < columnsCount; j += 1) {
        columns.push(
          this.markup('ul', [], {
            class: `frmb ${cellClassName} table-cell`,
            style : `flex: 0 0 ${flexBasis}%;`,
            'data-key': `${i}:${j}`,
          })
        )
      }

      tableRows.push(
        this.markup('div', columns,
          {
            class: 'table-row',
            style: 'display: flex; flex-wrap: nowrap;',
          }
        )
      )
    }

    return this.markup(
      'span',
      tableRows,
      {
        class: `table ${bordered ? 'bordered' : ''}`,
        id: this.config.id
      },
    );
  }

  /**
   * onReder - called after build function
   */
  onRender () {
    $(`.${this.cellClassName}`)
      .sortable({
        cursor: 'move',
        opacity: 0.9,
        revert: 150,
        connectWith: 'ul',
        cancel: ['input', 'select', 'textarea', '.disabled-field', '.form-elements', '.btn', 'button', '.is-locked'].join(', '),
        placeholder: 'frmb-placeholder',
      })
      .disableSelection();
  }
}

// register the following controls
control.register('table', controlTable);
