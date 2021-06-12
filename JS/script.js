
var pizzaSizePriceList = [
    ["Small($9.99)","Medium($12.99)","Large($14.99)"],
    ["Medium($11.99)","Large($13.99)"],
    ["Large($16.99)","Extra Large($19.99)"],
    ["Small($10.99)"]
]

/* Error Messages */
var inValidName = " Invalid Name: Enter a name for the order";
var invalidStreetAddress = "Invalid Street Address : Enter a valid address for the order"
var invalidCityName = "Invalid City : Enter a valid City"
var invalidZipcode = "Invalid Zipcode : Enter a valid zipcode , number and - only"
var invalidEmail = "Invalid Email : Enter a valid email"
var invalidPhoneNumber = "Invalid Phone Number : Enter a valid phone number";
var invalidCreditCard ="Invalid Credit/Debit Card : Enter a Valid Credit/Debit Card"
var invalidCVC = "Invalid CVC Code : Enter a valid CVC code"


function $(id){
    return document.getElementById(id);
}

function $q(id){
    return document.querySelector(id);
}

$('getOrder').addEventListener('click', (e) => {
    console.log("get order is clicked");
    custInfoDiv = document.getElementById("customerInfo");
    custInfoDiv.classList.remove("invisible");
});

function addErrorText(errorElement,errorDesc)
{

    nextSibling=errorElement.nextElementSibling;
    
    if ( !(nextSibling instanceof HTMLParagraphElement)) 
    {
        
        errorElement.style.border="5px solid red";
        let errorText=document.createElement("p");
        errorText.innerHTML=errorDesc;
        errorElement.parentElement.appendChild(errorText);
    }

}

function removeErrorText(errorElement)
{
    errorElement.style.border="";
    nextSibling=errorElement.nextElementSibling;
    
    if ( nextSibling instanceof HTMLParagraphElement) 
    {
        nextSibling.remove();
    }
}

function validateCustomerName (fieldId) {
    if ( ( fieldId.value === "") || ( !(/^[a-zA-Z ]*$/.test(fieldId.value))) ){
        
        addErrorText(fieldId,inValidName)
        return false;
    }
    else{
        removeErrorText(fieldId);
        return true;
    }
};

function validateStreetAddress (fieldId)
{
    if ( fieldId.value === "")
    {
        
        addErrorText(fieldId,invalidStreetAddress);
        return false;
    }
    else {
        removeErrorText(fieldId);
        return true;
    }
}

function validateCity(fieldId){
    if ( fieldId.value === ""){
        addErrorText(fieldId,invalidCityName);
        return false;
    }else {
        removeErrorText(fieldId);
        return true;
    }
}

function validateZipCode(fieldId){
    if ( !(/(^\d{5}(-\d{4})?$)/.test(fieldId.value))){
       
        addErrorText(fieldId,invalidZipcode)
        return false;
    }
    else{
        removeErrorText(fieldId);
        return true;
    }
}

function validateEmail(fieldId)
{
    if (! ( /\S+@\S+\.\S+/.test(fieldId.value) )){
        
        addErrorText(fieldId,invalidEmail)
        return false;
    }
    else{
        removeErrorText(fieldId);
        return true;
    }
}

function validatePhoneNumber (fieldId){

    if (!(/^\d{10}$/.test(fieldId.value)) && 
          !(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(fieldId.value))
       )
    {
        
        addErrorText(fieldId,invalidPhoneNumber)
        return false;
    }
    else {
        removeErrorText(fieldId);
        return true;
    }

}
$('shipCustomerName').addEventListener("blur",(e)=>{
    
    if ( !validateCustomerName($('shipCustomerName')) )
    {
        $('shipCustomerName').focus();
    }
    
})

$('shipCustomerStreet').addEventListener("blur",(e)=>{
    
    if ( !validateStreetAddress($('shipCustomerStreet')) ){
        $('shipCustomerStreet').focus();
    }
    
})

