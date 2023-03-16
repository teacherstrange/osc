export const shapeContactFormData = (formData: Record<string, string>) => {
    const shapedData = Object.keys(formData).map((item) => {
        return {
            objectTypeId: '0-1',
            name: item,
            value: formData[item],
        };
    });

    return { fields: shapedData };
};
