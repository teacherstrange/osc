/**
 * Get a unique array of objects
 *
 * @param array array of objects
 * @param identifier string to identify the object property you want to use as a unique identifier
 * @returns Array of unique objects
 */

type ObjWithWildcards<T> = T & { [key: string]: unknown };
type Identifier = string | number;

export const getUniqueObjects = (array: object[], identifier: Identifier) => {
    const arrayOfObjects = array as ObjWithWildcards<{ [identifier: Identifier]: Identifier }>[];
    // Create a place to store the unique values
    const flag: { [identifier: Identifier]: Identifier | boolean } = {};
    const unique: typeof array = [];

    // If the item isn't in the flag object add it and push into the array
    // Otherwise skip over it
    arrayOfObjects.forEach((item) => {
        const id = identifier as keyof typeof item;

        if (!flag[item[id]]) {
            flag[item[id]] = true;
            unique.push(item);
        }
    });

    return unique;
};
