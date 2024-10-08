export function mobileValidator(mobile) {
    if (!mobile) return "Please fill in this field.";
    if (mobile.length !== 10) return "Mobile number must be exactly 10 digits.";
    if (!/^\d+$/.test(mobile)) return "Mobile number must contain only digits.";
    return "";
}