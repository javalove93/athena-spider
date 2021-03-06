/*
 * File: app/controller/HeaderController.js
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

Ext.define('spider.controller.HeaderController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'logoImg',
            selector: '#logoImg'
        },
        {
            ref: 'logoutLabel',
            selector: '#logoutLabel'
        }
    ],

    onLaunch: function() {
        /**
         * CI Logo Image click event를 catch 하도록 설정
         */
        this.getLogoImg().getEl().on('click', function() {
            window.open('http://www.osci.kr', '_blank');
        });

        // var me = this;
        // this.getLogoutLabel().getEl().on('mouseover', function() {
        //     console.log(me.getLogoutLabel().style);
        // });
    }

});
