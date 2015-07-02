// scripts/MainController.js

(function() {

    'use strict';

    angular
        .module('formlyApp')
        .controller('MainController', MainController);

    function MainController(province) {

        var vm = this;

        // The model object that we reference
        // on the  element in index.html
        vm.model = {obs:{}};
        var o;

        function getModel(obsConceptUuid,obsGroupUuid,groupName) {
            if(obsGroupUuid === undefined) {
                if(obsConceptUuid in vm.model.obs) {
                    vm.model.obs[obsConceptUuid].push({concept:obsConceptUuid});
                }
                else {
                    vm.model.obs[obsConceptUuid] = [{concept:obsConceptUuid}];
                }
                o = (vm.model.obs[obsConceptUuid]);
                //return vm.model.obs[obsConceptUuid][0];
                return o[o.length-1];
            }


            if(vm.model.obs[obsGroupUuid] === undefined) {
                vm.model.obs[obsGroupUuid] = {};
            }
            if(groupName in vm.model.obs[obsGroupUuid])
                (vm.model.obs[obsGroupUuid][groupName]).obs.push({concept:obsConceptUuid});
            else {
                vm.model.obs[obsGroupUuid][groupName] =
                {
                    concept: obsGroupUuid,
                    obs: [{uuid: obsConceptUuid}]
                };
            }
            o = (vm.model.obs[obsGroupUuid][groupName]).obs;

            return o[o.length-1];

        }
        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the  element

        vm.fields = [
            {
                key: 'value',
                type: 'input',
                model: getModel("durationConceptUuid"),
                templateOptions: {
                    type: 'text',
                    label: 'Duration',
                    placeholder: 'Enter duration',
                    required: true
                }
            },

            {
                className: 'obsGroup1',
                fieldGroup: [
                    {
                        key: 'value',
                        model: getModel("medicineConceptUuid","orderUuid","obsGroup1"),
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Medicine',
                            placeholder: 'Enter medicine',
                            required: true
                        }
                    },
                    {
                        key: 'value',
                        type: 'input',
                        model: getModel("doseConceptUuid","orderUuid","obsGroup1"),
                        templateOptions: {
                            type: 'text',
                            label: 'Dose',
                            placeholder: 'Enter dose',
                            required: true
                        }
                    },
                ]
            },

            {
                className: 'obsGroup2',
                fieldGroup: [
                    {
                        key: 'value',
                        model: getModel("medicineConceptUuid","orderUuid","obsGroup2"),
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Medicine',
                            placeholder: 'Enter medicine',
                            required: true
                        }
                    },
                    {
                        key: 'value',
                        type: 'input',
                        model: getModel("doseConceptUuid","orderUuid","obsGroup2"),
                        templateOptions: {
                            type: 'text',
                            label: 'Dose',
                            placeholder: 'Enter dose',
                            required: true
                        }
                    },

                ]
            },
            {
                key: 'province',
                type: 'select',
                templateOptions: {
                    label: 'Province/Territory',
                    // Call our province service to get a list
                    // of provinces and territories
                    options: province.getProvinces()
                },
                //hideExpression: '!model.email'
            }
        ];

    }

})();