$('inputAddressType').addEventListener("change",(e)=>{
   
    if ($('inputAddressType').options[$('inputAddressType').selectedIndex].text === "Other"){
        newDiv = document.createElement("div")
        newDiv.classList.add("col-md-6")
        newDiv.id ="addressOther"

        newLabel = document.createElement("label")
        newLabel.classList.add("form-label")
        newLabel.for ="other";
        newLabel.innerHTML="Other";
        newDiv.appendChild(newLabel);

        newInput = document.createElement("input")
        newInput.classList.add("form-control");
        newInput.type="text";
        newInput.id="otherInput";
        newDiv.appendChild(newInput);

        $('inputAddressType').parentNode.parentNode.insertBefore(newDiv,$('inputAddressType').parentNode.nextSibling);
    }
    else {
        otherDiv = document.getElementById("addressOther");
        if ( otherDiv != null ){
            otherDiv.remove();
        }
    }
})

$('shipCustomerZip').addEventListener("blur",(e)=>{
    if ( !validateZipCode($('shipCustomerZip')) ){
        $('shipCustomerZip').focus();
    }
})

$('shipCustomerCity').addEventListener("blur",(e)=>{
    if ( !validateCity($('shipCustomerCity'))){
        $('shipCustomerCity').focus();
    }
})
$('shipCustomerEmail').addEventListener("blur",(e)=>{
    if (! validateEmail($('shipCustomerEmail')) ){
        $('shipCustomerEmail').focus();
    }
})

$('shipCustomerPhoneNumber').addEventListener("blur",(e)=>{
    if ( !validatePhoneNumber($('shipCustomerPhoneNumber')) ){
        $('shipCustomerPhoneNumber').focus();
    }
})

$('validateShipDetails').addEventListener("click",(e)=>{

    e.preventDefault();

    
    let focusSet = false;
 
    if ( !validateCustomerName($('shipCustomerName')) && !focusSet ){
        $('shipCustomerName').focus();
        focusSet = true;
    }
    
    if ( !validateStreetAddress($('shipCustomerStreet')) && !focusSet ){
        $('shipCustomerStreet').focus();
        focusSet = true;
    }

    if ( !validateCity($('shipCustomerCity')) && !focusSet ){
        $('shipCustomerCity').focus();
        focusSet = true;
    }

    if ( !validateZipCode($('shipCustomerZip')) && !focusSet ){
        $('shipCustomerZip').focus();
        focusSet = true;
    }

    if ( !validateEmail($('shipCustomerEmail')) && !focusSet ){
        $('shipCustomerEmail').focus();
        focusSet = true;
    }

    if ( !validatePhoneNumber($('shipCustomerPhoneNumber')) && !focusSet ){
        $('shipCustomerPhoneNumber').focus();
        focusSet = true;
    }
 
    if (!focusSet)
    {
         $('pizzaBuild').classList.remove("invisible")
         
    }
    
    

})
// user build pizza

$('doughselector').addEventListener("change",(e)=>{
    
    console.log("radio selection changed"+e.target.value);
    document.getElementById("sizePriceLabel").innerHTML=e.target.labels[0].innerHTML+" Size and Price";

    let selectPizzaList = pizzaSizePriceList[e.target.value];
    $('pizzaSizePrice').options.length=0;
    
    defaultOption = document.createElement("option");
    defaultOption.value=-1
    defaultOption.innerHTML = "Select Size";
    $('pizzaSizePrice').appendChild(defaultOption);
    for ( let i=0;i<selectPizzaList.length;i++)
    {
        option = document.createElement("option");
        option.value=selectPizzaList[i].match(/\((.*?)\)/g);
        option.value=option.value.replace(/[\(\)$]/g,'');
        console.log(option.value)
        option.innerHTML=selectPizzaList[i]
        $('pizzaSizePrice').appendChild(option);
    }

    $("cheeseOption").selectedIndex=0
    $("sauceOption").selectedIndex=0
    $("cheeseOption").disabled=true;
    $("sauceOption").disabled=true;
    $('shoppingCart').classList.remove("invisible")
    

}); 

$('pizzaSizePrice').addEventListener("change",(e)=>{

    if ($('pizzaSizePrice').options[$('pizzaSizePrice').selectedIndex].value !== "-1" )
    {
        $("cheeseOption").disabled=false;
        $("sauceOption").disabled=false;
        addToCheckout("chk-base-item",$('pizzaSizePrice').options[$('pizzaSizePrice').selectedIndex].innerHTML,$('pizzaSizePrice').options[$('pizzaSizePrice').selectedIndex].value)
    }
}) 

