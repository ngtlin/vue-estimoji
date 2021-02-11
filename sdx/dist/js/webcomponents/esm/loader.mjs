import { a as patchEsm, b as bootstrapLazy } from './index-28757bf2.js';

const defineCustomElements = (win, options) => patchEsm().then(() => {
  return bootstrapLazy([["sdx-itunes-autocomplete",[[1,"sdx-itunes-autocomplete",{"artists":[32],"loading":[32]}]]],["sdx-numeric-stepper",[[1,"sdx-numeric-stepper",{"label":[1],"srHint":[1,"sr-hint"],"min":[2],"max":[2],"value":[2],"step":[2],"changeCallback":[1,"change-callback"],"valid":[4],"validationMessage":[1,"validation-message"],"disabled":[4],"valueState":[32],"inputElValue":[32]}]]],["sdx-search",[[1,"sdx-search",{"value":[1025],"placeholder":[1],"srHint":[1,"sr-hint"],"srHintForButton":[1,"sr-hint-for-button"],"searchSubmitCallback":[1,"search-submit-callback"],"changeCallback":[1,"change-callback"],"valueChangeCallback":[1,"value-change-callback"]},[[9,"resize","onWindowResizeThrottled"]]]]],["sdx-color-picker",[[1,"sdx-color-picker",{"colors":[1],"changeCallback":[1,"change-callback"],"multiple":[4],"colorsState":[32]}]]],["sdx-option-picker",[[1,"sdx-option-picker",{"options":[1],"changeCallback":[1,"change-callback"],"multiple":[4],"optionsState":[32]}]]],["sdx-expand-and-collapse",[[1,"sdx-expand-and-collapse",{"expandLabel":[1,"expand-label"],"collapseLabel":[1,"collapse-label"],"isExpanded":[32]}]]],["sdx-show-more",[[1,"sdx-show-more",{"incrementBy":[2,"increment-by"],"initialItems":[2,"initial-items"],"totalItems":[2,"total-items"],"fromLabel":[1,"from-label"],"moreLabel":[1,"more-label"],"incrementCallback":[1,"increment-callback"],"buttonTheme":[1,"button-theme"],"currentlyDisplayedItems":[32]}]]],["sdx-tabs",[[1,"sdx-tabs",{"changeCallback":[1,"change-callback"],"tabsItemElsSorted":[32],"selectedTabsItemEl":[32],"showLeftArrow":[32],"showRightArrow":[32]},[[9,"resize","onWindowResizeThrottled"]]]]],["sdx-pie-chart",[[1,"sdx-pie-chart",{"data":[1],"value":[1],"description":[1],"legendPosition":[1,"legend-position"],"size":[1],"backgroundTheme":[1,"background-theme"],"dataState":[32]}]]],["sdx-scroll-to-top",[[1,"sdx-scroll-to-top",{"position":[1],"demo":[4],"visible":[32]},[[9,"scroll","onWindowScroll"],[1,"touchstart","onTouchStart"],[0,"click","onClick"]]]]],["sdx-progress-full",[[1,"sdx-progress-full",{"step":[2],"stepsLabel":[1,"steps-label"],"animated":[4],"stepChangeCallback":[1,"step-change-callback"],"activeStep":[32],"previousActiveStep":[32],"nextStep":[64],"previousStep":[64],"getActiveStep":[64],"setActiveStep":[64]},[[9,"resize","onWindowResizeThrottled"]]]]],["sdx-accordion-item-section",[[1,"sdx-accordion-item-section"]]],["sdx-button-group",[[1,"sdx-button-group",{"layout":[1]}]]],["sdx-dummy",[[1,"sdx-dummy"]]],["sdx-menu-flyout",[[1,"sdx-menu-flyout",{"direction":[1],"closeOnClick":[4,"close-on-click"],"displayChangeCallback":[1,"display-change-callback"],"display":[32],"directionState":[32],"contentEl":[32],"toggleEl":[32],"arrowEls":[32],"toggle":[64],"open":[64],"close":[64]},[[0,"click","onClick"],[1,"touchend","onClick"],[8,"click","onWindowClick"],[9,"touchend","onWindowClick"]]]]],["sdx-menu-flyout-content",[[1,"sdx-menu-flyout-content",{"directionState":[32]}]]],["sdx-menu-flyout-cta",[[1,"sdx-menu-flyout-cta",{"size":[1],"directionState":[32]}]]],["sdx-menu-flyout-list",[[1,"sdx-menu-flyout-list"]]],["sdx-menu-flyout-list-item",[[1,"sdx-menu-flyout-list-item",{"selectable":[4],"href":[1],"hreflang":[1],"disabled":[4],"directionState":[32]},[[2,"click","onClick"]]]]],["sdx-menu-flyout-toggle",[[1,"sdx-menu-flyout-toggle",{"display":[32],"toggle":[32]},[[0,"click","onClick"],[0,"keydown","handleKeyDown"]]]]],["sdx-price",[[1,"sdx-price",{"amount":[2],"period":[1],"size":[2],"srHint":[1,"sr-hint"]}]]],["sdx-progress-full-step",[[1,"sdx-progress-full-step",{"value":[2],"status":[1],"position":[1],"stepClickCallback":[1,"step-click-callback"]}]]],["sdx-ribbon",[[1,"sdx-ribbon",{"label":[1],"design":[1],"position":[1],"size":[1]}]]],["sdx-select-optgroup",[[1,"sdx-select-optgroup",{"name":[1],"direction":[32],"filter":[32],"filterFunction":[32]}]]],["sdx-sticker-circle",[[1,"sdx-sticker-circle",{"size":[2],"contentWidth":[2,"content-width"],"colorClass":[1,"color-class"],"bgColorClass":[1,"bg-color-class"],"top":[2],"bottom":[2],"left":[2],"right":[2],"srHint":[1,"sr-hint"]},[[9,"resize","onWindowResizeThrottled"]]]]],["sdx-tabs-item",[[1,"sdx-tabs-item",{"label":[1],"selected":[4],"disabled":[4],"iconName":[1,"icon-name"],"selectedTabsItemEl":[32]}]]],["sdx-animation_2",[[1,"sdx-flip",{"direction":[1]}],[1,"sdx-animation",{"animationName":[1,"animation-name"],"animationBeginCallback":[16]}]]],["sdx-icon_2",[[1,"sdx-validation-message",{"valid":[4],"validationMessage":[1,"validation-message"]}],[1,"sdx-icon",{"iconName":[1,"icon-name"],"colorClass":[1,"color-class"],"size":[2],"flip":[1],"hidden":[4],"srHint":[1,"sr-hint"]}]]],["sdx-select",[[1,"sdx-select",{"placeholder":[1],"multiple":[4],"label":[1],"srHint":[1,"sr-hint"],"disabled":[4],"loading":[4],"keyboardBehavior":[1,"keyboard-behavior"],"filterable":[4],"maxHeight":[8,"max-height"],"selectCallback":[1,"select-callback"],"changeCallback":[1,"change-callback"],"focusCallback":[1,"focus-callback"],"blurCallback":[1,"blur-callback"],"noMatchesFoundLabel":[1,"no-matches-found-label"],"backgroundTheme":[1,"background-theme"],"value":[1040],"name":[1],"filterFunction":[1,"filter-function"],"valid":[4],"validationMessage":[1,"validation-message"],"required":[4],"animated":[4],"selectionSorted":[32],"selectionBatch":[32],"animationDuration":[32],"optionElsSorted":[32],"optgroupEls":[32],"filter":[32],"display":[32],"foundMatches":[32],"focussed":[32],"filterInputElValue":[32],"getSelection":[64],"toggle":[64],"open":[64],"close":[64]},[[2,"focus","onFocus"],[1,"mousedown","onMouseDown"],[1,"mouseup","onMouseUp"],[2,"blur","onBlur"],[8,"click","onWindowClick"],[9,"touchend","onWindowClick"],[8,"keydown","onKeyDown"]]]]],["sdx-input-group",[[1,"sdx-input-group",{"type":[1],"theme":[1],"changeCallback":[1,"change-callback"],"name":[1],"inline":[4],"label":[1],"value":[1040],"valid":[4],"validationMessage":[1,"validation-message"],"required":[4],"typeState":[32],"themeState":[32],"nameState":[32],"groupLabel":[32],"selectedInputItemEls":[32],"selectNextInputItemElFrom":[32],"selectPreviousInputItemElFrom":[32],"inputItemElsSorted":[32],"getSelection":[64]}]]],["sdx-arrow",[[1,"sdx-arrow",{"direction":[1],"hideArrow":[4,"hide-arrow"],"hideBackground":[4,"hide-background"],"animationBeginCallback":[16]}]]],["sdx-accordion-arrow",[[1,"sdx-accordion-arrow",{"direction":[1],"hover":[4],"arrowPosition":[1,"arrow-position"]}]]],["sdx-input-item",[[1,"sdx-input-item",{"type":[1],"iconName":[1,"icon-name"],"iconSize":[2,"icon-size"],"checked":[1028],"value":[8],"disabled":[4],"changeCallback":[1,"change-callback"],"name":[1],"disableFocus":[4,"disable-focus"],"valid":[4],"validationMessage":[1,"validation-message"],"required":[4],"hideCheckedIcon":[4,"hide-checked-icon"],"labelStyle":[16],"typeState":[32],"themeState":[32],"nameState":[32],"inline":[32],"selectedInputItemEls":[32],"groupLabel":[32]},[[0,"click","onClick"],[0,"keydown","handleKeyDown"]]]]],["sdx-button_3",[[1,"sdx-input",{"srHint":[1,"sr-hint"],"hitEnterCallback":[1,"hit-enter-callback"],"changeCallback":[1,"change-callback"],"inputCallback":[1,"input-callback"],"focusCallback":[1,"focus-callback"],"blurCallback":[1,"blur-callback"],"keyDownCallback":[1,"key-down-callback"],"placeholder":[1],"type":[1],"value":[1025],"step":[2],"min":[2],"max":[2],"selectTextOnFocus":[4,"select-text-on-focus"],"inputStyle":[16],"autocomplete":[1],"readonly":[4],"disabled":[4],"editable":[4],"label":[1],"maxlength":[2],"flatpickrOptions":[8,"flatpickr-options"],"name":[1],"valid":[4],"validationMessage":[1,"validation-message"],"required":[4],"hasInputElFocus":[32]},[[2,"focus","onFocus"],[2,"blur","onBlur"]]],[1,"sdx-button",{"theme":[1],"background":[1],"disabled":[4],"href":[1],"target":[1],"label":[1],"iconName":[1,"icon-name"],"iconSize":[2,"icon-size"],"srHint":[1,"sr-hint"],"ariaExpandedOnButton":[4,"aria-expanded-on-button"],"type":[1],"valid":[4]},[[1,"touchstart","onTouchStart"]]],[1,"sdx-text-truncate"]]],["sdx-loading-spinner_2",[[1,"sdx-select-option",{"value":[8],"selected":[4],"disabled":[4],"placeholder":[4],"selectionSorted":[32],"multiple":[32],"direction":[32],"select":[32],"filter":[32],"filterFunction":[32]},[[0,"click","onClick"]]],[1,"sdx-loading-spinner",{"size":[1],"srHint":[1,"sr-hint"]}]]],["sdx-accordion_4",[[1,"sdx-accordion-item-header",{"arrowPosition":[1,"arrow-position"],"expand":[4],"buttonStyle":[16],"toggle":[16],"closeItem":[64],"openItem":[64]},[[0,"click","onClick"],[1,"mouseover","onMouseOver"],[1,"mouseout","onMouseOut"]]],[1,"sdx-accordion",{"arrowPosition":[1,"arrow-position"],"keepOpen":[4,"keep-open"],"componentStyle":[16],"close":[64],"closeAll":[64],"toggle":[64],"open":[64],"openAll":[64]}],[1,"sdx-accordion-item",{"open":[4]}],[1,"sdx-accordion-item-body",{"arrowPosition":[1,"arrow-position"],"componentStyle":[16],"toggle":[64]}]]]], options);
});

export { defineCustomElements };
