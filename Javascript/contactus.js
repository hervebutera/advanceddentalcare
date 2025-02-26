
const firstnameInput = document.getElementById("firstname")
const firstnameErr = document.getElementById("firstnameErr")
const lastnameInput = document.getElementById("lastname")
const lastnameErr = document.getElementById("lastnameErr")
const emailInput = document.getElementById("email")
const emailErr = document.getElementById("emailErr")
const phoneInput = document.getElementById("phone")
const phoneErr = document.getElementById("phoneErr")
const messageInput = document.getElementById("message")
const messageErr = document.getElementById("messageErr")
const alert = document.getElementById("alert")
const send_btn = document.getElementById("send-btn")


const isValidUSPhoneNumber = (inputString) => {
    const regex = /^[2-9][\d]{2}[\d]{3}[\d]{4}$/;
    let onlyNumbers = inputString.replace(/\D/g, '');
    
    if (onlyNumbers.length === 11 && onlyNumbers[0] === "1") {
        let newPhoneNumber = onlyNumbers.slice(1);
        
        if (regex.test(newPhoneNumber) === true) {

            const areaCode = newPhoneNumber.slice(0, 3);
            const firstThree = newPhoneNumber.slice(3, 6);
            const lastFour = newPhoneNumber.slice(6, 10);

            return `(${areaCode}) ${firstThree}-${lastFour}`;
            
        } else {
            return false;
        }
    } else if (onlyNumbers.length === 10) {
        
        if (regex.test(onlyNumbers) === true) {
            
            const areaCode = onlyNumbers.slice(0, 3);
            const firstThree = onlyNumbers.slice(3, 6);
            const lastFour = onlyNumbers.slice(6, 10);

            return `(${areaCode}) ${firstThree}-${lastFour}`;
        } else {
            return false;
        }
    } else {
        return false
    }
}


const formatName = (input) => {

    const trimmedInput = input.trim();
    if (trimmedInput.length === 0) {
        throw new Error('A name cannot contain only spaces')
    }


    // Regular expression to check for invalid characters (anything not a letter)
    const invalidCharRegex = /[^a-zA-Z]/;

    if (invalidCharRegex.test(trimmedInput)) {
        throw new Error('A name should contain only alphabetical letters');
    }

    // Ensure no spaces within the trimmed input
    if (trimmedInput.includes(' ')) {
        throw new Error('A name should be one word');
    }

    // Convert the first character to uppercase if the string is not only spaces
    if (trimmedInput.length > 0) {
        return trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1);
    }

    return trimmedInput;
}

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email) === false) {
        return false;
    } else {
        return email;
    }
}

const validateMessage = (text) => {
    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
        throw new Error('Message cannot be empty');
    } else {
        return trimmedText;
    }
}
const clearInpusts = () => {
    firstnameInput.value = ""; 
    lastnameInput.value = ""; 
    emailInput.value = ""; 
    phoneInput.value = ""; 
    messageInput.value = ""; 
}

const submitForm = () => {

    let emailParameters = {};

    //for firstname
    try {
        const input = firstnameInput.value;
        emailParameters["from_firstname"] = formatName(input);
        firstnameErr.classList.remove("err-message");
        firstnameErr.innerHTML = "";
        firstnameInput.classList.remove("input-border-err"); 
    } catch (error) {
        firstnameErr.classList.add("err-message");
        firstnameErr.innerHTML = error.message;
        firstnameInput.classList.add("input-border-err");
        return;
    }

    // for lastname
    try {
        const input = lastnameInput.value;
        emailParameters["from_lastname"] = formatName(input);
        lastnameErr.classList.remove("err-message");
        lastnameErr.innerHTML = "";
        lastnameInput.classList.remove("input-border-err"); 
    } catch (error) {
        lastnameErr.classList.add("err-message");
        lastnameErr.innerHTML = error.message;
        lastnameInput.classList.add("input-border-err");      
        return;
    }

    emailParameters["reply_to"] = emailInput.value;
    let phoneNumber = isValidUSPhoneNumber(phoneInput.value)
    if (phoneNumber === false) {
        phoneErr.classList.add("err-message")
        phoneInput.classList.add("input-border-err")
        return;
    } else {
        emailParameters["from_phone"] = phoneNumber
        phoneErr.classList.remove("err-message")
        phoneInput.classList.remove("input-border-err")
    }
    
    try {
        emailParameters["message"] = validateMessage(messageInput.value);
        messageErr.classList.remove("err-message");
        messageErr.innerHTML = "";
        messageInput.classList.remove("input-border-err"); 
    } catch (error) {
        messageErr.innerHTML = error.message
        messageErr.style.color = "#dc2626"
        messageInput.classList.add("input-border-err")
        return;
    }

    let email = isValidEmail(emailInput.value);
    if (email === false) {
        emailErr.classList.add("err-message")
        emailInput.classList.add("input-border-err")
        emailErr.innerHTML = "Enter a valid email";
        return;
    } else {
        emailParameters["reply_to"] = email;
        emailErr.classList.remove("err-message")
        emailInput.classList.remove("input-border-err")
        emailErr.innerHTML = "";
    }
    emailParameters["to_name"] = "Life Care Community"; 
        
    console.log(emailParameters);
    send_btn.disabled = true;
    send_btn.innerHTML = "Sending...";

    emailjs.send('service_be37jqf','template_f6lj6ug',emailParameters)
        .then(function (res) {
            alert.classList.add("successful-alert");
            alert.classList.remove("error-allert")
            alert.innerHTML = "Message sent successfully";
            send_btn.disabled = false;
            send_btn.innerHTML = "Send";
            clearInpusts();
        }).catch((err) => {
            alert.classList.remove("successful-alert");
            alert.classList.add("error-allert")
            alert.innerHTML = err.message;
            send_btn.disabled = false;
            send_btn.innerHTML = "Send";
        })
}

send_btn.addEventListener("click", (e) => {
    e.preventDefault();
    submitForm();
})


