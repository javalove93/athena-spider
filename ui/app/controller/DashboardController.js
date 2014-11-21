/*
 * File: app/controller/DashboardController.js
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

Ext.define('spider.controller.DashboardController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'centerContainer',
            selector: '#centerPanel'
        }
    ],

    init: function(application) {
        var dashBoard = this;

        //Dashboard Menu Constants
        Ext.define('dashboardConstants', {
            singleton: true,
            me : dashBoard,

            renderInterval : null
        });
    },

    renderDashboard: function() {
        var centerContainer = this.getCenterContainer();
        var dashboardPanel = Ext.getCmp("DashboardPanel");

        if (centerContainer.layout.getActiveItem().itemId !== "DashboardPanel") {
            return;
        }

        var cpu = 20,
            memory = 30,
            disk = 10,
            network = 35;

        Ext.getCmp("DashBoardLeftPanel").removeAll();
        Ext.getCmp("DashBoardRightPanel").removeAll();

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

        Ext.getBody().unmask();

    }

});