$('cheeseOption').addEventListener("change",(e)=>{
    console.log('chesse option')
    if ( $('cheeseOption').options[$('cheeseOption').selectedIndex].value !== -1){
        
        addToCheckout('chk-chesse-option',$('cheeseOption').options[$('cheeseOption').selectedIndex].innerHTML,$('cheeseOption').options[$('cheeseOption').selectedIndex].value)
    }
})

$('sauceOption').addEventListener("change",(e)=>{
    if ( $('sauceOption').options[$('sauceOption').selectedIndex].value !== -1){
        
        addToCheckout('chk-sauce-option',$('sauceOption').options[$('sauceOption').selectedIndex].innerHTML,$('sauceOption').options[$('sauceOption').selectedIndex].value)
    }
})

function updateCheckoutTotal(){
    total=0.0;
    for (i=1;i<$('paymentItems').childNodes.length;i++)
    {
        let item = $('paymentItems').childNodes[i].innerHTML
        console.log(item)
        let val= item.slice(item.lastIndexOf(':')+1).trim();
        console.log(val)
        console.log(total)
        total += parseFloat(val)
        
        
        console.log(total)
    }
    $('payTotal').innerHTML= Math.round(total*100)/100
}

function addToCheckout(itemId,item,price){
    if ( $(itemId) == null ){
        let newItem = document.createElement('li')
        newItem.id=itemId
        newItem.classList.add("list-group-item")
        newItem.innerHTML = item + ":" + price
        $('paymentItems').appendChild(newItem);
        
    }else{
        $(itemId).innerHTML = item + ":" + price
    }
    updateCheckoutTotal();
}

function removeCheckout(itemId){
    if ($(itemId) != null ){
        $(itemId).remove();
        updateCheckoutTotal();
    }
}

$('goToPayment').addEventListener("click",(e)=>{
    e.preventDefault();
    console.log($('pizzaSizePrice').options[$('pizzaSizePrice').selectedIndex].value);
    console.log($('cheeseOption').options[$('cheeseOption').selectedIndex].value);
    console.log($('sauceOption').options[$('sauceOption').selectedIndex].value);
    console.log($('confirmOrder').checked);
    if ( 
         $('pizzaSizePrice').options[$('pizzaSizePrice').selectedIndex].value !== "-1" &&
         $('cheeseOption').options[$('cheeseOption').selectedIndex].value !== "-1" &&
         $('sauceOption').options[$('sauceOption').selectedIndex].value !== "-1" &&
         $('confirmOrder').checked
    ){
            $('paymentInfo').classList.remove("invisible");

    }
    else {
        window.alert("Select Pizaa options")
    }
})



var paymentAddressCheck = document.getElementById("paymentAddressCheck");

paymentAddressCheck.addEventListener("change",(e)=>{
    if ( paymentAddressCheck.checked)
    {
        $('paymentName').value = $('shipCustomerName').value;
        $('paymentStreetAddress').value = $('shipCustomerStreet').value;
        $('paymentAddType').value = $('inputAddressType').value;
        $('paymentCity').value = $('shipCustomerCity').value;
        $('paymentState').value = $('inputState').value;
        $('paymentZip').value = $('shipCustomerZip').value;

    }else
    {
        $('paymentName').value = "";
        $('paymentStreetAddress').value = "";
        $('paymentAddType').value = "";
        $('paymentCity').value = "";
        $('paymentState').value = "";
        $('paymentZip').value = "";

    }
})

$('paymentName').addEventListener ("blur",(e)=>{
    if ( !$('paymentAddressCheck').checked && !validateCustomerName($('paymentName'))){
        addErrorText($('paymentName',invalidName));
        $('paymentName').focus()
    }
    else {
        removeErrorText($('paymentName'))
    }
})

$('paymentStreetAddress').addEventListener ("blur",(e)=>{
    if ( !$('paymentAddressCheck').checked && !validateStreetAddress($('paymentStreetAddress'))){
        addErrorText($('paymentStreetAddress'),invalidStreetAddress);
        $('paymentStreetAddress').focus()
    }
    else {
        removeErrorText($('paymentStreetAddress'))
    }
})

$('paymentCity').addEventListener ("blur",(e)=>{
    if ( !$('paymentAddressCheck').checked && !validateStreetAddress($('paymentCity'))){
        addErrorText($('paymentCity'),invalidCityName);
        $('paymentCity').focus()
    }
    else {
        removeErrorText($('paymentCity'))
    }
})

