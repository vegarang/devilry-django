Ext.define('devilry.extjshelpers.assignmentgroup.AssignmentGroupTitle', {
    extend: 'devilry.extjshelpers.SingleRecordView',
    alias: 'widget.assignmentgrouptitle',
    cls: 'widget-assignmentgrouptitle section treeheading',

    tpl: Ext.create('Ext.XTemplate',
        '<h1>{parentnode__long_name}</h1>',
        '<h2>{parentnode__parentnode__long_name:ellipsis(20)}</h2>',
        '<h3>{parentnode__parentnode__parentnode__long_name:ellipsis(60)}</h3>',
        '<tpl if="name">',
        '   {name}: ',
        '</tpl>',
        '<ul>',
        '<tpl for="candidates">',
        '   <li>{identifier} <tpl if="full_name">({full_name})</tpl></li>',
        '</tpl>',
        '</ul>',
        '<tpl if="canExamine">',
            '<tpl if="parentnode__anonymous == false">',
                '<a class="email" href="mailto:',
                    '<tpl for="candidates">',
                        '{email}<tpl if="xindex &lt; xcount">,</tpl>',
                    '</tpl>',
                '?subject={parentnode__parentnode__parentnode__short_name}.{parentnode__parentnode__short_name}.{parentnode__short_name}',
                '&body={url}',
                '">',
                'Send email</a>',
            '</tpl>',
        '</tpl>'
    )
});
