/*
 * File: app/view/AddRoutingWindow.js
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

Ext.define('spider.view.AddRoutingWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.AddRoutingWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldContainer',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    height: 200,
    id: 'AddBondingWindow4',
    width: 700,
    resizable: false,
    title: 'Routing 등록',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'addRoutingStaticForm',
                    autoScroll: true,
                    bodyPadding: 10,
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
                                    fieldLabel: 'Route IP/Subnet',
                                    name: 'routing_subnet',
                                    allowBlank: false,
                                    emptyText: '0.0.0.0/0'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    flex: 0.4,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Blackhole',
                                    labelWidth: 135,
                                    name: 'routing_blackhole',
                                    listeners: {
                                        change: {
                                            fn: me.onCheckboxfieldChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    flex: 0.6,
                                    margin: '0 0 0 20',
                                    fieldLabel: 'Disable',
                                    labelWidth: 90,
                                    name: 'routing_disable',
                                    listeners: {
                                        change: {
                                            fn: me.onCheckboxfieldChange1,
                                            scope: me
                                        }
                                    }
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
                                    xtype: 'combobox',
                                    flex: 1,
                                    fieldLabel: 'Type',
                                    name: 'routing_type',
                                    allowBlank: false,
                                    editable: false,
                                    store: [
                                        'route',
                                        'interface-route'
                                    ],
                                    listeners: {
                                        change: {
                                            fn: me.onComboboxChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    fieldLabel: 'Next Hop',
                                    name: 'routing_next_hop1',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    hidden: true,
                                    fieldLabel: 'Next Hop',
                                    name: 'routing_next_hop2',
                                    allowBlank: false,
                                    editable: false,
                                    displayField: 'ethName',
                                    queryMode: 'local',
                                    valueField: 'ethName'
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
                                    xtype: 'numberfield',
                                    flex: 1,
                                    fieldLabel: 'Table',
                                    name: 'routing_table',
                                    maxValue: 200,
                                    minValue: 1
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    fieldLabel: 'Distance',
                                    name: 'routing_distance',
                                    maxValue: 255,
                                    minValue: 1
                                }
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
                                        vmConstants.me.createVmRouting(button);
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

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        var form = field.up('form').getForm();

        if(newValue == true){

            form.findField("routing_next_hop1").setDisabled(true);
            form.findField("routing_next_hop2").setDisabled(true);

            form.findField("routing_disable").setValue(false);
            form.findField("routing_disable").setReadOnly(true);

        } else {

            form.findField("routing_next_hop1").setDisabled(false);
            form.findField("routing_next_hop2").setDisabled(false);

            form.findField("routing_disable").setReadOnly(false);

        }
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        var form = field.up('form').getForm();

        if(newValue == true){

            form.findField("routing_blackhole").setValue(false);
            form.findField("routing_blackhole").setReadOnly(true);

        } else {

            form.findField("routing_blackhole").setReadOnly(false);

        }

        if(form.findField("routing_type").getValue() == "interface-route") {

            form.findField("routing_blackhole").setReadOnly(true);

        }
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        var form = field.up('form').getForm();
        if(newValue == "route") {

            form.findField("routing_next_hop1").show();
            form.findField("routing_next_hop2").hide();

            form.findField("routing_next_hop1").setDisabled(false);
            form.findField("routing_next_hop2").setDisabled(true);

            form.findField("routing_blackhole").setReadOnly(false);

        } else if(newValue == "interface-route") {

            form.findField("routing_next_hop1").hide();
            form.findField("routing_next_hop2").show();

            form.findField("routing_next_hop1").setDisabled(true);
            form.findField("routing_next_hop2").setDisabled(false);

            form.findField("routing_blackhole").setValue(false);
            form.findField("routing_blackhole").setReadOnly(true);

        }

        if(form.findField("routing_blackhole").getValue == true){

            form.findField("routing_next_hop1").setDisabled(true);
            form.findField("routing_next_hop2").setDisabled(true);

        }
    }

});