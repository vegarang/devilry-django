Ext.define('devilry.statistics.sidebarplugin.qualifiesforexam.All', {
    extend: 'devilry.statistics.sidebarplugin.qualifiesforexam.FilterBase',
    layout: 'fit',

    initComponent: function() {
        Ext.apply(this, {
            items: this.saveButton
        });
        this.callParent(arguments);
    },

    filter: function(student) {
        var passes = 0;
        Ext.each(this.loader.assignment_ids, function(assignment_id, index) {
            var group = student.get('groupsByAssignmentId')[assignment_id];
            if(group && group.is_passing_grade) {
                passes ++;
            }
        }, this);
        return true;
    }
});
