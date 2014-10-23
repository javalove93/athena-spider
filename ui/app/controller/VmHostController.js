/*
 * File: app/controller/VmHostController.js
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

Ext.define('spider.controller.VmHostController', {
    extend: 'Ext.app.Controller',

    onListMenuPanelBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {

        var position = e.getXY();
        e.stopEvent();

        vmHostConstants.contextMenu.showAt(position);
    },

    onListMenuPanelItemClick: function(dataview, record, item, index, e, eOpts) {
        if(record.get("icon").indexOf("server.png") >= 0) {
            this.popVMHostInfoWindow(record);
        } else {
            Ext.getCmp('managementBtn').fireEvent('click');
        }
    },

    init: function(application) {
                var vmHostTree = this;

                var vmHostContextMenu = new Ext.menu.Menu({
                    items:
                    [
                    { text: 'NIC 관리',
                        handler: function() {
                            alert('NIC 관리');
                        }
                    },
                    { text: '라우팅',
                        handler: function() {
                            alert('라우팅');
                        }
                    },
                    { text: '파이어월',
                        handler: function() {
                            alert('파이어월');
                        }
                    },
                    { text: 'NAT 관리',
                        handler: function() {
                            alert('NAT 관리');
                        }
                    },
                    {
                        xtype: 'menuseparator'
                    },
                    { text: 'VM 시작/중단',
                        handler: function() {
                            alert('VM 시작/중단');
                        }
                    }
                    ]

                });

                //VM Host Tree Constants
                Ext.define('vmHostConstants', {
                    singleton: true,
                    me : vmHostTree,

                    contextMenu: vmHostContextMenu,
                    selectRecord : null
                });

        this.control({
            "#listMenuPanel": {
                beforeitemcontextmenu: this.onListMenuPanelBeforeItemContextMenu,
                itemclick: this.onListMenuPanelItemClick
            }
        });
    },

    popAddVMHostWindow: function() {
        //VM Host 생성 팝업 호출

        var popWindow = Ext.create("widget.AddVmHostWindow");
        popWindow.show();
    },

    popVMHostInfoWindow: function(record) {
        //VM Host Info 팝업 호출
        vmHostConstants.selectRecord = record;

        var popWindow = Ext.create("widget.VMHostInfoWindow");
        popWindow.show();

        popWindow.down("#VmHostName").setText(record.get("text"));

        var viewVmHostForm = Ext.getCmp("viewVmHostForm");

        viewVmHostForm.getForm().reset();
        viewVmHostForm.getForm().waitMsgTarget = viewVmHostForm.getEl();

        Ext.Ajax.request({
            url: GLOBAL.apiUrlPrefix + 'mon/vmhost/' + record.get("id") + "?detail=true",
            method : 'GET',
            disableCaching : true,
            waitMsg: 'Loading...',
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                if(data.length > 0) {
                    viewVmHostForm.getForm().setValues(data[0]);
                }
            }
        });

    },

    createVMHost: function(button) {
        var addVmHostForm = Ext.getCmp("addVmHostForm");

        if(addVmHostForm.isValid()) {

            var sendData = addVmHostForm.getForm().getFieldValues();

             Ext.Ajax.request({
                 url: GLOBAL.apiUrlPrefix + "vmhost",
                 method: "POST",
                 headers : {
                     "Content-Type" : "application/json"
                 },
                 waitMsg: 'Saving Data...',
                 jsonData: sendData,
                 success: function (response) {

                    alert(response.responseText + ' 등록이 완료되었습니다.');

                    menuConstants.me.renderServerTree();
                    addVmHostForm.up('window').close();

        /*
                    var responseData = Ext.JSON.decode(response.responseText);
                     alert(responseData);

                     if(responseData.success) {

                        Ext.Msg.alert('Success', responseData.msg);

                        Ext.getCmp('almUserGrid').getStore().reload({
                            callback:function(records, operation, success){

                                if(userId){

                                    Ext.each(records, function(record) {

                                        if(record.get("userId") == userId) {
                                            Ext.getCmp('almUserGrid').getSelectionModel().select(record,true,false);

                                            almConstants.selectRow = record;
                                            almConstants.me.selectAlmUserGrid();
                                        }

                                    });
                                }

                            }
                        });

                        addVmHostForm.up('window').close();

                     } else {

                        Ext.Msg.alert('Failure', response.responseText);

                     }
                     */

                },
                failure: function (response) {
                    Ext.Msg.alert('Failure', response.responseText);
                }
             });

        }

        /*
        addVmHostForm.getForm().submit({
            clientValidation: true,
            url: GLOBAL.apiUrlPrefix + "vmhost",
            method : "POST",
            useDefaultXhrHeader: false,
            params: {
                newStatus: 'delivered'
            },
            waitMsg: 'Saving Data...',
            success: function(form, action) {

                alert(Ext.decode(action.result));
                (Ext.Msg.alert('Success', action.result.msg);

                Ext.getCmp('hypervisorGrid').getStore().load({

                    callback:function(records, operation, success){

                        if(hypervisorId) {

                            Ext.each(records, function(record) {

                                if(record.get("hypervisorId") == hypervisorId) {
                                    Ext.getCmp('hypervisorGrid').getSelectionModel().select(record,true,false);

                                    RHEVMConstants.selectRow = record;
                                    RHEVMConstants.me.selectHypervisorGrid();
                                }
                            });
                        }
                    }

                });

                button.up('window').close();
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                    Ext.Msg.alert('Failure', '유효하지 않은 입력값이 존재합니다.');
                    break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                    Ext.Msg.alert('Failure', 'Server communication failed');
                    break;
                    case Ext.form.action.Action.SERVER_INVALID:
                    Ext.Msg.alert('Failure', action.result.msg);
                }
            }
        });

        */
    },

    popAddVmWindow: function() {
        //VM 생성 팝업 호출
        var popWindow = Ext.create("widget.AddVmWindow");
        popWindow.show();

        Ext.getCmp("addVmForm").getForm().findField("vmhostId").setValue(vmHostConstants.selectRecord.get("id"));
        Ext.getCmp("addVmForm").getForm().findField("vmhostName").setValue(vmHostConstants.selectRecord.get("text"));

        var comboStore = Ext.getStore("ComboVmTemplateStore");
        comboStore.load({
            url : GLOBAL.apiUrlPrefix + 'vm/templatelist/' + vmHostConstants.selectRecord.get("id")
        });
    },

    createVM: function(button) {
        var addVmForm = Ext.getCmp("addVmForm");

        if(addVmForm.isValid()) {

            var sendData = addVmForm.getForm().getFieldValues();

             Ext.Ajax.request({
                 url: GLOBAL.apiUrlPrefix + "vm/clone",
                 method: "POST",
                 headers : {
                     "Content-Type" : "application/json"
                 },
                 waitMsg: 'Saving Data...',
                 jsonData: sendData,
                 success: function (response) {

                    alert(response.responseText + ' 등록이 완료되었습니다.');

                    menuConstants.me.renderServerTree();
                    addVmForm.up('window').close();

        /*
                    var responseData = Ext.JSON.decode(response.responseText);
                     alert(responseData);

                     if(responseData.success) {

                        Ext.Msg.alert('Success', responseData.msg);

                        Ext.getCmp('almUserGrid').getStore().reload({
                            callback:function(records, operation, success){

                                if(userId){

                                    Ext.each(records, function(record) {

                                        if(record.get("userId") == userId) {
                                            Ext.getCmp('almUserGrid').getSelectionModel().select(record,true,false);

                                            almConstants.selectRow = record;
                                            almConstants.me.selectAlmUserGrid();
                                        }

                                    });
                                }

                            }
                        });

                        addVmHostForm.up('window').close();

                     } else {

                        Ext.Msg.alert('Failure', response.responseText);

                     }
                     */

                },
                failure: function (response) {
                    Ext.Msg.alert('Failure', response.responseText);
                }
             });

        }

    }

});