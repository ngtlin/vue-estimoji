# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

## [2.11.2] - 2020-07-31
### Fixed
- sdx-select: autocomplete examples "Scripts" and "iTunes", see SDX-69

## [2.11.1] - 2020-07-30
### Fixed
- Footer: only the first column of menu items were visible on Safari, see SDX-708
- Footer: horizontal alignment of menu items, see SDX-737

## [2.11.0] - 2020-07-21
### Added
- Added various descriptions and recommendations under rules in the designer part, see SDX-512

### Changed
- Updated all designer sections, see SDX-512
- Changed recommended text width from 700px to 666px to be adjusted with the columns used in AEM, see SDX-512

### Fixed
- sdx-input: textarea had an incorrect height when used within a smaller container, see SDX-709
- sdx-input: textarea lost focus when validation-message is set without a label, see SDX-722
- sdx-numeric-stepper: ensure "min" and "max", see SDX-690
- sdx-select: ensure "disabled" when "multiple", see SDX-725

## [2.10.0] - 2020-07-17
### Added
- Icon for drag & drop, see SDX-716
- Icon for anti-crime, see SDX-717
- Created new page for Date Picker docs (https://sdx.swisscom.com/components_-_picker_(date).html), see SDX-642

### Changed
- Internal: upgraded to Stencil 1.12.7, see SDX-69

### Fixed
- sdx-tabs, sdx-progress-full: fixed shadow on Safari, see SDX-69
- sdx-select, sdx-input-group: allow options/input-items without values, see SDX-676

## [2.9.1] - 2020-07-07
### Changed
- Moved "Status" to correct context ("Tables"), see SDX-513

### Fixed
- sdx-select: preserve user value when in autocomplete mode, see SDX-706
- sdx-expand-and-collapse: clicking on the body should not close the element, see SDX-702
- sdx-tabs: scroll to the initially selected tab if it's not visible, see SDX-705

## [2.9.0] - 2020-06-24
### Improved Angular integration
Consumers have reported that the integration of SDX Web Components into Angular is sometimes cumbersome using techniques like `ngModel` or `*ngFor`.
With this release, the compatibility improves and the docs now show [how to create an Angular Directive for SDX](https://sdx.swisscom.com/#webcomponents-in-angular) to make code like this work:

```
<sdx-select [(ngModel)]="selection">
  <sdx-select-option *ngFor="let option of options" [value]="option">{{option}}</sdx-select-option>
</sdx-select>
```

Please read the [updated docs](https://sdx.swisscom.com/#webcomponents-in-angular).
See SDX-676.

## [2.8.0] - 2020-06-16
### Changed
In order to ensure our site meets the accessibility requirements for our visually impaired customers and
colleagues (such as better legibility and colour-contrast), the following adjustments were done, see SDX-43:

 - Adjustments to the interaction colours: blue, green and orange.
 - Optimisation of font-weights within buttons, tabs and badges.
 - Minor scaling-up of badge sizes for better readability of content.
 - Contextual links are now marked by default with an underline, in order to be immediately identifiable.

If you experience any problems, please contact us.

### Fixed
- sdx-tabs: Divider brightness, see SDX-685

## [2.7.1] - 2020-06-15
### Fixed
- Cards: applied hover to cards with navigation link, see SDX-359
- sdx-button: fixed vertical alignment of the label for theme-transparent buttons, see SDX-664
- Footer: Missing items after resizing, see SDX-691

## [2.7.0] - 2020-06-03
### Added
- All form components (such as input and checkbox) now have a :hover, see SDX-679
- Added sdx-option-picker and sdx-color-picker, see SDX-617

### Fixed
- sdx-search: execute change-callback when clearing the input field using the "x" button, see SDX-683
- Styling of sdx-button for type "reset" and "submit" in Firefox and Safari, SDX-684
- Removed extra padding around sdx-menu-flyout-toggle in some browsers, see SDX-692

### Changed
- Adapted current supported browser versions, see SDX-471

## [2.6.2] - 2020-05-26
### Fixed
- Accordions: the class `is-open` wasn't removed when closed, see SDX-688

## [2.6.1] - 2020-05-25
### Fixed
- Removed extra TEXT in sdx-sticker-circle on IE11, SDX-686

## [2.6.0] - 2020-05-15
### Container checkboxes / radio buttons
After a lot of consumer feedback about the limits of the containers min-width and max-width (160px, 280px) we have decided to remove those, see SDX-655.
That means, from now on the consumer is responsible for the layout:

- When displayed `inline`, the consumer needs to set the width explicitly (fitting the individual content), or just add `flex: 1;` for equal sizing (in combination with `min-width`, if wrapping is wanted).
- When displayed in a grid (e.g. stacked), the elements use 100% of the parents width, ensuring nice fitting within forms, etc.

This also fixed the resize bug on mobile, see SDX-654.

### Added
- Added sdx-expand-and-collapse to let the user open and close text sections, see SDX-601

### Fixed
- Navigation: Font size of Level 2 dropdown menu items, see SDX-675
- Navigation: Layout of Level 2 dropdown menu items on Edge and IE11, see SDX-680
- sdx-menu-flyout: Menus or tooltips were sometimes initially open, see SDX-667

## [2.5.1] - 2020-05-07
### Added
- Mentioned `data-init="auto"` in the docs: [JavaScript Component usage](https://sdx.swisscom.com/#javascript-component-usage), see SDX-487

### Changed
- To be more consistent, all SDX components use the normal arrow (chevron) instead of the flat arrow: sdx-accordion, sdx-select, sdx-tabs, sdx-progress-full, see SDX-669
- The gift (present) icon has been optimized (removed horizontal ribbon), see SDX-525

### Fixed
- Navigation: Reduced font size of Level 1 menu items, see SDX-670

## [2.5.0] - 2020-04-20
### Removed Modernizr
Removed Modernizr because it was causing bugs using SSR with Angular 9, see SDX-662.
If your app requires Modernizr, please add it. SDX was using Modernizr 3.9.1 with this config:

`"options": [ "setClasses"],
"feature-detects": [ "hiddenscroll", "touchevents" ]`

### Changed
- sdx-accordion: `arrow-position="none"` is not supported anymore (please remove if present); all accordions should have a chevron in order to indicate that it's openable, see SDX-606

### Fixed
- sdx-accordion: fixed animations, see SDX-606
- sdx-select: removed empty space when filterable, see SDX-630
- sdx-select: when "multiple", long option texts were not truncated with "...", see SDX-651
- Table: fixed broken sort in example "Responsive Table", see SDX-650
- Slider: "Free Slider" does not throw when reaching the left most end using drag&drop, see SDX-653
- sdx-input-group: make sure the change-callback does not wrap the values in a promise

## [2.4.0] - 2020-04-09
### Added
- sdx-select: max-height support for relative unit "vh", see SDX-630

### Fixed
- Navigation: Menu items disappeared on Safari, see SDX-648
- Ensure there are no errors if child components are used without the corresponding parent component (e.g. sdx-select-option is used outside sdx-select), this removes errors in Angular 9 like "this.select is not a function", see SDX-646

## [2.3.1] - 2020-03-25
### Git installation
- Please install SDX only using Artifactory (bin.swisscom.com or artifactory.swisscom.com), the possibility to install SDX using Git will be removed in upcoming releases, since it causes problems regularly, see SDX-69

### Fixed
- Web Components should hide their slotted content before they're hydrated, see SDX-624
- sdx-input type="date": dates can be entered using the keyboard again, see SDX-638
- sdx-input type="date": month and year styling, see SDX-625
- fixed button styling for type="reset" and type="submit" in Firefox and Safari, see SDX-621

### Changed
- sdx-tabs: extended documentation: added rules in designers section and made example more complete in overview, see SDX-645

## [2.3.0] - 2020-03-16
### Added
- buttons: added type="button" to sdx-scroll-to-top, sdx-progress-full-step, sdx-menu-flyout-toggle, sdx-accordion-item-header. sdx-button: added type="button", see SDX-621
- sdx-input: added key-down-callback(e: Event), see SDX-634

### Fixed
- sdx-input: wrong input behavior on MS Edge when used with type="textarea", see SDX-629 and SDX-633

## [2.2.0] - 2020-03-10
### Added
- sdx-tabs: added change callback, see SDX-49

### Fixed
- Re-added minified js bundles to package, see SDX-69

## [2.1.1] - 2020-03-06
### Fixed
- sdx-input-item: fixed spacing in theme "container" and when embedded in other components, see SDX-332
- Numbered lists: Re-added spacing between items, see SDX-612

## [2.1.0] - 2020-03-04
### Added
- sdx-input-item: implemented theme "container" (please use instead of "Segmented Controls" - which are often misunderstood by end users and are therefore now deprecated), see SDX-332

### Fixed
- Last p element shouldn't have margin, see SDX-393

## [2.0.0] - 2020-03-04
SDX 2.0 is here!
See entries below (2.0.0-beta.0 - 2.0.0-beta.9).

### Added
- Icon for QR code, see SDX-579

## [2.0.0-beta.9] - 2020-03-02
### Fixed
- Fixed navigation in styleguide pages.

## [2.0.0-beta.8] - 2020-03-02
### Fixed
- Corrected env (part 2/2)

## [2.0.0-beta.7] - 2020-03-02
### Fixed
- Corrected env (part 1/2)

## [2.0.0-beta.6] - 2020-03-02
### Fixed
- Reset NODE_ENV=production (part 2/2)

## [2.0.0-beta.5] - 2020-03-02
### Fixed
- Reset NODE_ENV=production (part 1/2)

## [2.0.0-beta.4] - 2020-03-02
### Changed
- Typography: Redefined bottom whitespace and font styles for headlines (h4 - h6), see overview-table designer section "Font weight" and examples, see SDX-393

### Fixed
- sdx-select: setting the `value` attribute too early had no effect, see SDX-586
- sdx-accordion: reverted animation fix in order to fix dynamic content adjustment when open, see SDX-616

## [2.0.0-beta.3] - 2020-02-28
### Fixed
- Tabs: Visual issues when an older version of SDX exists on the same page (part 2/2), see SDX-49

## [2.0.0-beta.2] - 2020-02-28
### Fixed
- sdx-select: jump-to-option now works with umlauts and other special characters, see SDX-609
- sdx-select: click on chevron does not set focus, see SDX-613
- Tabs: Visual issues when an older version of SDX exists on the same page (part 1/2), see SDX-49

## [2.0.0-beta.1] - 2020-02-24
### Fixed
- Corrected typings path to prevent this error:
`ERROR in dist/js/webcomponents/loader/index.d.ts:2:15 - error TS2307: Cannot find module '../types/components'.`

## [2.0.0-beta.0] - 2020-02-19
This is a beta release - we need your feedback!

Even a "green light" feedback like "everything works fine in our Angular 8+ app" helps us a lot. The faster we receive feedback, the sooner we can release it as stable. Thanks a lot!
support.sdx@swisscom.com

### Upgraded to Stencil One
We have upgraded to Stencil One (the compiler that builds the SDX Web Components), see SDX-543.
Stencil One promises significant performance improvements, especially when using lots of Web Components on a single page.
But it also brings some *breaking* changes:

- All Web Components public methods, such as `$0.getSelection()`, are now async and return a promise. Example:
	`$0.getSelection() // instead of ["banana", "apple"] it now returns Promise{<resolved>: ["banana", "apple"]}`.
	To read the value of the promise, use `$0.getSelection().then(selection => console.log(selection))`.
- If you load SDX directly using a script tag, you need to change the import src to:
	`<script src="node_modules/@swisscom/sdx/dist/js/webcomponents/webcomponents/webcomponents.esm.js" type="module"></script>`
	`<script src="node_modules/@swisscom/sdx/dist/js/webcomponents/webcomponents.js" nomodule=""></script>`

We're really sorry for this inconvenience!

### Created webcomponents.css for apps that use only SDX Web Components
As the number of SDX Web Components grows (e.g. sdx-input, sdx-select, sdx-button, ...), more and more apps do not need the heavy `sdx.js` and `sdx.css` anymore (~400 KB gzipped).
Instead, the new `webcomponents.min.css` can be included (~8 KB gzipped), which contains only the basic SDX styles (fonts, grids, lists, ...).
This will drastically improve loading and rendering time. Please note that this requires to add a class to the app's root node, e.g.: `<body class="sdx">...</body>`, see SDX-475

### Added
- sdx-tabs: A Web Component with animations that automatically makes tabs scrollable on smaller screens, see SDX-49

### Changed
- Tabs have a new design (but it's still recommended to upgrade to the sdx-tabs Web Component for responsiveness and animation features), see SDX-49
- Split `base/_core.scss` into `base/_body.scss`, `base/_layout.scss`, see SDX-475

## [1.32.0] - 2020-02-06
### Added
- Contribution guide "How to contribute to SDX", see SDX-587

### Changed
- Renamed category "Dev Utilities" to "Developers", see SDX-587
- Updated tooltip documentation, see SDX-591
- sdx-input, sdx-input-item: consistent asterisk placement for required fields, see SDX-592

### Fixed
- sdx-input of type date: the date picker is now keyboard accessible, see SDX-461
- sdx-input: last character was missing in traditional form submit, see SDX-69
- sdx-accordion: fixed opening/closing animation, see SDX-598

## [1.31.4] - 2020-01-16
### Fixed
- sdx-input: cursor jumps on character modification, see SDX-582
- sdx-input-item: added focus style for radio buttons, see SDX-577
- Modal: click events were leaking to parent elements in the background, see SDX-572

## [1.31.3] - 2020-01-08
### Fixed
- Footer: Fix for missing items in Footer when resizing from mobile to desktop view, see SDX-565
- sdx-input-item: removed role on input item because not interpreted by VoiceOver on mobile devices, see SDX-573
- Switch: fixed (de-)select with screen-reader (VoiceOver) on mobile devices, see SDX-571
- sdx-select: on complicated pages sometimes all web components stopped working, see SDX-581

## [1.31.2] - 2019-12-11
### Fixed
- sdx-select: remove placeholder from selectable options when selection is required, see SDX-560
- sdx-numeric-stepper: change-callback, see SDX-566

## [1.31.1] - 2019-12-05
### Fixed
- sdx-search: sr-hints are now read. Removed aria-hidden for search button and addded id to the label, see SDX-559
- lists: corrected spacings to 8px for ul-lists, and ol-lists grow to the left now, see SDX-554
- npm audit: fixed 1212 reported vulnerabilities (4 critical, 1178 high), see SDX-504

## [1.31.0] - 2019-11-22
### Added
- sdx-numeric-stepper: new web component for Numeric Stepper, see SDX-390

### Fixed
- Incorrect import statement in mixins/\_typography.scss, see SDX-558
- sdx-select: validation message styling / showing twice, see SDX-557

## [1.30.0] - 2019-11-18
### Added
- sdx-search now has a "value" property (e.g. for setting the initial value)
- lists can now be used with SDX icons, see SDX-496
- sdx-button and sdx-button-group: added new web components for buttons, see SDX-444
- sdx-input, see SDX-239 and SDX-225
- added classes for margin/padding-left/right, see SDX-550

### Changed
- sdx-menu-flyout: due to a lot of feedback does now open on click again and not on hover anymore, see SDX-551
- unified hover behavior and styles, see SDX-540
- unified validation: now for all input fields web components, see SDX-347

### Fixed
- Revised Foundation/Grid documentation page - simplified and updated examples and explanation of how the grid works, see SDX-367
- sdx-input: make sure the sdx-input does not have its own state (instead, the "value" property is the single source of truth), see SDX-390
- checkbox label: fixed non-breaking long texts in IE, see SDX-528
- sdx-select: disabled input could be edited after tab key, see SDX-549
- fixed endless-loop on arrow-down in autocomplete (sdx-select), see SDX-547
- width of radiobutton containers, see SDX-532
- sdx-search: no more overlapping of clear-icon and input value when text is getting too long, see SDX-527

## [1.29.0] - 2019-09-26
### Added
- sdx-pie-chart: the pie chart is now a web component, see SDX-484
- sdx-pie-chart: added a size="small" attribute which renders a "mini pie chart", see SDX-484

### Changed
- SDX website improvements: smooth scroll to sections; implemented jump to type declaration, see SDX-515
- Accessibility: added "cursor: not-allowed" to disabled components, see SDX-499
- MDD (Mega Drop Down): added a shadow on the bottom, see SDX-519

### Fixed
- Some components didn't render correctly due to the parent's box-sizing, see SDX-523
- Range: allow ranges with only one value (it will render a disabled range instead of crashing), see SDX-516

### Changed
- Activated global font-smoothing, see SDX-69

## [1.28.0] - 2019-08-27
### Added
- Back-to-top Web Component: when scrolling down, a button appears that brings you back to the top, see SDX-335
- sdx-loading-spinner: added as web component, see SDX-502

### Fixed
- Icon font: compatibility when multiple SDX versions are present on a website, see SDX-509

## [1.27.0] - 2019-08-15
### Added
- 200+ new icons! And also upgraded the old ones, see SDX-429
- Tooltip Web Component: sdx-menu-flyout can now also be used as an inline text tooltip, see SDX-333
- sdx-select: added "max-height" attribute if the dropdown should have a specific height in px, see SDX-491
- sdx-menu-flyout: added "display-change-callback" to get notified whether the Flyout has been opened or closed, see SDX-488

### Changed
- sdx-menu-flyout: the flyout now opens towards the opposite direction if there's not enough space (on both axes), see SDX-333
- sdx-menu-flyout: the flyout stretches itself accross the whole screen when there's not enough space, e.g. on mobiles, see SDX-333
- sdx-menu-flyout: ...now also opens on :hover, see SDX-333

### Fixed
- sdx-select: spinner did not appear on certain server configurations - even though "loading" was set, see SDX-491

## [1.26.1] - 2019-07-18
### Fixed
- Fixed bar-chart-horizontal to allow indicator to show 100% width when full (instead of just 99.8%), see SDX-478

### Changed
- sdx-select: block scrolling when open (just like the modal), see SDX-397

## [1.26.0] - 2019-07-12
### Added
- New Web Component `<sdx-sticker-circle />`, see SDX-391
- Design Kit Update (added Stickers and Stepper components)

### Fixed
- sdx-icon: color-class, see SDX-481

### Changed
- improved sdx-accordion: removed heading-tag and made component more accessible, see SDX-462
- improved switch/toggle documentation for accessibility, see SDX-480

## [1.25.0] - 2019-07-03
### Added
- sdx-menu-flyout: added disabled items functionality, see SDX-470

### Fixed
- Another case where Datepicker with "altInput" label was misplaced, see SDX-439
- fixed rollover color of secondary buttons, see SDX-473
- fixed some web component deployment issue, see SDX-451

### Changed
- updated images on Colours documentation and provided Accent Colour Tints, see SDX-309
- updated search documentation with accessibility label for sdx-search component
- removed section navigations on Dev Utilities, Show More and Accessibility subpages in documentation, see SDX-354

## [1.24.1] - 2019-06-19
### Fixed
- Issues with web fonts, see SDX-472

### Changed
- SASS: global variable `$font-path` was reverted to `../fonts`

## [1.24.0] - 2019-06-19
### Added
- Autocomplete Web Component (use the sdx-select with the keyboard-behavior="autocomplete" attribute), see SDX-190 and SDX-337
- sdx-search is now accessible, see SDX-322

### Fixed
- IE11 and Safari reported 404 not found errors when requesting the sdx-icon font file, see SDX-416
- Toolbar icons now have the :hover style also for :focus, see SDX-468

### Changed
- sdx-accordion: possible to simply set attributes like `keep-open` or `open` instead of `keep-open="true"` or `open="true"`, see SDX-459
- sdx-select now sets its tabindex="0" itself. If you have a tabindex="0" on your sdx-select already, please make sure to remove it - otherwise your sdx-select will be focussed twice.
- SASS: changed global variable `$font-path` from `../fonts` to `/sdx/fonts` to make sure fonts are always downloaded from the same source. If you use the `$font-path` variable anywhere in your code (which is not recommended), you might need to change it.

## [1.23.1] - 2019-06-13
### Fixed
- Web Component build issues

## [1.23.0] - 2019-06-11
### Added
- upgraded design kit

### Fixed
- Fixed Side Navigation closing with touch, see SDX-457
- Fixed Accordion error on page unload on SDX Documentation, see SDX-410

### Changed
- Refreshed colours: **the SDX Colours have been given an update!** If you have hard-coded colours (which you shouldn't) they need to be removed everywhere and replaced by the colour variable names. Please make sure to update. Also, some colours have been removed from the palette: the accent colours _Petrol_ and _Apple_, which have been replaced by the already existing _Turquoise_, as well as the former _Swisscom Purple_, which has been mapped to the already existing _Iris_. **Please have a look at the [SDX Colours Documentation](https://sdx.swisscom.ch/foundation_-_colours.html) and update your project accordingly!**, see SDX-309

## [1.22.3] - 2019-06-05
### Added
- Utilities: Margin and Padding can be applied per breakpoint and up, see SDX-377

## [1.22.2] - 2019-05-06
### Added
- sdx-select: added a "value" property that can be used for both reading and setting the value (just like a native HTML select), see SDX-442

### Fixed
- Transparent buttons: improved :hover state, see SDX-222
- sdx-select: ensure scrolling in Chrome when sdx-select is inside a vertically scrollable container, see SDX-453
- sdx-select: submits value when used within a traditional form submit, see SDX-415
- sdx-select: improvements for cross browser focussing using tab, see SDX-372

## [1.22.1] - 2019-04-25
### Fixed
- Bar Chart (vertical) is causing a scrollbar, see SDX-417
- sdx-select can be used on a dark background (using the new "background-theme" attribute), see SDX-419
- Datepicker can be used with "altInput" without breaking the label, see SDX-439
- Modal with overflowing content did not scroll on iOS anymore, see SDX-449

### Changed
- sdx-select: animated arrow on open/close and removed "Minimal mode" and "Tabs as dropdown", those shouldn't be used anymore in Swisscom apps, see SDX-447

## [1.22.0] - 2019-04-18
### Added
- sdx-input-group / sdx-input-element: Web Components for checkboxes and radios, see SDX-237 and SDX-260
- sdx-select: Added attribute change-callback (which is the same as select-callback) to enable abstraction layers, as change-callback also exists in other components

### Fixed
- Added helper classes margin-top-0, margin-bottom-0, padding-top-0 and padding-bottom-0 (they were documented but didn't actually exist), see SDX-431 and SDX-446
- Fixed link to "Accessibility checklist", see SDX-440

### Changed
- Angular docs: recommend to use EventEmitter instead of this.app.tick() to propagate changes, as this.app.tick() is an overkill for large apps

## [1.21.0] - 2019-04-04
### Info
- sdx.swisscom.ch had almost 1'000 page views during the last week!
- since the SDX keynote and the introduction of the "Report a bug"-button last month, we have received a lot of feature requests and bug reports from you. Thank you for your valuable feedback and the resulting improvements of SDX!

### Added
- sdx-menu-flyout: implemented Flyout CTA as web component to enable any HTML content within a flyout, see SDX-365
- sdx-show-more: introduced attribute "initial-items" in case you want to start from a specific number, see SDX-437
- Our card components are now AA accessible, see SDX-389
- When sharing links (e.g. in MS Teams), the SDX icon and its description appears, see SDX-418
- Removed "input type='button'" and "input type='submit'" from examples. From an accessibility and semantic point of view, we recommend to use the "button" tag instead, see SDX-426

### Fixed
- Upgraded Flatpickr to 4.5.7 in order to fix a problem on IE11, see SDX-69
- Fixed typography resizer on https://sdx.swisscom.ch/foundation_-_typography.html, see SDX-399
- sdx-select: wrong disabled color in multiselect, see SDX-420
- Fixed offensive white space character on https://digitalexperience.swisscom.ch/, see SDX-434

### Changed
- Renamed "Toggle Buttons" to "Segmented Controls" as toggle buttons are actually something else (don't worry, we're backwards compatible and you don't have to change anything), see SDX-424
- Horizontal Bar Chart: when working without precision, ".00" will not be appended, see SDX-230

## [1.20.2] - 2019-03-21
### Added
- Texts should be easy to read and therefore not be wider than 700px. Created a helper class called "text-recommended-max-width" that will wrap the content after 700px (https://sdx.swisscom.ch/dev_utilities_-_text.html), see SDX-392

### Fixed
- Date Picker is using too much space (because it isn't hidden correctly), see SDX-362
- Footer resize: items gone missing, see SDX-370
- Pie chart: allow label to be displayed in "Empty state" by adding the new attribute "data-always-show-legend", see SDX-236
- sdx-select: Filter should be deleted after selecting the already-selected option, see SDX-401
- sdx-progress-full: fixed font family for numbers, see SDX-406
- Vertical Toolbar: strangely aligned icons, see SDX-411

## [1.20.1] - 2019-03-14
### Added
- Too complicated to report a bug? Meet our new "Report a Bug"-button on the SDX website's header!

### Fixed
- Modal: Don't scroll to the top when closing, see SDX-398
- sdx-select: fixed loader position, see, SDX-404
- sdx-select filterable: disabled autocomplete, reflect changes on placeholder, see SDX-409
- Fixed various focus issues on macOS / Safari (e.g. input fields, toggle buttons or tabs)

## [1.20.0] - 2019-03-06
### Added
- Accessibility: We're working on making SDX W3C AA-compliant (https://www.w3.org/WAI/WCAG2AA-Conformance). Many components are now accessible (AA-compliance) and they're marked with a label "Accessible". More components will follow in the future - until all our components are accessible. For more info on how to make your app accessible, see our guide: https://sdx.swisscom.ch/foundation_-_accessibility.html, see SDX-259

### Changed
- Updated Sketch files (Design Kit), see https://sdx.swisscom.ch/#design

## [1.19.1] - 2019-02-28
### Fixed
- Make sure border-box is set for all Web Components, see SDX-394
- Fixed Tabs example on IE11, see SDX-319
- sdx-select: Various bugfixes for filterable, see SDX-388
- Downgraded polyfills for Angular compatibilty on IE11

## [1.19.0] - 2019-02-18
### Added
- CSS classes for setting the background color, for example <code>bg-horizon</code>, see SDX-369
- Introduced sdx-icon, a web component for displaying icons: https://sdx.swisscom.ch/foundation_-_icons.html#develop, see SDX-296
- Explained how to make Angular detect changes within web component callbacks: https://sdx.swisscom.ch/#webcomponents, see SDX-384

### Fixed
- Removed Sass deprecation warnings on building .css files, see SDX-254
- Email input placeholder changes color in IE, see SDX-375
- sdx-select: Scrollbar on IE11/Edge when having a long list of options, see SDX-379
- sdx-select: Trim option content on filtering, see SDX-381
- sdx-search: Fast typing "swallows" characters, see SDX-382

## [1.18.0] - 2019-02-11
### Added
- SDX has gotten a favicon! :-), see SDX-334
- SDX is now additionally hosted on a versioned CDN for times when NPM is not an option, e.g. https://sdx.scsstatic.ch/v1.17.2/, see SDX-26
- SDX styleguide website: highlight active category, see SDX-264
- sdx-show-more: attribute to set secondary button theme, see SDX-374

### Changed
- Completely removed gsap from SDX. Treeshaking is now possible throughout the whole SDX. All animations are now internally done with anime.js, see SDX-234
- Optimized message cards for bigger content, see SDX-339
- Redesigned sdx-search, see SDX-366

### Fixed
- sdx-select: it is now possible to change the selection programmatically during runtime, e.g. [selected]="this.selected === true", see SDX-357
- Fixed example for autocomplete, see SDX-356
- Eliminated security vulnerabilities, see SDX-364

## [1.17.2] - 2019-02-04
### Changed
- Removed code which was copied from Stack Overflow, see SDX-371

## [1.17.1] - 2019-01-24
### Added
- Added `dist/css/fonts-only.min.css` which makes it possible to include only the web fonts if needed, see SDX-348

## [1.17.0] - 2018-12-12
### Added
- `<sdx-select />` is now able to be a multiselect and filterable at the same time, see SDX-122,
  [example](https://sdx.swisscom.ch/samples/select.html)
- Minor fixes in styleguide website, see SDX-268

### Changed
Web Components: renamed all callbacks from "on-something" to "something-callback",
since Angular handles all attributes starting with "on" differently and made it impossible
to use them within templates for SDX consumers (see SDX-325 and SDX-338).
Following components are affected:

- `<sdx-progress-full />`
- `<sdx-select />`
- `<sdx-search />`
- `<sdx-show-more />`

We're really sorry for this inconvenience - but we hope it's somewhat worth the effort since
it's now much easier to integrate the callbacks directly within your Angular template files
(rather than using references and `@ViewChild`),
see the updated [How to add a callback](https://sdx.swisscom.ch/#webcomponents).

## [1.16.0] - 2018-12-06
### Added
- `<sdx-select />` Web Component (including support for grouping, multiple selection and filtering), see SDX-163
- Improved docs for SDX Web Components usage in Angular and Vue,
  see [sdx.swisscom.ch#webcomponents](https://sdx.swisscom.ch/#webcomponents)

### Fixed
- Drastically reduced size of SDX NPM package (~80%), see SDX-342

### To all developers using Web Components in Angular
It's now easier to include SDX Web Components in your app. It's not required anymore to publicly
serve the `webcomponents/` folder and the `webcomponents.js` file (even though this still works).
Please read more: [sdx.swisscom.ch#webcomponents](https://sdx.swisscom.ch/#webcomponents).
Furthermore, it's also documented how to add callbacks within the `components.ts` file.

## [1.15.1] - 2018-11-22
### Fixed
- Removed non-uniform character from CSS

### To all developers
For those of you who reference stylesheets directly, e.g. `import ~@swisscom/sdx/.../menu-flyout`,
please note that because of the SDX Merge cleanup (new SDX Styleguide website), some filenames have been changed:

- `grid/flex` => `grid/grid`
- `menu/menu-context` => `menu/menu-flyout`
- `search/search-input` => `search/search`
- `search/search-live` => `search/search`
- `table/table-data` => `table/table`
- `table/table-display` => `table/table`
- `table/table-generic` => `table/table`

## [1.15.0] - 2018-11-22
### Added
- The SDX Dev and Design parts are now merged in one, to bring Devs and UX closer together and avoid divergency (this affects only the SDX Styleguide website - not the components themselves)

### Fixed
- Removed gsap from more components to come closer to tree shaking compatibility: accordion, range, toolbar, collapse, search, navigation; soon we will have gsap completely removed
- `<sdx-flyout-menu />`: make sure to recalculate on each `open()`

## [1.14.1] - 2018-11-19
### Changed
- `<sdx-show-more />`: Reset when total items have changed
- Removed unnecessary animation property on `.notification-header` that breaks dynamic show / hide

## [1.14.0] - 2018-11-15
### Added
- Added new Web Component `<sdx-show-more />`, see SDX-324
- Added icons for business phone and service, see SDX-314

### Fixed
- Fixed Maximum size of multiline input field, see SDX-306

## [1.13.2] - 2018-10-31
### Fixed
- Fixes old MenuFlyout for IE11 where it left an unclickable area behind after closing, see SDX-313
- Fixes table sorting with 2 rows, see SDX-310

## [1.13.1] - 2018-10-29
### Fixed
- Fixed font family for `<sdx-progress-full />`, see SDX-293
- Add trailing semicolon for SDX dist build, see SDX-297
- Add ellipsis to input field labels if they're too long, see SDX-304
- Select: Fix empty placeholder, see SDX-307
- Removed "gsap" from MenuFlyout (other components will follow), see SDX-308

## [1.13.0] - 2018-10-18
### Added
- Add onValueChange-method to `<sdx-search />` Web Component, see SDX-305

### Changed
- Remove obsolete component (only from examples!): Light Progress Bar and old Full Progress Bar (against federal regulation, Web Component should be used instead), see SDX-294
- Remove obsolete component (only from examples!): Loader Idle (loading spinner should be used instead), see SDX-294
- Web Components: Remove beta-flag as we now have collected enough feedback, see SDX-301

### Fixed
- Add white background to toggle-buttons, see SDX-300
- Layout fix for static datepicker, see SDX-302

## [1.12.0] - 2018-10-15
### Added
- Added Search Web Component `<sdx-search />`, see SDX-205

## [1.11.1] - 2018-09-28
### Added
- Added icons for copy, paste, plus-box and minus-box, see SDX-256 and SDX-261
- Progress Bar getActiveStep method, see SDX-252

### Fixed
- Fixes cropped badges on Chrome, see SDX-233

## [1.10.0] - 2018-08-07
### Added
- Progress Bar Web Component, see SDX-14
- Accordion Web Component, see SDX-235
- Ribbon Web Component, see SDX-247
- Date picker design improvements (always show next/prev month dates), see SDX-143
- Grid now has a .container--no-margin modifier class to remove margin on small screens, see SDX-201
- Document on the home page how to include Web Components in Angular, see SDX-218

### Changed
- Accordions should always have a border. Please add the accordion--border modifier, see SDX-61
- Updated navigation example: use right handed magnifier and re-arranged icons, see SDX-242

## [1.9.1] - 2018-07-10
### Fixed
- Upgraded gsap to 2.0.1, because previous version leaked non ES5 code that breaks SDX on old browser

## [1.9.0] - 2018-07-04
### Added
- Icon for alarm clock, see SDX-206

### Changed
- Grid gutter now has a constant width of 24px and 8px on mobiles, see SDX-173

### Fixed
- Removed dead code that required @types/gsap to be installed on consumer side, see SDX-69
- Removed TypeDoc repository dependency, see SDX-155

## [1.8.0] - 2018-06-25
### Added
- Example of how to create a Linkbox with Navigation Cards, see SDX-97
- Icon for flag, see SDX-196
- Compatibility with Node 10 / NPM 6, see SDX-167

### Changed
- Font weights for semi-light fonts, see SDX-168

### Fixed
- Filterable dropdown, see SDX-200
- Date picker quickly shows "tt.mm.jjjj" on Chrome, see SDX-131

## [1.7.0] - 2018-06-18
### Added
- Tabs with Images, see SDX-142
- Added icons for software and storage, SDX-161

### Changed
- An item in a select dropdown can now be selected by typing its first character, see SDX-75

### Fixed
- Fixes a problem with the Level 1 Navigation

## [1.6.0] - 2018-06-12
### Added
- Toggle Buttons with images using `toggle-button-group--image`, see SDX-72
- Added icons for wireless voice and data, see SDX-81

### Changed
- Modal Dialog header is now sticky, see SDX-165
- Switches in "off" position don't change their height, see SDX-74
- Padding for all message card titles, see SDX-174

### Fixed
- Footer example for IE11, see SDX-102
- Select dropdown was initially empty, see SDX-132
- Fixed media queries, see SDX-151 (including SDX-48, SDX-55 and SDX-83)

## [1.5.10] - 2018-05-28
### Added
- Switches: Labels can be set on the left side by adding `switch--left`, and labels can be clicked to trigger toggle (see examples), see SDX-91
- Dropdowns can be placed on dark backgrounds, see SDX-120
- Accordions' chevron can be placed at the bottom, see SDX-95
- Dropdowns can be put in loading state using `select--loading`, see SDX-103
- Dropdowns can be filtered using `select-filterable`, see SDX-103
- More sophisticated examples for responsive button groups, see SDX-113
- Added more variations of ribbons, see SDX-138
- Flyout menus' position can be set to left and top using `flyout--left` and `flyout--top`, see SDX-25

### Changed
- Checkboxes' active state is no longer green (but blue), see SDX-141

### Fixed
- Upgraded "gsap" to fix multiple inclusions of sdx.js, see SDX-101
- Error when closing Notification Header in Firefox, thanks @emanuel.schaedler, see SDX-160
- Datepicker on IE11, see SDX-136
- Correct font size for radio button labels, see SDX-140

## [1.5.9] - 2018-05-08
### Added
- Adds `button-group--responsive` to standardize button group alignment to right, see SDX-28
- Adds icons 284-285 (patches), 286-287 (microphones) and 288-290 (handsets), see SDX-134, SDX-146 and SDX-153

### Changed
- Changes orange validation errors, they should be red, see SDX-139

### Deprecated
- Deprecated Collapse Element (Accordion with one element should be used instead)
- Deprecated `button-group--left`, see SDX-28

## [1.5.8] - 2018-04-30
### Added
- Adds Toggle Button component, see SDX-72
- Adds the Accordion `accordion--keep-open` modifier that prevents accordions from auto-closing, see SDX-129
- Adds Ribbons, see SDX-148
- Adds possibility to force a link to be white and underlined using `link--white`, see SDX-69
- Adds Accordion arrows to be on the left side using the `accordion--arrow-left` modifier, see SDX-69

### Fixed
- Link color on dark backgrounds that are using `bg--dark`, see SDX-69
- Notification cards colors and borders, see SDX-76

## [1.5.7] - 2018-04-11
### Added
- Adds icons in tabs, see SDX-27 (or SDX-112)
- Adds Navigation Card component, Message Card components and Promo Banner component, see SDX-76 (SDX-10)
- Adds status, could be used to illustrate read/unread messages, see SDX-77

### Fixed
- Notification Header does not have a `z-index` anymore and will not overlap other content, see SDX-104
- Consistent accordion hover color and chevron sizes, see SDX-108 and SDX-110
- Select (dropdown) placeholders can be defined by using the `disabled` and `selected` attributes (instead of `value=""`), see SDX-52

### Deprecated
- Table Reflow is deprecated, the markup should be built up the right way from the beginning, see SDX-116
- Table with shadows removed, see SDX-116

### Changed
- "Jumpy" labels - forms use static labels by default because animations break browsers auto complete dropdown (see SDX-105)

## [1.5.6] - 2018-04-10
### Added
- Adds icons `260` to `283`, see SDX-39, SDX-87, SDX-124, SDX-126.

## [1.5.5] - 2018-03-20
### Added
- Adds icon `259`, see SDX-40.

## [1.5.4] - 2018-03-19
### Fixed
- Fixes dropdown selected item, see SDX-52, thx @helena.kocurova

## [1.5.3] - 2018-03-18
### Added
- Adds a Date Picker option to Input Fields, see SDX-5, thx [Gregory](https://ko-fi.com/A3381DJ9)

## [1.5.2] - 2018-03-07
### Added
- Adds icons `257` and `258`, see SDX-70 and SDX-82.

## [1.5.1] - 2018-03-02
### Changed
- Migrated JavaScript to TypeScript, see SDX-45, thanks @raphael.schweikert
  - The generated `sdx*.js` files should be completely backwards compatible.
  - The package now includes typings.
  - Backward incompatible changes:
      1. ES6 modules are no longer available in `src`. If you imported a module directly, the path has changed.

         Old:

         ```javascript
         import Table from 'sdx/js/src/table/Table';
         ```
         New:

         ```javascript
         import Table from 'sdx/dist/es6/table/Table';
         ```
         This can also be simplified to `import Table from sdx/table/Table`.
         With webpack, use the [`resolve.alias` config](https://webpack.js.org/configuration/resolve/#resolve-alias):

         ```javascript
	        {
	          resolve: {
	            alias: {
	              sdx: path.resolve(__dirname, 'node_modules/sdx/dist/es6')
	            }
	          }
	        }
         ```
         With TypeScript, put the following in your `.tsconfig.json`’s `compilerOptions`:

         ```javascript
	        {
	          […],
	          "paths": {
	            "sdx": "./node_modules/sdx/dist/es6"
	          }
	        }
         ```
      2. If you used the `esnext:main` (now: `module`) to import SDX, the components will no longer auto-initialize.

## [1.4.7] - 2018-02-28
### Added
- The `sdxcode` npm module is now available on the [internal](https://artifactory.swisscom.com/api/npm/oxd-ref-npm-virtual/sdxcode) and [external](https://bin.swisscom.com/api/npm/oxd-ref-npm-virtual/sdxcode) registries, see SDX-35, thx @mario.goller

### Fixed
- Fixes select dropdown width overflow, see SDX-51, thx @adam.misuda
- Fixes error when using tab key on dropdown with no selected item, see SDX-78, thx @adam.misuda

## [1.4.4] - 2018-02-27
### Fixed
- Fixes single select dropdowns with no placeholder option: selection cannot be deselected, see SDX-68, thx @bruno.ritz

## [1.4.3] - 2018-02-22
### Fixed
- Fixes select dropdowns with more than 10 items on IE11, see SDX-65, thx @matthias.inauen

## [1.4.2] - 2018-01-26
### Fixed
- Fixes Autocomplete tab key to select a suggestion, see SDX-22, thx @daniel.hofmann

## [1.4.1] - 2018-01-09
### Fixed
- Fixes `HTMLSelectElement.selectedOptions` as it causes trouble in IE, see SDX-37, thx @Benjamin Windler
- Fixes typo with `destoy()` method (backwards compatible), see SDX-47, thx @Ces

### Added
- Adds icons `254` to `256`, see SDX-46.

## [1.4] - 2017-11-25
### Fixed
- Fixes Autocomplete not working with entries starts with a "+", see #89
- Fixes missaligned shadow on flyout indicator, see #94, thx @emanuel.schaedler
- Fixes IE10 input field validation icon broken in ie10, see #92, thx @emanuel.schaedler
- Fixes invalid tablehead centering on Win7/IE11, see #91, thx @emanuel.schaedler
- Fixes typos with `destroy()` methods (backwards compatible), see SDX-36, thx @Ces
- Fixes iOS 11 input field bug when displayed in a modal
- Fixes p fontsize in links

### Changed
- Change select selected items search scope, see #88, thx @oliveti

### Added
- Added NodeJS 9 support

## [1.3.6] - 2017-10-06
### Added
- Adds icons `252` to `253`.

## [1.3.5] - 2017-09-29
### Fixed
- Fixes null reference error when closing notification header #85, thx @florin.
- Fixes first options always selected in Menu (dropdown), #83
- Fixes LoadingSpinner alignment with ZoomLevel, #86
- Fixes readme formatting

## [1.3.4] - 2017-09-17
### Fixed
- Flyout menu is no longer suppressing click events, this fixes #74. Thx @denu5

### Added
- Adds opened/closed events to `MenuFlyout` component. See #81.
- Notification header checks the return value of the message click callback function before closing, See #82.
- Modal dialog content now scrolls content.

## [1.3.3] - 2017-08-25
### Fixed
- Fixes an issue with wrapped font definitions in `sdx-wrapped`. See Issue #80, thx @ces.

## [1.3.2] - 2017-08-21
### Added
- Adds icons `242` to `251`.
- Adds documentation for visibility utilities. See Issue #76
- Fix flyout destroy listener !68 thx @oliveti

### Fixed
- Fixes issue with anchor styling on n-th anchor in text. See Issue #75.
- Wraps now everything in sdx-container in the sdx-wrapped file. See Issue #73.

## [1.3.1] - 2017-07-12
### Added
- Adds `input-field--static-label` class to InputField.

## [1.3] - 2017-07-11
### Added
- Tabs
- Improves `Modal` JS documentation by adding event
- `destroy()` method to `Modal` JS component
- Modal dialog now supports multiple trigger elements
- Updates minimal NodeJS version to 4.5

### Fixed
- Fixes a display issue with the checkbox hover state

## [1.2.3] - 2017-06-26
### Added
- Jenkins CI build script.

### Fixed
- Fixes issues with invalid icon-class to icon-font matching, this removes support for #57.

## [1.2.2] - 2017-06-23
### Added
- Adds `sdx-no-modernizr` javascript bundle.

### Fixed
- Fixes an exception if `destroy()` is calles on the `autocomplete` component.
- !67 Table sorting fix: changes columnIndex comparison to columns, thx @gobeli

## [1.2.1] - 2017-06-14
### Added
- Adds `change` event to `Autocomplete` component.
- Adds `value` property to `Autocomplete` component.

## [1.2.0] - 2017-06-02
### Added
- Adds autocompletion support to text-input field using the new `Autocomplete` component.
- Adds utilities section to styleguide. Utilities section includes documentation for common helpers like:
  - Clearfix
  - Margins / Paddings
  - Screen Readers
  - Text
- Adds accessibility focus states to Radio and Checkbox elements

## [1.1.3] - 2017-06-01
### Added
- Makes flyout animation duration configurable, this fixes #61
- Exposes `TextArea` API on the sdx object, thx @oliveti
- Registers gulp tasks in npm (`dev`, `build`,``dist`) use with `npm start <command>`.
- Input Fields: Adds `invalid invalid--inline` state
- Exports `InputField` to `sdx` global scope
- Adds `showError(text)` function to `InputField` to add and remove error messages on input fields.
- Adds error message support to:
  - Checkboxes
  - Radio buttons
  - Dropdown menu
- Adds inline support for radio buttons and checkboxes
- Adds grouping for radio buttons and checkboxes
- Expose textarea api #60

### Fixed
- Fixes an issue where labels would appear on InputFields even if Chrome did not autofill any value
- Fixes keyboard selection issue in the `Select` component.
- Fixes ie bug in notification modal (see Trello Issue: https://trello.com/c/mtcUHjlX)
- Fixes Media queries behave incorrectly at breakpoints at non-100% browser zoom on Firefox & Edge #67
- Fixes Pointless numbers in icon names #57

## [1.1.2] - 2017-04-03
### Added
- Adds icons `229` to `241`.
- Adds digitalexperience icon sample page
- Adds SDX version number to generated css files
- Adds SDX version number variable `sdx.VERSION` to bundle

### Changed
- merges gulp `sass` and `dist:sass` tasks into one
- `normalize.scss` is now included in source, see #43

### Fixed
- Fixes an issue where the footer is not correctly displayed on large screens in safari, see #59 thx @fliptation
- Fixes an issue where footer items collapsed on mobile would be hidden after resize to desktop breakpoints
- Fixes responsive wrapping issue in `button-group`
- Fixes browser-sync css reload task
- Fixes sourcemap generation by removing `includecss` gulp plugin

## [1.1.1] - 2017-03-27
### Added
- Adds icon `227-speech-bubble-filled`
- Adds icon `228-star-filled`

### Fixed
- Pie Chart: fixes #55 by adjusting the minimal slice size
- Input Fields: fixes missing label issue when chrome autofill is used

## [1.1.0] - 2017-03-02
### Added
- Charts
  - Vertical Bar Charts
- Comments
- Table
  - Display table styles
- Documentation
  - Documentation for `b1, b2` text styles

### Fixed
- Removes redundant gridsystem classes. This reduces the minified css to 270KB (30KB less then before).
- selectedOptions polyfill breaks JS in safari mobile 9 #50
- Updates replay icon `icon-066-replay`

## [1.0.0] - 2017-02-10
>> This release contains breaking changes!

### Changed
- Removes obsolete code from pre 1.0 versions #47
    - JS:
        - Removes fallback support for `init="auto"` attribute. Update all existing attributes to `data-init="auto"`
    - SASS:
        - Changes some color variable names (eg. `$color-blue--40` to `$color-blue-40`)
    - CSS:
        - Links: `a` link element requires the `link` class
        - List: list elements (`ul`, `ol`, `dt`) requires the `list` class
        - Badges: replaces class `badge__content__text` with `badge__text`
        - Changes some color classes (eg. `color-blue--40` to `color-blue-40`)
        - `text--underline` is replaced with `text-underline` on the following components:
            - Accordion Sidebar
            - Navigation Level 0
            - Navigation Level 1
