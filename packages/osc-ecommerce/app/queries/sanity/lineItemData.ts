import groq from 'groq';

export const LINE_ITEM_QUERY = groq`
    // Here we're getting everything that matches the _id in the $ids parameter
    *[_id in $ids] {
        _id,
        "gid": store.gid,
        "description": upperContent[0] {
            (_type == "module.content") => {
                body[0]
            }
        }
    }
`;
