/**
 * List of assignments within a period.
 */
Ext.define('devilry_subjectadmin.view.period.ListOfAssignments', {
    extend: 'Ext.view.View',
    alias: 'widget.listofassignments',
    cls: 'listofassignments bootstrap',
    store: 'Assignments',

    tpl: [
        '<ul>',
            '<tpl for=".">',
                '<li class="assignment">',
                    '<a href="#/{parentnode__parentnode__short_name}/{parentnode__short_name}/{short_name}/">{long_name}</a>',
                '</li>',
            '</tpl>',
        '<ul>'
    ],
    itemSelector: 'li.assignment',
});