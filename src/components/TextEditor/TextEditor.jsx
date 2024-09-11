import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
// ----------------------------------------------------------------------------

const TextEditor = ({ sendContent, onChange, value }) => {
    const editor = useRef(null);
    const [content, setContent] = useState(
        sendContent ? sendContent : ''
    );



    // content value
    useEffect(() => {
        if (content) {

            onChange(content);
        }
    }, [content]);

    return (
        <div>
            <JoditEditor
                ref={editor}
                value={value}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
            // config={{ theme: "dark" }}
            />
        </div>
    );
};

export default TextEditor;