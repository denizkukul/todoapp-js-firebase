// Check if the submited todo value is valid
const validateInput = (value) => {
    let regex = new RegExp(/[a-z]/i);
    if (!regex.test(value)) {
        return false;
    }
    else {
        return true;
    }
}

export default validateInput;