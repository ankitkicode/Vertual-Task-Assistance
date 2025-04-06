function selectProperties(obj, excludeList, operatorStr) {
    return Object.keys(obj).reduce((acc, key) => {
        if (operatorStr === "+") {
            if (excludeList.includes(key)) {
                acc[key] = obj[key];
            }
        } else if (operatorStr === "-") {
            if (!excludeList.includes(key)) {
                acc[key] = obj[key];
            }
        }
        return acc;
    }, {});
}

module.exports = selectProperties;