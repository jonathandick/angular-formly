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
        vm.model =
        {
            obs:
            {
                "durationConceptUuid":[{"concept":"durationConceptUuid",value:"100"}]
            }
        };

        vm.model = {
            "obs":
            {
                "durationConceptUuid":
                    [
                        {uuid:"12345", "concept":"durationConceptUuid","value":"100"}
                    ],
                "orderUuid":
                {
                    "obsGroup1":
                    {
                        "concept":"orderUuid",
                        "obs": {
                            medicineConceptUuid: [{uuid:"1987293", "concept": "medicineConceptUuid", "value": "quinineUuid"}],
                            doseConceptUuid: [{uuid:"3298098", "concept": "doseConceptUuid", "value": "500mg"}]
                        }
                    }
                }
            }
        };
        var o, obs;


        function getLast(array) {
            return array[array.length-1];
        }

        function getFirstNonLoaded(obs) {
            var result;
            _.each(obs,function(e) {
                if(e.loaded === undefined) {
                    result = e;
                }
            });
            return result;
        }

        /*
        params: obsConceptUuid, obsGroupUuid, groupName, isCheckbox, checkboxValue
         */
        function getModel(params) {
            obs = {concept:params.obsConceptUuid};
            if(params.isCheckbox) obs.value = params.checkboxValue;

            if(params.obsGroupUuid === undefined) {
                if(params.obsConceptUuid in vm.model.obs) {
                    var e = getLast(vm.model.obs[params.obsConceptUuid]);
                    if(e.loaded)
                        vm.model.obs[params.obsConceptUuid].push(obs);
                    else {
                        e.loaded = true;
                        e.initialValue = e.value;
                        return e;
                    }
                }
                else {
                    vm.model.obs[params.obsConceptUuid] = [obs];
                }
                return getLast((vm.model.obs[params.obsConceptUuid]));
            }


            if(vm.model.obs[params.obsGroupUuid] === undefined) {
                vm.model.obs[params.obsGroupUuid] = {};
            }

            if(params.groupName in vm.model.obs[params.obsGroupUuid]) {

                obs = vm.model.obs[params.obsGroupUuid][params.groupName].obs;
                e = getFirstNonLoaded(obs[params.obsConceptUuid]);
                if(!e)
                    (vm.model.obs[params.obsGroupUuid][params.groupName]).obs.push({concept: params.obsConceptUuid});
                else {
                    e.loaded = true;
                    e.initialValue = e.value;
                    return e;
                }

            }
            else {
                vm.model.obs[params.obsGroupUuid][params.groupName] =
                {
                    concept: params.obsGroupUuid,
                    obs: [{concept: params.obsConceptUuid}]
                };
            }
            return getLast((vm.model.obs[params.obsGroupUuid][params.groupName]).obs);
        }
        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the  element


        vm.fields = [
            {
                key: 'value',
                type: 'input',
                model: getModel({obsConceptUuid:"durationConceptUuid"}),
                templateOptions: {
                    type: 'text',
                    label: 'Duration',
                    placeholder: 'Enter duration',
                    required: true
                }
            },

            {
                key: 'value',
                type: 'input',
                model: getModel({obsConceptUuid:"durationConceptUuid"}),
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
                        model: getModel({obsConceptUuid:"medicineConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup1"}),
                        type: 'select',
                        templateOptions: {
                            label: 'Medicine',
                            placeholder: 'Enter medicine',
                            required: true,
                            options:
                                [
                                    {name:"",value:""},
                                    {name:"quinine",value:"quinineUuid"},
                                    {name:"mefloquine",value:"mefloquineUuid"}
                                ]


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
        ];

    }

})();