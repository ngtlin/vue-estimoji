'use strict';

const breakpoints = {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    ul: 1440
};
function isDesktopOrLarger() {
    return window.innerWidth >= breakpoints.lg;
}

exports.isDesktopOrLarger = isDesktopOrLarger;
