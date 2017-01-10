/*!
 *  main.js
 *  controller
 *
 *  Created by Colly Myers on 2016-05-30.
 *  Copyright (c) 2016 Dinnergise Ltd. All rights reserved.
 *
 */
var $dg = (function () {
  var dg = {}
  function dishOrder(event) {
    event.preventDefault();
    var delta = 1;
    var parentEl = this.parentElement.parentElement
    if ($(this).hasClass('dish-add')) {
      $(dg.checkoutMenuItem).removeClass('dg-hidden');
      $(dg.checkoutMenuButton).removeClass('dg-hidden');
      $(parentEl).find('.g-action').removeClass('dg-hidden');
// Following 3 lines force a re-render to fix a bug on bootstrap badges in Safari
      parentEl.style.display='none';
      parentEl.offsetHeight;
      parentEl.style.display='block';
    }
    else if ($(this).hasClass('g-action')) delta = -1;
    var dishId = parentEl.getAttribute('dish-id');
    var ssDishId = '$dg_dishId_' + dishId;
    var currentValue = sessionStorage.getItem(ssDishId);
    if (currentValue !== null) {
      currentValue = Number(currentValue) + delta;
    }
    else currentValue = 1;
    if (currentValue === 0) {
      sessionStorage.removeItem(ssDishId);
      parentEl.getElementsByClassName('dish-badge')[0].innerHTML = '';
      $(parentEl).find('.g-action').addClass('dg-hidden');
    }
    else {
      sessionStorage.setItem(ssDishId, currentValue);
      parentEl.getElementsByClassName('dish-badge')[0].innerHTML = currentValue;
    }
    var orderedItemsCount = Number(sessionStorage.getItem('$dg_orderedItemsCount')) + delta;
    sessionStorage.setItem('$dg_orderedItemsCount', orderedItemsCount);
    if (orderedItemsCount === 0) {
      $(dg.checkoutMenuItem).addClass('dg-hidden');
      dg.checkoutBadge.innerHTML = '';
      $(dg.checkoutMenuButton).addClass('dg-hidden');
      dg.checkoutMenuButtonLabel.innerHTML = '';
    }
    else {
      dg.checkoutBadge.innerHTML = orderedItemsCount;
      dg.checkoutMenuButtonLabel.innerHTML = orderedItemsCount;
    }
// Following 4 lines force a re-render to fix a bug on bootstrap badges in Safari
    parentEl = dg.checkoutBadge.parentElement;
    parentEl.style.display='none';
    parentEl.offsetHeight;
    parentEl.style.display='block';
  }
  function dishShowNutrition(event) {
    event.preventDefault();
    var parentEl = this.parentElement.parentElement.parentElement.parentElement;
    var actionEl = $(parentEl).find('.dish-description .fa')[0];
    if ($(actionEl).hasClass('fa-info-circle')) {
      $(actionEl).removeClass('fa-info-circle')
      $(actionEl).addClass('fa-times-circle-o')
      if (dg.showingIngredientsEl !== parentEl) {
        if (dg.showingIngredientsEl !== undefined) doDishHideNutrition(dg.showingIngredientsEl);
        dg.showingIngredientsEl = parentEl;
        $(dg.showingIngredientsEl).find('.dish-nutrition').removeClass('dg-hidden');
/*
        var scrollPos = 0;
        var top = $(dg.showingIngredientsEl).offset().top;
        if (top !== (67 + 10)) scrollPos = top - 67; // 67 must be the same as #main margin-top in main.css
        $('html, body').animate({
          scrollTop: scrollPos
        }, 500);
*/
      }
    }
    else doDishHideNutrition(parentEl);
  }
  function doDishHideNutrition(parentEl) {
    var actionEl = $(parentEl).find('.dish-description .fa')[0];
    $(actionEl).removeClass('fa-times-circle-o')
    $(actionEl).addClass('fa-info-circle')
    $(parentEl).find('.dish-nutrition').addClass('dg-hidden');
    delete dg.showingIngredientsEl;
  }
  function dishHideNutrition(event) {
    event.preventDefault();
    doDishHideNutrition(this.parentElement);
  }
  function navigateHome(event) {
    event.preventDefault();
    if (MENU_SELECTOR !== ".menu-home") window.location.assign('index.html');
  }
  function navigateOrder(event) {
    if (MENU_SELECTOR !== ".menu-order") {
      window.location.assign('order.html');
      $(this).removeClass('dg-btn-hover')
    }
  }
  function btnMouseEnter(event) {
    event.preventDefault();
    $(this).addClass('dg-btn-hover')
  }
  function btnMouseLeave(event) {
    event.preventDefault();
    $(this).removeClass('dg-btn-hover')
  }
  dg.initialize = function () {
    try {
      sessionStorage.setItem('$dg_test', 'test'); // This will fail on Safari if in private mode
      sessionStorage.removeItem('$dg_test', 'test');
    }
    catch (err) { // Safari is in private mode
      window.location.assign('private-mode-error.html');
    }
    try {
      $('#sidebar-collapse').find(MENU_SELECTOR).addClass('active');
      if (navigator.appVersion.indexOf("Win")!=-1) {
        $('.sub-brand-win-patch').addClass('dinnergise-sub-brand-win-top');
      }
      dg.checkoutBadge = $('.checkout-menu-item')[0];
      dg.checkoutMenuItem = dg.checkoutBadge.parentElement.parentElement
      dg.checkoutMenuButton = $('.checkout-menu-button')[0];
      dg.checkoutMenuButtonLabel = $(dg.checkoutMenuButton).find('.checkout-menu-button-label')[0];
      $('.navbar-brand').each(function() {$(this).bind('click', navigateHome);});
      $('.index-step-order .btn').each(function() {
        $(this).bind('click', navigateOrder);
        $(this).bind('mouseenter', btnMouseEnter);
        $(this).bind('mouseleave', btnMouseLeave);
      });
      $('.dish-order').each(function() {$(this).bind('click', dishOrder);});
      $('.dish-table-col1').each(function() {$(this).bind('click', dishShowNutrition);});
      $('.dish-nutrition').each(function() {$(this).bind('click', dishHideNutrition);});
      var ssOrderedItemsCount = sessionStorage.getItem('$dg_orderedItemsCount');
      if (ssOrderedItemsCount !== null) {
        $('.dish').each(function() {
          var dishId = this.getAttribute('dish-id');
          var ssDishId = '$dg_dishId_' + dishId;
          var currentValue = sessionStorage.getItem(ssDishId);
          if (currentValue !== null) {
            $(this).find('.g-action').removeClass('dg-hidden');
            this.getElementsByClassName('dish-badge')[0].innerHTML = currentValue;
          }
        });
        if (ssOrderedItemsCount !== '0') {
          $(dg.checkoutMenuItem).removeClass('dg-hidden');
          dg.checkoutBadge.innerHTML = ssOrderedItemsCount;
          $(dg.checkoutMenuButton).removeClass('dg-hidden');
          dg.checkoutMenuButtonLabel.innerHTML = ssOrderedItemsCount;
        }
      }
      else sessionStorage.setItem('$dg_orderedItemsCount', '0');
    }
    catch (err) { // Report a technical fault
      window.location.assign('technical-fault.html?fault=' + err);
    }
  }
  return dg;
}());
$(document).ready(function() {$dg.initialize();});