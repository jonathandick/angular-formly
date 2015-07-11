'use strict';
var MainController = function() {
    var vm = this;
    vm.getFirstNonLoaded = function(){};
    vm.getModelForObsConcept = function(){};
    vm.getModelForObsGroup = function(){};
    vm.getModel = function(){};
    vm.addFieldsForExtraModels = function(){};
    vm.restResultToFormModel = function(){};
    vm.formModelToRestPayload = function(){};
    vm.repeatField = function(){};
    vm.submit = function(){};

    vm.model.obs = {
        conceptUuid: [{uuid:obsUuid, concept:conceptUuid, value:value}],
        groupUuid:
        {
            obsGroup1: {
                concept: obsGroupConceptUuid,
                obs: {
                    conceptUuid: [{uuid: obsUuid, concept: conceptUuid, value: value}]
                }
            },
            //...
            obsGroupN:
            {
                concept: obsGroupConceptUuid,
                obs: {
                    conceptUuid: [{uuid: obsUuid, concept: conceptUuid, value: value}]
                }

            }
        }
    }
}