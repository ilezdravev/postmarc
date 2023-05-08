/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
let intaval = setInterval(() => {
    if($('[js-upsell-product-slider] img').innerWidth() > 100){
        $('[js-upsell-product-slider]').slick({
            arrows: false,
            dots: false,
            slidesToShow: 1.5,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
        clearInterval(intaval);
    }
}, 500);
$(document).on('click',function(e){
   if(!e.target.closest('.ProductForm__Option')){
    $('.ProductForm__Option.is-open').removeClass('is-open')
   }
   if(!e.target.closest('.added-to-cart-model')){
    $('.added-to-cart-model.active').removeClass('active')
   }
})
$('[data-drawer-id="sidebar-cart"').on('click',function(){
    $('.added-to-cart-model.active').removeClass('active')
    document.querySelector('.Product').dispatchEvent(new CustomEvent('cart:refresh', {
        bubbles: true
    }));
})
$('.js-option-modal-tragger').on('click',function(){
    
    if(!$(this).parent().hasClass('is-open')){
        $('.ProductForm__Option.is-open').removeClass('is-open');
        $(this).parent().addClass('is-open');
    }else{
        $(this).parent().removeClass('is-open');
    }
})
$('[js-view-cart').on('click',function(){
    document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
        bubbles: true
    }));
    $('#sidebar-cart').attr('aria-hidden',false)
})
$('.js-popover-size').on('click',function(){
    if(!$(this).hasClass('is-selected')){
        if(window.innerWidth >999){
            $('.popover-size.is-selected').removeClass('is-selected');
            $(this).addClass('is-selected')
        }
        $(this).closest('.ProductForm__Option').find('.ProductForm__SelectedValue').text($(this).attr('data-value'));
        $('.ProductForm__Option.is-open').removeClass('is-open')
       $(this).parent().find('.ProductForm__SelectedValue').text($(this).attr('data-value'));
    }
}) 

// var addToCartButton = $('.ProductForm__AddToCart')
// function changeVariant(element = null){
//     if(element != null){
//         let productElement = $(element).closest('.Product');
//         if(productElement){
//             var selectedOptions= productElement.find('.ProductForm__SelectedValue');
//             // var productOptions = $('select[name="id"]').find('option');
//             var compareName1 =   selectedOptions.eq(0).text();
//             var compareName2 =   selectedOptions.eq(1).text();
//             var variants =  JSON.parse($('[data-product-json]').text()).product.variants;
//             for(let i = 0; i < variants.length; i ++){
//                 if(variants[i].option1 == compareName1 && variants[i].option2 == compareName2){
//                     if(variants[i].available){
//                         addToCartButton.removeAttr('disabled');
//                         addToCartButton.addClass(addToCartButton.attr('data-use-primary-button') === 'true' ? 'Button--primary' : 'Button--secondary');
//                         addToCartButton.attr('data-action', 'added-to-cart');
//                         addToCartButton.text('Add to Bag')
//                     }else{
//                         addToCartButton.attr('disabled', 'disabled');
//                         addToCartButton.removeAttr('data-action');
//                         addToCartButton.addClass('Button--secondary');
//                         addToCartButton.text('Sold Out')
//                     }
//                 }
//             }
//         }
//     }
// }
$('[js-btn-close-color-option]').on('click',function(){
    $(this).closest('.is-open').removeClass('is-open')
})
$('.js-size-options-close').on('click',function(){
    $('.PageOverlay').trigger('click')
})

$('.color-option-selector-content label').on('click',function(){
    if($(this).css('background-image') != 'none'){
        $(this).closest('.ProductForm__Option.Color').find('.color-option-wrap').css('background-image',$(this).css('background-image'))
        return;
    }
    if($(this).css('background-color') != 'none'){
        $(this).closest('.ProductForm__Option.Color').find('.color-option-wrap').css('background-image','')
        $(this).closest('.ProductForm__Option.Color').find('.color-option-wrap').css('background-color',$(this).css('background-color'))
    }
})