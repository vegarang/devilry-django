Ext.define('devilry_usersearch.ManageUsersPanel' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.manageuserspanel',
    cls: 'devilry_usersearch_manageuserspanel',
    requires: [
        'devilry_usersearch.AutocompleteUserWidget'
    ],

    gridCellTpl: [
        '<div class="gridcell">',
        '   <div class="full_name"><strong>{full_name}</strong></div>',
        '   <tpl if="!full_name">',
        '       <strong class="username">{username}</strong>',
        '       <small>(', gettext('Full name missing') ,')</small>',
        '   </tpl>',
        '   <div class="username_and_email">',
        '       <tpl if="full_name">',
        '           <small class="username">{username}</small>',
        '       </tpl>',
        '       <tpl if="email">',
        '          <small class="email">&lt;{email}&gt;</small>',
        '       </tpl>',
        '   </div>',
        '</div>'
    ],

    /**
     * @cfg {Ext.data.Store} store
     * The store where users are added/deleted by this panel.
     */

    constructor: function(config) {
        this.addEvents({
            /**
             * @event
             * Fired when one or more users are added.
             * @param {object} userRecords Array of user records that was added.
             * */
            "usersAdded" : true,

            /**
             * @event
             * Fired when one or more users are removed.
             * @param {object} userRecords Array of user records that was removed.
             * */
            "usersRemoved" : true
        });

        // Copy configured listeners into *this* object so that the base class's
        // constructor will add them.
        this.listeners = config.listeners;

        this.callParent(arguments);
    },

    initComponent: function() {
        var me = this;
        this.gridCellTplCompiled = Ext.create('Ext.XTemplate', this.gridCellTpl);

        Ext.apply(this, {
            frame: false,
            border: 0,
            layout: 'border',
            items: [{
                xtype: 'grid',
                region: 'center',
                hideHeaders: true,
                multiSelect: true,
                store: this.store,
                columns: [{
                    header: 'Col1',  dataIndex: 'id', flex: 1,
                    renderer: function(unused, unused2, userRecord) {
                        return me.rendererGridCell(userRecord);
                    }
                }],
            }, {
                xtype: 'container',
                layout: 'fit',
                region: 'south',
                height: 36,
                padding: 4,
                items: {
                    xtype: 'autocompleteuserwidget',
                    listeners: {
                        scope: this,
                        userSelected: this._onSelectUser
                    }
                }
            }]
        });
        this.callParent(arguments);
    },

    _clearAndfocusAddUserField: function() {
        var field = this.down('autocompleteuserwidget');
        field.clearValue();
        field.focus();
    },

    _onSelectUser: function(combo, userRecord) {
        var username = userRecord.get('username');
        if(this.store.findExact('username', username) == -1) {
            this.addUser(userRecord);
            this._clearAndfocusAddUserField();
        } else {
            Ext.MessageBox.show({
                title: gettext('Already in list'),
                msg: gettext('The selected user is already in the list'),
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR,
                fn: function() {
                    Ext.defer(function() {
                        this._clearAndfocusAddUserField();
                    }, 100, this);
                },
                scope: this
            });
        }
    },

    /**
     * May want to override this in subclasses.
     * */
    rendererGridCell: function(userRecord) {
        return this.gridCellTplCompiled.apply(userRecord.data);
    },

    _hightlightUser: function(userRecord) {
        var index = this.store.findExact('username', userRecord.get('username'));
        this.down('grid').getSelectionModel().select(index);
    },

    onUserAdded: function(userRecord) {
        this._hightlightUser(userRecord);
        this.fireEvent('usersAdded', [userRecord]);
    },

    /** Implement in subclasses */
    addUser: function(userRecord) {
        throw "addUser not implemented";
    }
});
