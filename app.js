/**
 * Created by Jonathan on 7/2/2015.
 */

(function() {

    'use strict';

    var app = angular.module('formlyApp', ['formly', 'formlyBootstrap']);
    app.run(function(formlyConfig, formlyValidationMessages) {
        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
    });
})();