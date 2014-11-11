/*
 * File: app/view/AddBondingWindow.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('spider.view.AddBondingWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.AddBondingWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    height: 220,
    id: 'AddBondingWindow',
    width: 500,
    resizable: false,
    title: 'Bonding 등록',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    height: 180,
                    id: 'addBondingForm',
                    itemId: 'addBondingForm',
                    bodyPadding: 15,
                    header: false,
                    title: 'My Form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 120
                    },
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'bondingNICGroup',
                            fieldLabel: '',
                            listeners: {
                                render: {
                                    fn: me.onBondingNICGroupRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            padding: '0 0 0 5',
                            fieldLabel: 'Bond Group',
                            name: 'bondid',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            padding: '0 0 0 5',
                            fieldLabel: 'IP 주소',
                            name: 'address',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            padding: '0 0 0 5',
                            fieldLabel: 'Mode',
                            name: 'mode',
                            allowBlank: false,
                            editable: false,
                            store: [
                                '802.3ad',
                                'active-backup',
                                'adaptive-load-balance',
                                'round-robin',
                                'transmit-load-balance',
                                'xor-hash',
                                'broadcast'
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        vmConstants.me.createVMBonding(button);
                                    },
                                    padding: '3 8 3 8',
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        GLOBAL.me.closeWindow(button);
                                    },
                                    padding: '3 8 3 8',
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBondingNICGroupRender: function(component, eOpts) {
        vmConstants.me.renderNicCheckbox(component, Ext.getCmp("addBondingForm").getEl());
    }

});