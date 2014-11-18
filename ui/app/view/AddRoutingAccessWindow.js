/*
 * File: app/view/AddRoutingAccessWindow.js
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

Ext.define('spider.view.AddRoutingAccessWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.AddRoutingAccessWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    height: 165,
    id: 'AddBondingWindow6',
    width: 350,
    resizable: false,
    title: 'Access-List 등록',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'addRoutingAccessForm',
                    autoScroll: true,
                    layout: 'auto',
                    bodyPadding: 5,
                    header: false,
                    title: 'My Form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelStyle: 'color:#666;font-weight: bold;text-align: right;',
                        labelSeparator: ' :',
                        margin: 10,
                        labelWidth: 100
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 300,
                            fieldLabel: 'Access-List',
                            name: 'access-list',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            width: 300,
                            fieldLabel: 'Export Type',
                            name: 'export',
                            allowBlank: false,
                            editable: false,
                            queryMode: 'local',
                            store: [
                                'bgp',
                                'connected',
                                'kernel',
                                'rip',
                                'static'
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
                                        vmConstants.me.createVmRoutingAccess(button);
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
    }

});