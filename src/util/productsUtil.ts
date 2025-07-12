export function upperCaseString(str:string) {

    const words = str.split("-");
    const capitalize = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalize.join(" ");
}

