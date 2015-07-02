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
        var o, obs;


        /*
        params: obsConceptUuid, obsGroupUuid, groupName, isCheckbox, checkboxValue
         */
        function getModel(params) {
            if(params.obsGroupUuid === undefined) {
                obs = {concept:params.obsConceptUuid};
                if(params.isCheckbox) obs.value = params.checkboxValue;

                if(params.obsConceptUuid in vm.model.obs) {
                    vm.model.obs[params.obsConceptUuid].push(obs);
                }
                else {
                    vm.model.obs[params.obsConceptUuid] = [obs];
                }
                o = (vm.model.obs[params.obsConceptUuid]);
                return o[o.length-1];
            }


            if(vm.model.obs[params.obsGroupUuid] === undefined) {
                vm.model.obs[params.obsGroupUuid] = {};
            }
            if(params.groupName in vm.model.obs[params.obsGroupUuid])
                (vm.model.obs[params.obsGroupUuid][params.groupName]).obs.push({concept:params.obsConceptUuid});
            else {
                vm.model.obs[params.obsGroupUuid][params.groupName] =
                {
                    concept: params.obsGroupUuid,
                    obs: [{uuid: params.obsConceptUuid}]
                };
            }
            o = (vm.model.obs[params.obsGroupUuid][params.groupName]).obs;

            return o[o.length-1];

        }
        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the  element


        vm.fields = [
            {
                key: 'checked',
                type: 'checkbox',
                model: getModel({obsConceptUuid:"durationConceptUuid",isCheckbox:true,checkboxValue:'100'}),
                templateOptions: {
                    type: 'checkbox',
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
                        model: getModel({obsConceptUuid:"medicineConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup1"}),
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
                        model: getModel({obsConceptUuid:"doseConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup1"}),
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
                        model: getModel({obsConceptUuid:"medicineConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup2"}),
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
                        model: getModel({obsConceptUuid:"doseConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup2"}),
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