(function () {
    'use strict';

    define(
        [
            'lodash'
        ],
        function (_) {
            return [
                {
                    key: 'idno',
                    labelText: 'Accession Number'
                },
                {
                    key: 'ItemName',
                    labelText: 'Item Name'
                },
                {
                    key: 'Creator',
                    labelText: 'Creator',
                    displayValue: function (value) {
                        return '<div>' + _(value.split(';'))
                            .chunk(2)
                            .map(function (tuple) {
                                return tuple[0] + ': ' + tuple[1];
                            })
                            .uniq()
                            .join('</div><div>') + '</div>';
                    }
                },
                {
                    key: 'ErectedBy',
                    labelText: 'Erected By'
                },
                {
                    key: 'Subjects',
                    labelText: 'Subjects',
                    displayValue: function (value) {
                        return '<ul class="list-unstyled"><li>' + value.replace(';', '</li><li>') + '</li></ul>';
                    }
                }
            ];
        }
    );
}());
