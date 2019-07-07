/**
 * to increae the car quantity and update session storage
 * @param {Event} e event to prevent default refresh
 */

const incFunc = function(e){
    e.preventDefault();
    const productID=$(this).attr('data-id');
    const incStep = parseFloat($('#purSelect').val());
    let tempCart = parseFloat(sessionStorage.getItem(`${productID}`)) || 0;
    tempCart += incStep;
    sessionStorage.setItem(`${productID}`,tempCart);
    $('#cartQty').text(`${sessionStorage.getItem(`${productID}`)}`);
    let inCart = false;
    if ($('#cartQty').text()!=='0'){
        inCart=true;
    }
    const updateEntry={
    itemInCart:inCart
    }
    $.ajax({url:`/cartUpdate/${productID}`,method:'PUT',data:updateEntry }).then(
        function(data){
            if(data){
                console.log('itemInCart successfully change');
            }else{
                console.log("There's some problem in put methord ")
            }
        }
    );

}

$(document).on('click','#incQtyBtn',incFunc);


