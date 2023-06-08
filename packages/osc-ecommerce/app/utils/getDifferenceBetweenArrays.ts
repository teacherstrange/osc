type ObjWithWildcards<T> = T & { [key: string]: unknown };
type Identifier = string | number;

/**
 * Get the difference between two arrays
 *
 * @param array1 Array of values or objects
 * @param array2 Array of values or objects to compare against array1
 * @param identifier Optional identifier to use when comparing arrays of objects
 * @returns Array of values or objects that are unique to array1
 */
export const getDifferenceBetweenArrays = (
    array1: any[],
    array2: any[],
    identifier?: Identifier
) => {
    if (identifier) {
        const arrayOfObjects1 = array1 as ObjWithWildcards<{
            [identifier: Identifier]: Identifier;
        }>[];
        const arrayOfObjects2 = array2 as ObjWithWildcards<{
            [identifier: Identifier]: Identifier;
        }>[];

        return arrayOfObjects1.filter(
            (x) => !arrayOfObjects2.some((x2) => x[identifier] === x2[identifier])
        );
    }

    return array1.filter((x) => !array2.includes(x));
};