$('paymentZip').addEventListener ("blur",(e)=>{
    if ( !$('paymentAddressCheck').checked && !validateStreetAddress($('paymentZip'))){
        addErrorText($('paymentZip'),invalidZipcode);
        $('paymentZip').focus()
    }
    else {
        removeErrorText($('paymentZip'))
    }
})


function validateCreditCard (fieldId)
{
    
    let cardNo = fieldId.value.slice(fieldId.value.lastIndexOf(')')+1)
    cardNo=cardNo.replace(/\s+/g,'')
    if ( cardNo.length == 13 || cardNo.length == 15 || cardNo.length == 16)
    {
        if  (/^[0-9]*$/.test(cardNo) )
        {
    
            if ( cardNo.charAt(0) == '4' 
            || ( cardNo.charAt(0) == '5' && (cardNo.charAt(1) == '1' ||  cardNo.charAt(1) == '2' || cardNo.charAt(1) == '3' || cardNo.charAt(1) =='4' || cardNo.charAt(1) == '5' ) )
            || (cardNo.charAt(0) == '3' && cardNo.charAt(1) == '7') )
            {
                luhnNo=parseInt(cardNo.charAt(cardNo.length-1));
                let skip=false;
                for ( i=cardNo.length-2;i>=0;i--){
                    var compVal = parseInt(cardNo.charAt(i))*(skip?1:2)

                    luhnNo += ((compVal>9?1:0) + (compVal%10))
                    skip = !skip
                }

                if ( !(luhnNo%10))
                {
                    return true
                }


            }
        }   
   }
   return false;

}

function validateCVC(fieldId){
    if ( ( fieldId.value === "") || !(/^[0-9]*$/.test(fieldId.value) ) ){
        return false
    }
    else{
        return true
    }
}

function showCardType(fieldId){
    console.log(fieldId.value.charAt(0))
    switch (fieldId.value.charAt(0)){
        case '4':
            fieldId.value="(Visa)"+fieldId.value;
            break;
        case '5':
            fieldId.value="(mastercard)"+fieldId.value;
            break;
        case '3':
            fieldId.value="(American Express)"+fieldId.value;
            break;
    }


}

$('inputCardNumber').addEventListener("focus",(e)=>{
    $('inputCardNumber').value=$('inputCardNumber').value.slice($('inputCardNumber').value.lastIndexOf(')')+1)
})

$('inputCardNumber').addEventListener("blur",(e)=>{
    if ( !validateCreditCard($('inputCardNumber'))){
        addErrorText($('inputCardNumber'),invalidCreditCard)
    }
    else{
        removeErrorText($('inputCardNumber'));
        showCardType($('inputCardNumber'))
    }
})

$('paymentCVC').addEventListener("blur",(e)=>{
    if ( !validateCVC($('paymentCVC')) )
    {
        addErrorText($('paymentCVC'),invalidCVC)
    }
    else{
        removeErrorText($('paymentCVC'))
    }
})

$('payOrder').addEventListener("click",(e)=>{

    e.preventDefault();

    
    let focusSet = false;
 
    if ( !validateCustomerName($('paymentName')) && !focusSet ){
        $('paymentName').focus();
        focusSet = true;
    }
    
    if ( !validateStreetAddress($('paymentStreetAddress')) && !focusSet ){
        $('paymentStreetAddress').focus();
        focusSet = true;
    }

    if ( !validateCity($('paymentCity')) && !focusSet ){
        $('paymentCity').focus();
        focusSet = true;
    }

    if ( !validateZipCode($('paymentZip')) && !focusSet ){
        $('paymentZip').focus();
        focusSet = true;
    }

    if ( !validateCreditCard($('inputCardNumber')) && !focusSet ){
        $('inputCardNumber').focus();
        focusSet = true;
    }

    if ( !validateCVC($('paymentCVC')) && !focusSet ){
        $('paymentCVC').focus();
        focusSet = true;
    }

    if (!focusSet)
    {
        window.alert("Your order has been placed. Enjoy your pizza")
    }



})


$('pizzaToppins').addEventListener("change",(e)=>{
    if ( e.target.checked){
            console.log($q('label[for="'+e.target.id+'"]').innerHTML);
            addToCheckout('chk-'+e.target.id,$q('label[for="'+e.target.id+'"]').innerHTML,"0.99")
    }else{
        removeCheckout('chk-'+e.target.id)
    }
})


