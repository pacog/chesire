(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('MidiBankSelectorController', MidiBankSelectorController);

    function MidiBankSelectorController(CurrentMidiOutput) {
        var vm = this;

        init();

        vm.nextProgram = nextProgram;
        vm.prevProgram = prevProgram;
        vm.prevBank = prevBank;
        vm.nextBank = nextBank;

        function init() {
            vm.bank = 0;
            vm.program = 0;
        }

        function sendBankAndProgram() {
            CurrentMidiOutput.getCurrentOutput().setBank(vm.bank);
            // CurrentMidiOutput.getCurrentOutput().setProgram(vm.program);
        }

        function prevProgram() {
            vm.program--;
            normalizeProgram();
            sendBankAndProgram();
        }

        function nextProgram() {
            vm.program++;
            normalizeProgram();
            sendBankAndProgram();
        }

        function normalizeProgram() {
            vm.program = Math.min(vm.program, 127);
            vm.program = Math.max(vm.program, 0);
        }

        function prevBank() {
            vm.bank--;
            normalizeBank();
            sendBankAndProgram();
        }

        function nextBank() {
            vm.bank++;
            normalizeBank();
            sendBankAndProgram();
        }

        function normalizeBank() {
            vm.bank = Math.min(vm.bank, 127);
            vm.bank = Math.max(vm.bank, 0);
        }
    }

})();