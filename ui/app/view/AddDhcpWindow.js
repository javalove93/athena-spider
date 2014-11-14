/*
 * File: app/view/AddDhcpWindow.js
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

Ext.define('spider.view.AddDhcpWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.AddDhcpWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Spacer',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.grid.View',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing'
    ],

    height: 455,
    id: 'AddBondingWindow3',
    width: 700,
    resizable: false,
    title: 'Shared Network 등록',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'addDhcpForm',
                    autoScroll: true,
                    bodyPadding: 20,
                    header: false,
                    title: 'My Form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelStyle: 'color:#666;font-weight: bold;text-align: right;',
                        labelSeparator: ' :',
                        margin: '0 10 0 0',
                        labelWidth: 120
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            flex: '1',
                            height: 35,
                            fieldLabel: 'Label',
                            hideLabel: true,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 20 0 0',
                                    fieldLabel: 'Shared Network',
                                    name: 'shared_network_name',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: '1',
                            height: 35,
                            fieldLabel: 'Label',
                            hideLabel: true,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    fieldLabel: 'IP/Subnet',
                                    name: 'subnet_ipv4net',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'checkboxgroup',
                                    flex: 1,
                                    width: 400,
                                    fieldLabel: 'Options',
                                    layout: {
                                        type: 'checkboxgroup',
                                        autoFlex: false
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            name: 'authoritative',
                                            boxLabel: 'Authoritative'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            name: 'disable',
                                            boxLabel: 'Disable'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: '1',
                            height: 35,
                            fieldLabel: 'Label',
                            hideLabel: true,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    fieldLabel: 'Start IP Address',
                                    name: 'start_ip',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    fieldLabel: 'Stop IP Address',
                                    name: 'stop_ip',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: '1',
                            height: 35,
                            fieldLabel: 'Label',
                            hideLabel: true,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    fieldLabel: 'Default Router',
                                    name: 'default_router'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    fieldLabel: 'DNS Server',
                                    name: 'dns_server'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: '1',
                            height: 35,
                            fieldLabel: 'Label',
                            hideLabel: true,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 20 0 0',
                                    fieldLabel: 'Domain Name',
                                    name: 'domain_name'
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            height: 150,
                            id: 'addDhcpMappingGrid',
                            margin: '5 10 10 10',
                            overflowY: 'auto',
                            header: false,
                            title: 'My Grid Panel',
                            columnLines: true,
                            forceFit: true,
                            store: 'addDhcpMappingStore',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    height: 35,
                                    padding: 0,
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Static Mapping',
                                            labelWidth: 110
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                Ext.getStore("addDhcpMappingStore").insert(0, {});
                                            },
                                            padding: '3 8 3 8',
                                            text: '추가'
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                overflowY: 'auto'
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'map_name',
                                    text: 'Mapping Name',
                                    editor: {
                                        xtype: 'textfield',
                                        allowBlank: false
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'map_ip',
                                    text: 'IP Address',
                                    editor: {
                                        xtype: 'textfield',
                                        allowBlank: false
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'map_mac',
                                    text: 'Mac Address',
                                    editor: {
                                        xtype: 'textfield',
                                        allowBlank: false
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    text: 'Delete',
                                    maxWidth: 80,
                                    minWidth: 80,
                                    style: 'text-align:center;',
                                    align: 'center',
                                    hideable: false,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                view.getStore().removeAt(rowIndex);
                                            },
                                            icon: 'resources/images/icons/delete.png'
                                        }
                                    ]
                                }
                            ],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
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
                                        vmConstants.me.createVMDhcp(button);
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