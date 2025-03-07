
const toCamelCase = (str) => {
    if (str && str.trim() !== "") {
        if (str != "" && str != null && str != "null")
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
    }
    return "";
}
export default toCamelCase;