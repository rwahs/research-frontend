(function () {
    'use strict';

    define(
        [
            'lodash'
        ],
        function (_) {
            return [
                {
                    key: 'Title',
                    labelText: 'Title'
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
                    key: 'DateOfCreation',
                    labelText: 'Date of Creation',
                    displayValue: function (value) {
                        var date = new Date(Date.parse(value));
                        return '<span title="' + date.toDateString() + '" data-microtime="' + date.getTime() + '">' + date.toLocaleDateString() + '</span>';
                    }
                },
                {
                    key: 'Publisher',
                    labelText: 'Publisher'
                },
                {
                    key: 'DateOfPublication',
                    labelText: 'Date of Publication',
                    displayValue: function (value) {
                        var date = new Date(Date.parse(value));
                        return '<span title="' + date.toDateString() + '" data-microtime="' + date.getTime() + '">' + date.toLocaleDateString() + '</span>';
                    }
                },
                {
                    key: 'PlaceOfPublication',
                    labelText: 'Place of Publication'
                },
                {
                    key: 'Medium',
                    labelText: 'Medium'
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
