/*
 * File: app/controller/MenuController.js
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

Ext.define('spider.controller.MenuController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'expandImg',
            selector: '#expandImg'
        },
        {
            ref: 'collapseImg',
            selector: '#collapseImg'
        },
        {
            ref: 'listMenuPanel',
            selector: '#listMenuPanel'
        },
        {
            ref: 'dashboardBtn',
            selector: '#dashboardBtn'
        },
        {
            ref: 'managementBtn',
            selector: '#managementBtn'
        },
        {
            ref: 'monitoringBtn',
            selector: '#monitoringBtn'
        },
        {
            ref: 'userManagementBtn',
            selector: '#userManagementBtn'
        },
        {
            ref: 'centerContainer',
            selector: '#centerPanel'
        },
        {
            ref: 'mytool',
            selector: '#mytool'
        },
        {
            ref: 'menuPanel',
            selector: '#menuPanel'
        }
    ],

    dashboardClick: function(button, e, eOpts) {
        /**
         * Dashboard 메뉴 버튼 클릭 시 수행되는 function
         */
        var centerContainer = this.getCenterContainer(),
            dashboardBtn = this.getDashboardBtn(),
            managementBtn = this.getManagementBtn(),
            monitoringBtn = this.getMonitoringBtn(),
            userManagementBtn = this.getUserManagementBtn(),
            menuPanel = this.getMenuPanel();

        // 현재 선택된 item이 dashboardPanel일 경우 무시한다.
        if (centerContainer.layout.getActiveItem().itemId === "DashboardPanel") {
            dashboardBtn.toggle(true);
            return;
        }

        dashboardBtn.toggle(true);
        managementBtn.toggle(false);
        monitoringBtn.toggle(false);
        userManagementBtn.toggle(false);

        centerContainer.layout.setActiveItem(0);

        dashboardConstants.me.renderDashboard();

        //this.renderDashboard();
        clearInterval(GlobalData.intervalId1);
        clearInterval(GlobalData.intervalId2);
        clearInterval(GlobalData.intervalId3);

    },

    managementClick: function(button, e, eOpts) {
        /**
         * NFV Management 메뉴 버튼 클릭 시 수행되는 function
         */
        this.viewManagementMenu();
    },

    onMonitoringBtnClick: function(button, e, eOpts) {

        /**
         * Sample 메뉴 버튼 클릭 시 수행되는 function
         */
        var centerContainer = this.getCenterContainer(),
            dashboardBtn = this.getDashboardBtn(),
            managementBtn = this.getManagementBtn(),
            monitoringBtn = this.getMonitoringBtn(),
            userManagementBtn = this.getUserManagementBtn(),
            menuPanel = this.getMenuPanel();

        dashboardBtn.toggle(false);
        managementBtn.toggle(false);
        userManagementBtn.toggle(false);
        monitoringBtn.toggle(true);

        centerContainer.layout.setActiveItem(2);
        /*
        Ext.Ajax.request({
            url: 'http://192.168.0.3:8000/render/?width=786&height=508&_salt=1409028000.87&target=vyos.cpu.0.cpu.user.value&from=-2minutes&rawData=true&format=json',
            disableCaching : true,
            success: function(response){

                var columnData = Ext.decode(response.responseText);
                var data = columnData[0];

                // Get the quality field from record
                // Update chart with data
                var chartList = [];
                Ext.each(data.datapoints, function (chartData) {
                    var chartCol = {};
                    chartCol.test = chartData.value;
                    chartCol.cate = chartData.date;
                    chartList.push(chartCol);
                });

                Ext.getCmp('sampleChart').series.getAt(0).setTitle(data.target);

                Ext.getCmp('sampleChart').getStore().loadData(chartList, false);

            }
        });

        clearInterval(GlobalData.intervalId1);
        clearInterval(GlobalData.intervalId2);
        clearInterval(GlobalData.intervalId3);

        */
    },

    onUserManagementBtnBtnClick: function(button, e, eOpts) {

        /**
         * Main View 메뉴 버튼 클릭 시 수행되는 function
         */
        var centerContainer = this.getCenterContainer(),
            dashboardBtn = this.getDashboardBtn(),
            managementBtn = this.getManagementBtn(),
            monitoringBtn = this.getMonitoringBtn(),
            userManagementBtn = this.getUserManagementBtn(),
            menuPanel = this.getMenuPanel();

        // 현재 선택된 item이 dashboardPanel일 경우 무시한다.
        if (centerContainer.layout.getActiveItem().itemId === "UserManagementPanel") {
            button.toggle(true);
            return;
        }

        dashboardBtn.toggle(false);
        managementBtn.toggle(false);
        monitoringBtn.toggle(false);
        userManagementBtn.toggle(true);

        centerContainer.layout.setActiveItem(3);

        Ext.getStore("UserStore").getProxy().url = GLOBAL.apiUrlPrefix + "user/list";
        Ext.getStore("UserStore").load();
    },

    onMytoolClick: function(tool, e, eOpts) {
        this.renderServerTree();
    },

    onMainContainerActivate: function(component, eOpts) {
        var listMenuPanel = this.getListMenuPanel();
        var centerContainer = this.getCenterContainer();

        centerContainer.layout.setActiveItem(0);

        /**
         * Expand-All Image click event를 catch 하도록 설정
         */
        this.getExpandImg().getEl().on('click', function() {
            listMenuPanel.expandAll();
        });

        /**
         * Collapse-All Image click event를 catch 하도록 설정
         */
        this.getCollapseImg().getEl().on('click', function() {
            listMenuPanel.collapseAll();
        });

        this.renderServerTree();

    },

    onLnbLocationComboChange: function(field, newValue, oldValue, eOpts) {
        if(newValue != "") {
            Ext.getCmp("locationLabel").setText(newValue);

            menuConstants.me.renderServerTree();
        }
    },

    onLaunch: function() {

        //this.renderDashboard();
        /*

        Ext.select(".dashboard-graph-panel").on('resize', function(panel, w, h) {
            alert('Panel resized to ' + w + 'x' + h);
        });


        */
        /*
        Ext.Ajax.request({
            url: 'http://192.168.0.3:8000/render/?width=786&height=508&_salt=1409028000.87&target=vyos.cpu.0.cpu.user.value&from=-2minutes&rawData=true&format=json',
            disableCaching : true,
            success: function(response){

                var columnData = Ext.decode(response.responseText);
                var data = columnData[0];

                // Get the quality field from record
                // Update chart with data
                var chartList = [];
                Ext.each(data.datapoints, function (chartData) {
                    var chartCol = {};
                    chartCol.test = chartData.value;
                    chartCol.cate = chartData.date;
                    chartList.push(chartCol);
                });

                //Ext.getCmp('sampleStore').series.getAt(0).setTitle(data.target);

                Ext.getStore('SampleStore').loadData(chartList, false);
            }
        });
        */
    },

    renderServerTree: function() {
        var center = Ext.getCmp("lnbLocationCombo").getValue();
        var treeData = [];

        Ext.Ajax.request({
            url: GLOBAL.apiUrlPrefix + 'mon/vmhost/_all',
            disableCaching : true,
            waitMsg: 'Loading...',
            success: function(response){

                var hostDatas = Ext.decode(response.responseText);

                menuConstants.hostRecord = hostDatas;

                if(hostDatas != null) {

                    var vmDatas = null;

                    Ext.Ajax.request({
                        url: GLOBAL.apiUrlPrefix + 'mon/vm/_all?detail=true',
                        disableCaching : true,
                        success: function(vmResponse){

                            vmDatas = Ext.decode(vmResponse.responseText);

                            menuConstants.vmRecord = vmDatas;

                            Ext.each(hostDatas, function(host, index) {

                                if(host.location == center) {

                                    host.id = host._id;
                                    host.text = host.name;
                                    host.icon = 'resources/images/icons/server.png';
                                    host.type = 'vmhost';

                                    if(index == 0) {
                                        host.expanded = true;
                                    }

                                    var vmList = [];
                                    Ext.each(vmDatas, function(vm) {

                                        if(host._id == vm.vmhost) {

                                            vm.id = vm._id;
                                            vm.text = vm.vmname;
                                            vm.icon = 'resources/images/icons/host.png';
                                            vm.type = 'vm';
                                            vm.leaf = true;

                                            if(vm.interim === true) {
                                                vm.cls = "node-red";
                                            }

                                            vmList.push(vm);
                                        }
                                    });

                                    if(vmList.length > 0) {

                                        host.leaf = false;
                                        host.children = vmList;

                                    } else {

                                        host.leaf = true;

                                    }

                                    treeData.push(host);

                                }

                            });

                            var treeStore = Ext.create('Ext.data.TreeStore', {
                                    model: 'spider.model.VmHostModel',
                                    root: {
                                        expanded: true,
                                        text: 'Server List',
                                        icon : '',
                                        type : 'root',
                                        children: treeData
                                    }
                                });

                            Ext.getCmp("listMenuPanel").bindStore(treeStore);

                            dashboardConstants.me.renderDashboard();
                            menuConstants.me.renderVmStatus();

                        }
                    });
                }

            }
        });


    },

    init: function(application) {
                var menu = this;

                //Dashboard Menu Constants
                Ext.define('menuConstants', {
                    singleton: true,
                    me : menu,

                    hostRecord : null,
                    vmRecord : null,
                });

        this.control({
            "#dashboardBtn": {
                click: this.dashboardClick
            },
            "#managementBtn": {
                click: this.managementClick
            },
            "#monitoringBtn": {
                click: this.onMonitoringBtnClick
            },
            "#userManagementBtn": {
                click: this.onUserManagementBtnBtnClick
            },
            "#mytool": {
                click: this.onMytoolClick
            },
            "#mainContainer": {
                activate: this.onMainContainerActivate
            },
            "#lnbLocationCombo": {
                change: this.onLnbLocationComboChange
            }
        });
    },

    viewManagementMenu: function(record, tabIndex) {
        /**
         * NFV Management 메뉴 버튼 클릭 시 수행되는 function
         */
        var centerContainer = this.getCenterContainer(),
            dashboardBtn = this.getDashboardBtn(),
            managementBtn = this.getManagementBtn(),
            monitoringBtn = this.getMonitoringBtn(),
            userManagementBtn = this.getUserManagementBtn(),
            menuPanel = this.getMenuPanel();

        // 현재 선택된 item이 managementPanel일 경우 무시한다.
        if (centerContainer.layout.getActiveItem().itemId !== "VmManagementPanel") {

            managementBtn.toggle(true);
            dashboardBtn.toggle(false);
            monitoringBtn.toggle(false);
            userManagementBtn.toggle(false);

            centerContainer.layout.setActiveItem(1);

            if(record == null) {

                Ext.each(Ext.getCmp("listMenuPanel").store.getRootNode().childNodes, function(rec, idx){

                    Ext.each(rec.get("children"), function(cRecord, cIdx) {

                        record = cRecord;

                        return false;

                    });

                    if(record != null) {

                        var vmRecord = new spider.model.VmHostModel({
                            id		: record.id,
                            text		: record.text,
                            vmhostName	: record.vmhostName,
                            vmhost 		: record.vmhost
                        });

                        vmConstants.me.initVmManagement(vmRecord, tabIndex);

                        return false;
                    }

                });

            } else {
                vmConstants.me.initVmManagement(record, tabIndex);
            }


        } else {

            managementBtn.toggle(true);

            var vmDetailTab = Ext.getCmp("networkInstanceTabPanel");

            if(record.get("id") !== vmConstants.selectVmId) {

                vmConstants.me.initVmManagement(record, tabIndex);

            } else if(tabIndex == null && vmDetailTab.getActiveTab() !== vmDetailTab.items.getAt(0)) {

                vmConstants.me.initVmManagement(record, 0);

            } else if(tabIndex != null && vmDetailTab.getActiveTab() !== vmDetailTab.items.getAt(tabIndex)) {

                vmConstants.me.initVmManagement(record, tabIndex);
            }

        }



            //Ext.getCmp('hostMgmtBtn').fireEvent('click');
            //Ext.getCmp('utilizationBtn').fireEvent('click');

            //if (Ext.getCmp('hostGridPanel').selModel.selected.length === 0) {
            //    Ext.getCmp('hostGridPanel').selModel.select(0);
            //}
    },

    renderVmStatus: function() {
        /*
        var treePanel = Ext.getCmp("listMenuPanel");

        Ext.Ajax.request({
            url: GLOBAL.apiUrlPrefix + 'mon/vm/all/status ',
            method : "GET",
            disableCaching : true,
            success: function(response){

                if(response.status == 200) {

                    var datas = Ext.decode(response.responseText);

                    Ext.each(datas, function(host) {

                        var hostNodes = treePanel.store.getRootNode().childNodes;

                        Ext.each(hostNodes, function(record, idx){

                            if(host.vmhost === record.get("text")) {

                                var vmNodes = hostNodes[idx].childNodes;

                                Ext.each(vmNodes, function(vmRecord, vIdx){

                                    var cls = ""

                                    Ext.each(host.vms, function(vm){

                                    });

                                });


                            }

                        });

                    });

                }
            }
        });


        Ext.each(Ext.getCmp("listMenuPanel").store.getRootNode().childNodes, function(record, idx){




            var nodePanel = Ext.getCmp("DashBoardNodePanel").cloneConfig({itemId : "DashBoardNodePanel"+idx});

            nodePanel.down('#VmHostStat').setText('<center><img src="resources/images/icons/status_01.png" width="36" height="36" border="0"></center>', false);
            nodePanel.down('#VmHostName').setText(record.get('text'));

            cpu = Math.min(100, Math.max(+cpu + (Math.random() - 0.5), 0));
            memory = Math.min(100, Math.max(+memory + (Math.random() - 0.5) * 2, 0));
            disk = Math.min(100, Math.max(+disk + (Math.random() - 0.5) / 2, 0));
            network = Math.min(100, Math.max(+network + (Math.random() - 0.5) / 2, 0));

            nodePanel.down('#cpuBar').updateProgress(cpu / 100, cpu.toFixed(2) + "%");
            nodePanel.down('#memoryBar').updateProgress(memory / 100, memory.toFixed(2) + "%");
            nodePanel.down('#diskBar').updateProgress(disk / 100, disk.toFixed(2) + "%");
            nodePanel.down('#networkBar').updateProgress(network / 100, network.toFixed(2) + "%");

            //VM 정보
            var vms = nodePanel.down('#vmNamePanel').items.items;
            var vmCpus = nodePanel.down('#vmCpuPanel').items.items;
            var vmMemorys = nodePanel.down('#vmMemPanel').items.items;
            var vmDisks = nodePanel.down('#vmNetPanel').items.items;

            Ext.each(record.get("children"), function(cRecord, cIdx) {

                if(cIdx < 4) {
                    vms[cIdx+1].setText(cRecord.text);
                    vmCpus[cIdx+1].setText(Math.min(100, Math.max(+cpu + (Math.random() - 0.5), 0)).toFixed(0) + "%");
                    vmMemorys[cIdx+1].setText(Math.min(100, Math.max(+memory + (Math.random() - 0.5) * 2, 0)).toFixed(0) + "%");
                    vmDisks[cIdx+1].setText(Math.min(100, Math.max(+disk + (Math.random() - 0.5) / 2, 0)).toFixed(0) + "%");
                }
            });

            //node add
            if(idx%2 === 0) {
                Ext.getCmp("DashBoardLeftPanel").add(nodePanel);
            } else {
                Ext.getCmp("DashBoardRightPanel").add(nodePanel);
            }

            nodePanel.show();
            nodePanel.body.on('click', function(e) {
                vmHostConstants.me.popVMHostInfoWindow(record);
            });

        });

        dashboardPanel.setLoading(false);



        // Real-Time Chart를 위해 주기적으로 상태정보 조회 호출하도록 설정한다.
        setTimeout(function() {

            dashboardConstants.me.renderDashboard();

        }, 10000);
        */
    }

});
