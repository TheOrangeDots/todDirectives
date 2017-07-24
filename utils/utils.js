angular
    .module('todUtils', ['servoy'])
    .directive('todFlyOut', ['$timeout', function ($timeout) {
        var keyCodes = Object.freeze({
            RETURN: 13,
            ESC: 27,
            PAGEUP: 33,
            PAGEDOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        });
        return {
            restrict: 'A',
            scope: {
                targetSelector: '@todFlyOut'
            },
            link: function ($scope, $element, $attrs, ctrl) {
                function isPrintableCharacter(str) {
                    return str.length === 1 && str.match(/\S/);
                }
                //CHECKME how to mark params as optional in TypeScript?
                function focusNextSibbling(reverse, byLetter) {
                    var currentNode = document.activeElement.parentNode;
                    var currentNodeLeft = currentNode.getBoundingClientRect().left;
                    var sibblings = Array.from(currentNode.parentNode.children); //CHECKME Array.from doesn't seem to get cross-compiled to ES5
                    if (reverse) {
                        sibblings.reverse();
                    }
                    var currentNodeIndex = sibblings.indexOf(currentNode);
                    var orderedSibblings = sibblings.slice(currentNodeIndex + 1).concat(sibblings.slice(0, currentNodeIndex + 1));
                    //CHECKME text vs. textContent
                    for (var _i = 0, orderedSibblings_1 = orderedSibblings; _i < orderedSibblings_1.length; _i++) {
                        var sibbling = orderedSibblings_1[_i];
                        if (sibbling === currentNode || byLetter ? sibbling.firstElementChild.text.trim().toLowerCase().startsWith(byLetter) : sibbling.getBoundingClientRect().left === currentNodeLeft) {
                            sibbling.firstElementChild.focus();
                            break;
                        }
                    }
                    return currentNode.firsElementChild === document.activeElement;
                }
                function init() {
                    var flyOutPanel = $scope.flyOutPanel = $($scope.targetSelector);
                    if (flyOutPanel.length !== 1) {
                        return;
                    }
                    //set target invisible by default
                    flyOutPanel.addClass('flyOutHidden');
                    //register keyboard listener
                    flyOutPanel.keydown(function (event) {
                        //let children = flyOutPanel[0].children
                        var handled = true;
                        if (isPrintableCharacter(event.key)) {
                            focusNextSibbling(false, event.key.toLowerCase());
                        }
                        switch (event.keyCode) {
                            case keyCodes.RETURN:
                                document.activeElement.click();
                                ctrl.close();
                                break;
                            case keyCodes.ESC:
                                ctrl.close();
                                break;
                            case keyCodes.UP:
                                focusNextSibbling(true);
                                break;
                            case keyCodes.DOWN:
                                focusNextSibbling();
                                break;
                            case keyCodes.LEFT:
                                if (document.activeElement === flyOutPanel[0].firstElementChild.firstElementChild) {
                                    flyOutPanel[0].lastElementChild.firstElementChild.focus();
                                }
                                else {
                                    document.activeElement.parentNode.previousElementSibling.firstElementChild.focus();
                                }
                                break;
                            case keyCodes.RIGHT:
                                if (document.activeElement === flyOutPanel[0].lastElementChild.firstElementChild) {
                                    flyOutPanel[0].firstElementChild.firstElementChild.focus();
                                }
                                else {
                                    document.activeElement.parentNode.nextElementSibling.firstElementChild.focus();
                                }
                                break;
                            case keyCodes.HOME:
                            case keyCodes.PAGEUP:
                                flyOutPanel[0].firstElementChild.firstElementChild.focus();
                                break;
                            case keyCodes.END:
                            case keyCodes.PAGEDOWN:
                                flyOutPanel[0].lastElementChild.firstElementChild.focus();
                                break;
                            default:
                                handled = focusNextSibbling(false, event.key);
                        }
                        if (handled) {
                            event.stopPropagation();
                            event.preventDefault();
                        }
                    });
                    //add auto-hide logic
                    flyOutPanel.focusout(function (event) {
                        if (flyOutPanel.hasClass('flyOutHidden')) {
                            return;
                        }
                        var shouldHide = !event.relatedTarget;
                        if (!shouldHide) {
                            var parent_1 = event.relatedTarget.parentNode;
                            while (parent_1 && parent_1 !== flyOutPanel[0]) {
                                parent_1 = parent_1.parentNode;
                            }
                            if (parent_1 !== flyOutPanel[0]) {
                                shouldHide = true;
                            }
                        }
                        if (shouldHide && event.relatedTarget !== $element[0]) {
                            flyOutPanel.addClass('flyOutHidden');
                            if (event.relatedTarget === flyOutPanel[0]) {
                                $element.focus();
                            }
                        }
                        return false;
                    });
                }
                //Using a timeout in order to be able to resolve the targetSelector
                //W.o. timeout, the logic if executed when the component is not yet inserted into the DOM
                $timeout(init, 0);
                //add click handler
                $element.click(function (event) {
                    /*
                     * Challenge
                     * clicking button when flyOut is open triggers focusout, cause the button gets focus.
                     * due to this the flyout hides (correct, but then the onClick opens it again
                     */
                    if (!$scope.flyOutPanel || !$scope.flyOutPanel[0].childElementCount) {
                        return;
                    }
                    $scope.flyOutPanel.toggleClass('flyOutHidden');
                    if (!$scope.flyOutPanel.hasClass('flyOutHidden')) {
                        $scope.flyOutPanel[0].firstElementChild.firstElementChild.focus();
                    }
                });
            },
            controller: function ($scope, $element, $attrs) {
                this.close = function () {
                    $scope.flyOutPanel.focus();
                };
            }
        };
    }]);
//# sourceMappingURL=utils.js.map